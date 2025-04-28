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
        console.log("Submission result---------", result);

        if (result.status.id !== 3) {
          return res.status(400).json({
            error: `Test case ${i + 1} failed for language ${language}`,
          });
        }
      }
    }

    const newProblem = await db.problem.create({
      data: {
        title,
        description,
        difficulty,
        constraints,
        examples,
        editorial,
        hints,
        userId: req.loggedInUser.id,
        tags,
        testcases,
        codeSnippets,
        referenceSolutions,
      },
    });

    return res.status(201).json({
      message: "Problem created successfully",
      problemId: newProblem.id,
    });
  } catch (error) {
    console.error("Error in creating problem:", error);

    return res.status(500).json({ error: "Error in creating problem" });
  }
};
export const getAllProblems = async (req, res) => {
  try {
    const problems = await db.problem.findMany();
    if (problems.length === 0) {
      return res.status(404).json({ message: "No problems found" });
    }

    return res.status(200).json({
      success: true,
      message: "Problems fetched successfully",
      problems,
    });
  } catch (error) {
    console.error("Error fetching problems:", error);
    return res.status(500).json({ error: "Error While Fetching Problems" });
  }
};
export const getProblemById = async (req, res) => {
  try {
    const { id } = req.params;
    const problem = await db.problem.findUnique({
      where: {
        id,
      },
    });
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Problem fetched successfully",
      problem,
    });
  } catch (error) {
    console.error("Error fetching problem:", error);
    return res
      .status(500)
      .json({ error: "Error While Fetching Problem Details" });
  }
};

// TODO : Implement the updateProblem function
export const updateProblem = async (req, res) => {
  try {
  } catch (error) {}
};
export const deleteProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const problem = await db.problem.findUnique({
      where: {
        id,
      },
    });
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    await db.problem.delete({
      where: {
        id,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Problem deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting problem:", error);
    return res.status(500).json({ error: "Error While Deleting Problem" });
  }
};
export const getAllProblemsSolvedByUser = async (req, res) => {};
