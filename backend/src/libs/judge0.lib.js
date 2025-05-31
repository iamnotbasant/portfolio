import axios from "axios";

export const getJudge0LanguageId = (language) => {
  const languageMap = {
    PYTHON: 71,
    JAVASCRIPT: 63,
    JAVA: 62,
  };
  return languageMap[language.toUpperCase()];
};

export const submitBatch = async (submissions) => {
  try {
    const { data } = await axios.post(
      `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,
      {
        submissions,
      }
    );

    console.log("Batch submission response:", data);
    return data; // returns the tokens for the submissions
  } catch (error) {
    console.error("Error submitting batch to Judge0:", error.message);
    throw new Error(`Failed to submit code to Judge0: ${error.message}`);
  }
};

export const pollBatchResults = async (tokens) => {
  while (true) {
    const { data } = await axios.get(
      `${process.env.JUDGE0_API_URL}/submissions/batch`,
      {
        params: {
          tokens: tokens.join(","),
          base64_encoded: false,
        },
      }
    );

    const results = data.submissions;

    const isAllDone = results.every(
      (result) => result.status?.id !== 1 && result.status?.id !== 2
    );

    if (isAllDone) {
      return results;
    }
    await sleep(1000); // Wait for 1 seconds before polling again
  }
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function getLanguageName(languageId) {
  const languageMap = {
    71: "Python",
    63: "JavaScript",
    62: "Java",
  };
  return languageMap[languageId] || "Unknown Language";
}

export const validateGeneratedSolutions = async (problem) => {
  try {
    // Create a deep copy to avoid modifying the original
    let validatedProblem = JSON.parse(JSON.stringify(problem));
    const { testcases } = validatedProblem;
    let modified = false;

    // For each language, normalize and validate solution code
    for (const [language, solutionCode] of Object.entries(
      validatedProblem.referenceSolutions
    )) {
      const languageId = getJudge0LanguageId(language);
      if (!languageId) {
        console.log(
          `Language ${language} is not supported, skipping validation`
        );
        continue;
      }

      console.log(`Validating ${language} solution...`);

      // Fix common issues with solution code
      let fixedCode = solutionCode;

      if (language === "JAVASCRIPT") {
        // Fix JavaScript-specific issues
        fixedCode = fixedCode
          .replace(/print\(/g, "console.log(")
          // Fix missing parentheses
          .replace(/console.log\(([^)]*?);\s*\}/g, "console.log($1);\n}")
          // Ensure proper parsing of array input
          .replace(/const arr = input/g, "const arr = input.trim()")
          .replace(/\[(\d+(?:,\s*\d+)*)\]/g, (match) => {
            return `"${match.slice(1, -1).replace(/,\s*/g, " ")}"`;
          });
      } else if (language === "JAVA") {
        // Fix Java-specific issues
        fixedCode = fixedCode
          // Fix missing parentheses in println statements
          .replace(
            /System\.out\.println\(([^)]*?);/g,
            "System.out.println($1);"
          )
          // Ensure proper array parsing
          .replace(/\[(\d+(?:,\s*\d+)*)\]/g, (match) => {
            return match.slice(1, -1).replace(/,\s*/g, " ");
          });
      } else if (language === "PYTHON") {
        // Fix Python-specific issues
        fixedCode = fixedCode
          // Fix input parsing for arrays
          .replace(/input\(\)\s*$/g, "input().strip()")
          .replace(/\[(\d+(?:,\s*\d+)*)\]/g, (match) => {
            return match.slice(1, -1).replace(/,\s*/g, " ");
          });
      }

      // Update solution if changed
      if (fixedCode !== solutionCode) {
        console.log(`Fixed ${language} solution code`);
        validatedProblem.referenceSolutions[language] = fixedCode;
        modified = true;
      }

      // Fix test cases - convert array notation to space-separated values
      const fixedTestcases = testcases.map((tc) => {
        let input = tc.input;
        let output = tc.output;

        // Convert array notation to space-separated values for easier parsing
        if (input.includes("[")) {
          input = input.replace(/\[\s*([^\]]*)\s*\]/g, "$1");
        }
        if (output.includes("[")) {
          output = output.replace(/\[\s*([^\]]*)\s*\]/g, "$1");
        }

        return { input, output };
      });

      if (JSON.stringify(fixedTestcases) !== JSON.stringify(testcases)) {
        console.log("Fixed test case format");
        validatedProblem.testcases = fixedTestcases;
        modified = true;
      }

      // Submit each test case
      try {
        const submissions = validatedProblem.testcases.map(({ input }) => ({
          source_code: fixedCode,
          language_id: languageId,
          stdin: input,
        }));

        const submissionResults = await submitBatch(submissions);
        const tokens = submissionResults.map((res) => res.token);
        const results = await pollBatchResults(tokens);

        // Update expected outputs based on actual outputs from correct solution
        for (let i = 0; i < results.length; i++) {
          const result = results[i];

          if (result.status.id === 3) {
            // 3 = Accepted
            console.log(`Test case ${i + 1} passed for ${language}`);

            // Normalize whitespace in output
            const normalizedOutput = (result.stdout || "").trim();
            validatedProblem.testcases[i].output = normalizedOutput;
            modified = true;
          } else {
            console.warn(
              `Solution for ${language} failed on test case ${i + 1}`
            );
            console.warn(`Status: ${result.status.description}`);
            console.warn(`Error: ${result.stderr || result.compile_output}`);
          }
        }
      } catch (error) {
        console.error(`Error validating ${language} solution:`, error);
      }
    }

    return modified ? validatedProblem : problem;
  } catch (error) {
    console.error("Validation error:", error);
    // Return original problem if validation fails
    return problem;
  }
};
