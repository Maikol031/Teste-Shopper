export interface GenerativeAI {
    run(mimeType: string, fileName: string, measure_type: string): Promise<string>;
}