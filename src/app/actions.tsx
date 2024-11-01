'use server'

import OpenAI from 'openai';
import recipeSchema from './recipe.json'; // Import the JSON schema

const createRecipeRequest = (description: string) => `
  I want a detailed recipe for a beer that matches the following description: "${description}"
  
  Please provide the response in JSON format, following this exact schema:
  
  ${JSON.stringify(recipeSchema, null, 2)}
`;

export async function sendChat(description: string) {
  console.log("APIKEY", process.env.OPENAI_API_KEY);
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    messages: [{ role: "user", content: createRecipeRequest(description) }],
    model: "gpt-4o-mini",
  });

  console.log(response.choices[0].message.content);
  return response.choices[0].message.content;
}
