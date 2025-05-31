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

    const sampleProblems = JSON.stringify({
      dynamicProgrammingExample: {
        title: "Climbing Stairs",
        category: "dp", // Dynamic Programming
        description:
          "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
        difficulty: "EASY",
        tags: ["Dynamic Programming", "Math", "Memoization"],
        constraints: "1 <= n <= 45",
        hints:
          "To reach the nth step, you can either come from the (n-1)th step or the (n-2)th step.",
        editorial:
          "This is a classic dynamic programming problem. The number of ways to reach the nth step is the sum of the number of ways to reach the (n-1)th step and the (n-2)th step, forming a Fibonacci-like sequence.",
        testcases: [
          {
            input: "2",
            output: "2",
          },
          {
            input: "3",
            output: "3",
          },
          {
            input: "4",
            output: "5",
          },
        ],
        examples: {
          JAVASCRIPT: {
            input: "n = 2",
            output: "2",
            explanation:
              "There are two ways to climb to the top:\n1. 1 step + 1 step\n2. 2 steps",
          },
          PYTHON: {
            input: "n = 3",
            output: "3",
            explanation:
              "There are three ways to climb to the top:\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step",
          },
          JAVA: {
            input: "n = 4",
            output: "5",
            explanation:
              "There are five ways to climb to the top:\n1. 1 step + 1 step + 1 step + 1 step\n2. 1 step + 1 step + 2 steps\n3. 1 step + 2 steps + 1 step\n4. 2 steps + 1 step + 1 step\n5. 2 steps + 2 steps",
          },
        },
        codeSnippets: {
          JAVASCRIPT: `/**
* @param {number} n
* @return {number}
*/
function climbStairs(n) {
// Write your code here
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
terminal: false
});

rl.on('line', (line) => {
const n = parseInt(line.trim());
const result = climbStairs(n);

console.log(result);
rl.close();
});`,
          PYTHON: `class Solution:
  def climbStairs(self, n: int) -> int:
      # Write your code here
      pass

# Input parsing
if __name__ == "__main__":
  import sys
  
  # Parse input
  n = int(sys.stdin.readline().strip())
  
  # Solve
  sol = Solution()
  result = sol.climbStairs(n)
  
  # Print result
  print(result)`,
          JAVA: `import java.util.Scanner;

class Main {
  public int climbStairs(int n) {
      // Write your code here
      return 0;
  }
  
  public static void main(String[] args) {
      Scanner scanner = new Scanner(System.in);
      int n = Integer.parseInt(scanner.nextLine().trim());
      
      // Use Main class instead of Solution
      Main main = new Main();
      int result = main.climbStairs(n);
      
      System.out.println(result);
      scanner.close();
  }
}`,
        },
        referenceSolutions: {
          JAVASCRIPT: `/**
* @param {number} n
* @return {number}
*/
function climbStairs(n) {
// Base cases
if (n <= 2) {
  return n;
}

// Dynamic programming approach
let dp = new Array(n + 1);
dp[1] = 1;
dp[2] = 2;

for (let i = 3; i <= n; i++) {
  dp[i] = dp[i - 1] + dp[i - 2];
}

return dp[n];

/* Alternative approach with O(1) space
let a = 1; // ways to climb 1 step
let b = 2; // ways to climb 2 steps

for (let i = 3; i <= n; i++) {
  let temp = a + b;
  a = b;
  b = temp;
}

return n === 1 ? a : b;
*/
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
terminal: false
});

rl.on('line', (line) => {
const n = parseInt(line.trim());
const result = climbStairs(n);

console.log(result);
rl.close();
});`,
          PYTHON: `class Solution:
  def climbStairs(self, n: int) -> int:
      # Base cases
      if n <= 2:
          return n
      
      # Dynamic programming approach
      dp = [0] * (n + 1)
      dp[1] = 1
      dp[2] = 2
      
      for i in range(3, n + 1):
          dp[i] = dp[i - 1] + dp[i - 2]
      
      return dp[n]
      
      # Alternative approach with O(1) space
      # a, b = 1, 2
      # 
      # for i in range(3, n + 1):
      #     a, b = b, a + b
      # 
      # return a if n == 1 else b

# Input parsing
if __name__ == "__main__":
  import sys
  
  # Parse input
  n = int(sys.stdin.readline().strip())
  
  # Solve
  sol = Solution()
  result = sol.climbStairs(n)
  
  # Print result
  print(result)`,
          JAVA: `import java.util.Scanner;

class Main {
  public int climbStairs(int n) {
      // Base cases
      if (n <= 2) {
          return n;
      }
      
      // Dynamic programming approach
      int[] dp = new int[n + 1];
      dp[1] = 1;
      dp[2] = 2;
      
      for (int i = 3; i <= n; i++) {
          dp[i] = dp[i - 1] + dp[i - 2];
      }
      
      return dp[n];
      
      /* Alternative approach with O(1) space
      int a = 1; // ways to climb 1 step
      int b = 2; // ways to climb 2 steps
      
      for (int i = 3; i <= n; i++) {
          int temp = a + b;
          a = b;
          b = temp;
      }
      
      return n == 1 ? a : b;
      */
  }
  
  public static void main(String[] args) {
      Scanner scanner = new Scanner(System.in);
      int n = Integer.parseInt(scanner.nextLine().trim());
      
      // Use Main class instead of Solution
      Main main = new Main();
      int result = main.climbStairs(n);
      
      System.out.println(result);
      scanner.close();
  }
}`,
        },
      },
      stringExample: {
        title: "Valid Palindrome",
        description:
          "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.",
        difficulty: "EASY",
        tags: ["String", "Two Pointers"],
        constraints:
          "1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.",
        hints:
          "Consider using two pointers, one from the start and one from the end, moving towards the center.",
        editorial:
          "We can use two pointers approach to check if the string is a palindrome. One pointer starts from the beginning and the other from the end, moving towards each other.",
        testcases: [
          {
            input: "A man, a plan, a canal: Panama",
            output: "true",
          },
          {
            input: "race a car",
            output: "false",
          },
          {
            input: " ",
            output: "true",
          },
        ],
        examples: {
          JAVASCRIPT: {
            input: 's = "A man, a plan, a canal: Panama"',
            output: "true",
            explanation: '"amanaplanacanalpanama" is a palindrome.',
          },
          PYTHON: {
            input: 's = "A man, a plan, a canal: Panama"',
            output: "true",
            explanation: '"amanaplanacanalpanama" is a palindrome.',
          },
          JAVA: {
            input: 's = "A man, a plan, a canal: Panama"',
            output: "true",
            explanation: '"amanaplanacanalpanama" is a palindrome.',
          },
        },
        codeSnippets: {
          JAVASCRIPT: `/**
   * @param {string} s
   * @return {boolean}
   */
  function isPalindrome(s) {
    // Write your code here
  }
  
  // Add readline for dynamic input handling
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  
  // Process input line
  rl.on('line', (line) => {
    // Call solution with the input string
    const result = isPalindrome(line);
    
    // Output the result
    console.log(result ? "true" : "false");
    rl.close();
  });`,
          PYTHON: `class Solution:
      def isPalindrome(self, s: str) -> bool:
          # Write your code here
          pass
  
  # Input parsing
if __name__ == "__main__":
    import sys
    # Read the input string
    s = sys.stdin.readline().strip()
    
    # Call solution
    sol = Solution()
    result = sol.isPalindrome(s)
    
    # Output result
    print(str(result).lower())  # Convert True/False to lowercase true/false`,
          JAVA: `import java.util.Scanner;

public class Main {
    public static String preprocess(String s) {
        return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    }

    public static boolean isPalindrome(String s) {
       
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();

        boolean result = isPalindrome(input);
        System.out.println(result ? "true" : "false");
    }
}
`,
        },
        referenceSolutions: {
          JAVASCRIPT: `/**
   * @param {string} s
   * @return {boolean}
   */
  function isPalindrome(s) {
    // Convert to lowercase and remove non-alphanumeric characters
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Check if it's a palindrome
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
      if (s[left] !== s[right]) {
        return false;
      }
      left++;
      right--;
    }
    
    return true;
  }
  
  // Add readline for dynamic input handling
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  
  // Process input line
  rl.on('line', (line) => {
    // Call solution with the input string
    const result = isPalindrome(line);
    
    // Output the result
    console.log(result ? "true" : "false");
    rl.close();
  });`,
          PYTHON: `class Solution:
      def isPalindrome(self, s: str) -> bool:
          # Convert to lowercase and keep only alphanumeric characters
          filtered_chars = [c.lower() for c in s if c.isalnum()]
          
          # Check if it's a palindrome
          return filtered_chars == filtered_chars[::-1]
  
  # Input parsing
if __name__ == "__main__":
    import sys
    # Read the input string
    s = sys.stdin.readline().strip()
    
    # Call solution
    sol = Solution()
    result = sol.isPalindrome(s)
    
    # Output result
    print(str(result).lower())  # Convert True/False to lowercase true/false`,
          JAVA: `import java.util.Scanner;

public class Main {
    public static String preprocess(String s) {
        return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    }

    public static boolean isPalindrome(String s) {
        s = preprocess(s);
        int left = 0, right = s.length() - 1;

        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) return false;
            left++;
            right--;
        }

        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();

        boolean result = isPalindrome(input);
        System.out.println(result ? "true" : "false");
    }
}
`,
        },
      },
    });

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

    IMPORTANT: Return ONLY a valid JSON object without any additional text or explanations.
    
    For each supported language (JavaScript, Python, and Java):
    - Provide starter code templates with appropriate function signatures
    - Include complete reference solutions that pass all test cases
    - Include example inputs and outputs formatted for that language

    For JavaScript solution:
    - Use console.log() for output, not print()
    - Parse input using standard Node.js methods
    - The solution must correctly process the input format in test cases
    
    For Python solution:
    - Use print() for output
    - Parse input using standard Python methods
    
    For Java solution:
    - Use System.out.println() for output
    - Parse input using Scanner or BufferedReader
    
    CRITICAL: Ensure the input/output formats match EXACTLY between test cases and solutions.
    Test your solutions mentally to verify they produce the expected output.

    Here are reference examples of well-structured problems to follow as templates:
    ${sampleProblems}
    Follow the examples closely for structure, but create a unique problem about ${topic}.

    
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
    Ensure all reference solutions are thoroughly tested against the test cases before including them.
    Double check that all solutions output exactly the expected format for each test case.`;

    const response = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        {
          role: "system",
          content:
            "You are an AI that generates LeetCode-style DSA problems. Return your response strictly as JSON with keys. Do not include markdown, explanations, or comments. Only output valid JSON.",
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
    console.log("Raw AI response length:", generatedContent.length);
    console.log(
      "Raw AI response preview:",
      generatedContent.substring(0, 100) + "..."
    );

    try {
      // This assumes Groq SDK gives you a stringified JSON
      const jsonContent = response.choices[0].message.content;

      // If content is a string (depends on SDK), parse it
      const problemData =
        typeof jsonContent === "string" ? JSON.parse(jsonContent) : jsonContent;

      console.log("Generated problem data:", problemData);
      return problemData;
    } catch (err) {
      console.error("JSON parsing failed:", err);
      throw new Error("AI-generated problem could not be parsed.");
    }
  } catch (error) {
    console.error("Error generating problem:", error);
    throw new Error("Failed to generate problem");
  }
};
