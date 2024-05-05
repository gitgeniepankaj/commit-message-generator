"use strict";
require("dotenv").config();
const Groq = require("groq-sdk");
const { OpenAI } = require("openai");

// Initialize AI services based on environment configuration
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generates a commit message based on code differences using an AI service.
 * The AI service used is determined by the 'ENGINE' environment variable.
 *
 * @param {string} diffSummary - The summarized differences in the code to be used for the AI prompt.
 * @returns {Promise<string>} - The generated commit message or an error message.
 */
async function generateCommitMessage(diffSummary) {
  const prompt = `Summarize the following code changes into a commit message:\n${diffSummary}`;

  switch (process.env.ENGINE) {
    case "groq":
      try {
        const chatCompletion = await groq.chat.completions.create({
          messages: [{ role: "user", content: prompt }],
          model: "mixtral-8x7b-32768",
        });
        return (
          chatCompletion.choices[0]?.message?.content ||
          "Failed to generate message."
        );
      } catch (error) {
        console.error("Error with Groq API:", error);
        return "Error in generating commit message with Groq AI.";
      }

    case "openai":
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
        });
        return response.choices[0].text.trim();
      } catch (error) {
        console.error("Error with OpenAI API:", error);
        return "Error in generating commit message with OpenAI API.";
      }

    default:
      return "No valid AI service specified in the environment.";
  }
}

module.exports = { generateCommitMessage };
