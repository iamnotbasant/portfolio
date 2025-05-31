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

/**
 * Generate a complete coding problem
 * @param {Object} options - Problem generation options
 * @param {string} options.topic - Main topic/concept for the problem
 * @param {string} options.difficulty - Problem difficulty (EASY, MEDIUM, HARD)
 * @param {string} options.category - Problem category/type
 * @param {string} options.additionalRequirements - Any additional specifications
 * @returns {Promise<Object>} Generated problem data
 */

export const generateProblem = async (options) => {
  try {
    const { topic, difficulty, category, additionalRequirements } = options;

    const prompt = `
    Create a complete competitive programming problem about ${topic} with the following specifications:
    
    Difficulty: ${difficulty || "EASY"}
    Category/Tags: ${category || ""}
    ${
      additionalRequirements
        ? `Additional requirements: ${additionalRequirements}`
        : ""
    }
    
    The problem should include:
    1. A clear, concise title
    2. A detailed description explaining the problem
    3. Input/output specifications and constraints
    4. Example test cases with explanations
    5. At least 3 test cases with input and expected output
    6. Helpful hints for solving the problem (optional)
    7. An editorial explaining the solution approach
    
    For each supported language (JavaScript, Python, and Java):
    - Provide starter code templates with appropriate function signatures
    - Include complete reference solutions that pass all test cases
    - Include example inputs and outputs formatted for that language
    
    Return the result as a valid JSON object with the following structure:
    {
      "title": "Problem Title",
      "description": "Detailed problem description",
      "difficulty": "${difficulty || "EASY"}",
      "tags": ["Main Category", "Relevant Algorithm", "Data Structure"],
      "constraints": "Clear input constraints and limitations",
      "hints": "Helpful hints for solving the problem",
      "editorial": "Detailed explanation of the solution approach",
      "testcases": [
        {"input": "test input 1", "output": "expected output 1"},
        {"input": "test input 2", "output": "expected output 2"},
        {"input": "test input 3", "output": "expected output 3"}
      ],
      "examples": {
        "JAVASCRIPT": {"input": "example input", "output": "example output", "explanation": "explanation"},
        "PYTHON": {"input": "example input", "output": "example output", "explanation": "explanation"},
        "JAVA": {"input": "example input", "output": "example output", "explanation": "explanation"}
      },
      "codeSnippets": {
        "JAVASCRIPT": "Complete starter code template for JavaScript",
        "PYTHON": "Complete starter code template for Python",
        "JAVA": "Complete starter code template for Java"
      },
      "referenceSolutions": {
        "JAVASCRIPT": "Complete working solution in JavaScript",
        "PYTHON": "Complete working solution in Python",
        "JAVA": "Complete working solution in Java"
      }
    }
    
    Make sure all code snippets include proper input/output handling for standalone execution.
    Ensure JSON is valid and properly formatted.`;

    const response = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        {
          role: "system",
          content:
            "You are an expert competitive programming problem creator that generates well-structured coding problems with accurate solutions.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.5,
      max_tokens: 4000,
      top_p: 0.9,
    });

    const generatedContent = response.choices[0].message.content;

    // Extract JSON from the response
    try {
      // Look for JSON content between curly braces
      const jsonMatch = generatedContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const problemData = JSON.parse(jsonMatch[0]);
        return problemData;
      } else {
        throw new Error("No valid JSON found in the generated content");
      }
    } catch (parseError) {
      console.error("Error parsing generated problem:", parseError);
      throw new Error("Failed to parse generated problem");
    }
  } catch (error) {
    console.error("Error generating problem:", error);
    throw new Error("Failed to generate problem");
  }
};
