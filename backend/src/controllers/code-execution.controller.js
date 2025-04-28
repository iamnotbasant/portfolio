import { pollBatchResults, submitBatch } from "../libs/judge0.lib.js";

export const executeCode = async (req, res) => {
  try {
    const { source_code, languageId, stdin, expectedOutput, problemId } =
      req.body;

    const userId = req.loggedInUser.id;

    //Validate test cases

    if (
      !Array.isArray(stdin) ||
      stdin.length === 0 ||
      !Array.isArray(expectedOutput) ||
      expectedOutput.length === 0 ||
      expectedOutput.length !== stdin.length
    ) {
      return res.status(400).json({
        error: "Invalid test cases. Please provide valid input and output.",
      });
    }

    // Prepare each test case for judge0 submission
    const submissions = stdin.map((input) => ({
      source_code,
      language_id: languageId,
      stdin: input,
    }));

    // Submit the batch of test cases to judge0
    const submitResponse = await submitBatch(submissions);

    const tokens = submitResponse.map((res) => res.token);

    // Poll for results
    const results = await pollBatchResults(tokens);

    console.log("Result ---------");
    console.log(results);

    res.status(200).json({
      message: "Code executed successfully",
    });

    // const testResults = results.map((result, index) => ({
    //   input: stdin[index],
    //   expectedOutput: expectedOutput[index],
    //   actualOutput: result.stdout,
    //   status: result.status.description,
    // }));
  } catch (error) {}
};
