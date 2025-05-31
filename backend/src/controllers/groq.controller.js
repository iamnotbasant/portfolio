import { generateAIResponse, explainCode } from "../libs/groq.lib.js";
import { db } from "../libs/db.js";

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
