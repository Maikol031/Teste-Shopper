"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiGenerativeAI = void 0;
const generative_ai_1 = require("@google/generative-ai");
const server_1 = require("@google/generative-ai/server");
class GeminiGenerativeAI {
    constructor() {
        this.generativeAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
        this.fileManager = new server_1.GoogleAIFileManager(process.env.GEMINI_API_KEY || '');
        this.generativeModel = this.generativeAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }
    run(mimeType, fileName, measure_type) {
        return __awaiter(this, void 0, void 0, function* () {
            const uploadResponse = yield this.fileManager.uploadFile(fileName, {
                mimeType,
                displayName: measure_type,
            });
            const result = yield this.generativeModel.generateContent([
                {
                    fileData: {
                        mimeType: uploadResponse.file.mimeType,
                        fileUri: uploadResponse.file.uri
                    }
                },
                { text: "retorne a leitura atual, sem strings, apenas o número" }
            ]);
            return result.response.text();
        });
    }
}
exports.GeminiGenerativeAI = GeminiGenerativeAI;
