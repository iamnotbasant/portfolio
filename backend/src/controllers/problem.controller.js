import { db } from "../libs/db.js";
import {
  getJudge0LanguageId,
  submitBatch,
  pollBatchResults,
} from "../libs/judge0.lib.js";
export const createProblem = async (req, res) => {
  //get all the data from the request body
  const {
    title,
    description,
    difficulty,
    tags,
    constraints,
    examples,
    testcases,
    codeSnippets,
    referenceSolutions,
    editorial,
    hints,
  } = req.body;

  //check if the user is logged in and is an admin
  if (!req.loggedInUser) {
    return res.status(401).json({ error: "Unauthorized - No user found" });
  }
  if (req.loggedInUser.role !== "ADMIN") {
    return res.status(403).json({ error: "Forbidden - Admins only" });
  }
  //loop through each reference solution for different languages and create a new problem in the database

  try {
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language);

      if (!languageId) {
        return res
          .status(400)
          .json({ error: ` language: ${language} is not supported.` });
      }

      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      const submissionResults = await submitBatch(submissions);

      const tokens = submissionResults.map((res) => res.token);

      const results = await pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        if (result.status.id !== 3) {
          return res.status(400).json({
            error: `Test case ${i + 1} failed for language ${language}`,
          });
        }
      }
    }

    const problem = await db.problem.create({
      data: {
        title,
        description,
        difficulty,
        constraints,
        examples,
        editorial,
        hints,
        authorId: req.loggedInUser.id,
        tags: {
          connectOrCreate: tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
        testcases: {
          createMany: {
            data: testcases,
          },
        },
        codeSnippets: {
          createMany: {
            data: codeSnippets.map((snippet) => ({
              code: snippet.code,
              language: snippet.language,
            })),
          },
        },
        referenceSolutions: {
          createMany: {
            data: Object.entries(referenceSolutions).map(
              ([language, code]) => ({
                code,
                language,
              })
            ),
          },
        },
      },
    });

    return res.status(201).json({
      message: "Problem created successfully",
      problemId: problem.id,
    });
  } catch (error) {
    console.error("Error in creating problem:", error);

    return res.status(500).json({ error: "Internal server error" });
  }
};
export const getAllProblems = async (req, res) => {};
export const getProblemById = async (req, res) => {};
export const updateProblem = async (req, res) => {};
export const deleteProblem = async (req, res) => {};
export const getAllProblemsSolvedByUser = async (req, res) => {};
