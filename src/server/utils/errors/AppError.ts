export class AppError {
  public readonly content: string;
  public readonly statusCode: number;

  constructor(content: string, statusCode = 400) {
    this.content = content;
    this.statusCode = statusCode;
  }
}
