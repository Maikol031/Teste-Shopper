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
exports.runGemAI = void 0;
const generative_ai_1 = require("@google/generative-ai");
const server_1 = require("@google/generative-ai/server");
const GEMINI_API_KEY = String(process.env.GEMINI_API_KEY);
const genAI = new generative_ai_1.GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const runGemAI = (mimeType, fileName, measure_type, textPromp) => __awaiter(void 0, void 0, void 0, function* () {
    const fileManager = new server_1.GoogleAIFileManager(GEMINI_API_KEY);
    const uploadResponse = yield fileManager.uploadFile(fileName, {
        mimeType,
        displayName: measure_type,
    });
    const result = yield model.generateContent([
        {
            fileData: {
                mimeType: uploadResponse.file.mimeType,
                fileUri: uploadResponse.file.uri
            }
        },
        {
            text: textPromp
        }
    ]);
    return result.response.text();
});
exports.runGemAI = runGemAI;
