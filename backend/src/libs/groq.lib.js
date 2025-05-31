import { Groq } from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

// Initialize the Groq client with API key
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

/**
 * Generate an AI response for code assistance
 * @param {string} prompt - The user's query
 * @param {Object} context - Additional context (problem details, user code, etc.)
 * @returns {Promise<string>} AI response
 */
export const generateAIResponse = async (prompt, context) => {
  try {
    const { problem, userCode, language } = context;

    // Create a well-structured system prompt
    const systemPrompt = `You are the Riddler AI, an expert coding assistant for Arkham Labs. 
You help users solve programming problems without revealing complete solutions.
Your approach:
- Provide clear hints and guidance for the specific question asked
- Explain concepts related to the problem 
- Identify potential issues in the user's code
- Suggest optimization approaches
- Use Markdown formatting in your responses

Current problem: ${problem?.title || "Unknown problem"}
Difficulty: ${problem?.difficulty || "Unknown"}
Language: ${language || "JavaScript"}`;

    // Create a detailed user prompt
    const userPrompt = `
${prompt}

${
  userCode
    ? `Here's my current code:\n\`\`\`${language.toLowerCase()}\n${userCode}\n\`\`\``
    : ""
}
`;

    const response = await groq.chat.completions.create({
      model: "llama3-70b-8192", // Using Llama 3 for good performance
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.5, // Balanced between creativity and accuracy
      max_tokens: 1024, // Reasonable response length
      top_p: 0.9,
      stream: false,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw new Error("Failed to generate AI response");
  }
};

/**
 * Generate code explanations
 * @param {string} code - Code to explain
 * @param {string} language - Programming language
 * @returns {Promise<string>} Explanation
 */

export const explainCode = async (code, language) => {
  try {
    const response = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        {
          role: "system",
          content:
            "You are an expert programming tutor. Explain code clearly and concisely using markdown formatting.",
        },
        {
          role: "user",
          content: `Explain this ${language} code step by step:\n\`\`\`${language.toLowerCase()}\n${code}\n\`\`\``,
        },
      ],
      temperature: 0.3, // More factual for explanations
      max_tokens: 1024,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error explaining code:", error);
    throw new Error("Failed to generate code explanation");
  }
};
