export class CustomError extends Error {
  status: number;
  title: string;

  constructor(message: string, statusCode: number, title = '') {
    super(message);
    this.title = title;
    this.status = statusCode;
  }
}
