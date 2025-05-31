import {
  generateAIResponse,
  explainCode,
  generateProblem,
} from "../libs/groq.lib.js";
import { db } from "../libs/db.js";
import { validateGeneratedSolutions } from "../libs/judge0.lib.js";

export const getAIHelp = async (req, res) => {
  try {
    const { prompt, problemId, code, language } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    // Get problem details if problemId is provided
    let problem = null;
    if (problemId) {
      problem = await db.problem.findUnique({
        where: { id: problemId },
      });
    }

    const aiResponse = await generateAIResponse(prompt, {
      problem,
      userCode: code,
      language,
    });

    return res.status(200).json({
      success: true,
      message: "AI response generated successfully",
      response: aiResponse,
    });
  } catch (error) {
    console.error("Error getting AI help:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate AI response",
      error: error.message,
    });
  }
};

export const getCodeExplanation = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        success: false,
        message: "Code and language are required",
      });
    }

    const explanation = await explainCode(code, language);

    return res.status(200).json({
      success: true,
      message: "Code explanation generated successfully",
      explanation,
    });
  } catch (error) {
    console.error("Error explaining code:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate code explanation",
      error: error.message,
    });
  }
};

export const generateAIProblem = async (req, res) => {
  try {
    const { topic, difficulty, category, additionalRequirements } = req.body;

    // Validate required inputs
    if (!topic) {
      return res.status(400).json({
        success: false,
        message: "Topic is required for problem generation",
      });
    }

    // Check if user is admin
    if (req.loggedInUser.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Only admins can generate problems",
      });
    }

    // Call the generateProblem function
    let problemData = await generateProblem({
      topic,
      difficulty,
      category,
      additionalRequirements,
    });

    // Validate and fix reference solutions against test cases
    try {
      const validatedProblem = await validateGeneratedSolutions(problemData);
      problemData = validatedProblem; // Use the validated problem data
      console.log("Solutions validated and fixed successfully");
    } catch (validationError) {
      console.error("Validation error:", validationError);
      // Continue with the generated problem even if validation fails
    }

    return res.status(200).json({
      success: true,
      message: "Problem generated successfully",
      problem: problemData,
    });
  } catch (error) {
    console.error("Error generating problem:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate problem",
      error: error.message,
    });
  }
};
