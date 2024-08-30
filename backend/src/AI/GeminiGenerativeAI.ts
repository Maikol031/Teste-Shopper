import { GenerativeAI } from "./GenerativeAI";
import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

export class GeminiGenerativeAI implements GenerativeAI {

    private generativeAI: GoogleGenerativeAI;
    private fileManager: GoogleAIFileManager;
    private generativeModel: GenerativeModel;

    constructor() {
        this.generativeAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
        this.fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY || '');
        this.generativeModel = this.generativeAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }
    
    async run(mimeType: string, fileName: string, measure_type: string): Promise<string> {
        const uploadResponse = await this.fileManager.uploadFile(fileName, {
            mimeType,
            displayName: measure_type,
        });

        const result = await this.generativeModel.generateContent([
            {
                fileData: {
                    mimeType: uploadResponse.file.mimeType,
                    fileUri: uploadResponse.file.uri
                }
            },
            { text: "retorne a leitura atual, sem strings, apenas o número" }
        ]);

        return result.response.text();
    }

}