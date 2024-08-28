import { GoogleGenerativeAI } from "@google/generative-ai";


const GEMINI_API_KEY = String(process.env.GEMINI_API_KEY);

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export const run = async() =>{
    const prompt = "Como enviar uma imagem para a api GEMINI";
    model.generateContent
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    console.log(text);
}
