import { GenerativeAI } from "./GenerativeAI";
export declare class GeminiGenerativeAI implements GenerativeAI {
    private generativeAI;
    private fileManager;
    private generativeModel;
    constructor();
    run(mimeType: string, fileName: string, measure_type: string): Promise<string>;
}
//# sourceMappingURL=GeminiGenerativeAI.d.ts.map