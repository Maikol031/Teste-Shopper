export class AppError extends Error {
    public statusCode: number;
    public errorCode:string

    constructor(message: string, errorCode:string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
    }
}
