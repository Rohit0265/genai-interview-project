import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey:process.env.GOOGLE_API_KEY
});

async function invoking() {
    console.log("API KEY:", process.env.GOOGLE_API_KEY);
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

export default invoking;