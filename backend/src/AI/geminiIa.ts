import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

const GEMINI_API_KEY = String(process.env.GEMINI_API_KEY);

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export const run = async(mimeType:string, fileName:string, measure_type:string) =>{
    const fileManager = new GoogleAIFileManager(GEMINI_API_KEY);

    const uploadResponse = await fileManager.uploadFile(fileName, {
      mimeType,
      displayName: measure_type,
    });

    const result = await model.generateContent([
        {
          fileData: {
            mimeType: uploadResponse.file.mimeType,
            fileUri: uploadResponse.file.uri
          }
        },
        { text: "Me passe a identificação" },
    ])
    
    console.log(result.response.text())
}