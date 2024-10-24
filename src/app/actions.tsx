'use server'

import OpenAI from 'openai';

const createRecipeRequest = (description: string) => 
  "I want a recipe for a beer that matches the following description: " + description;
 
export async function sendChat(description: string) {
  console.log("APIKEY", process.env.OPENAI_API_KEY);
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    // organization: "org-Io9CSHllfgZT4nuExpN3YIv3",
    // project: "proj_ehsLDrlMh8KvIMmvdjrU08ux",
  });

  const response = await openai.chat.completions.create({
    messages: [{ role: "user", content: createRecipeRequest(description) }],
    model: "gpt-4o-mini",
  });

  console.log(response.choices[0].message.content);
  return response.choices[0].message.content;
}