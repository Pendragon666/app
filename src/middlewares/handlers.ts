import { NextFunction, Request, Response } from 'express';
import { isDevelopment } from '../constants';

class HttpException extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

const notFoundMiddlware = (request: Request, response: Response, next: NextFunction): void => {
  const error = new Error(`Not Found - ${request.originalUrl}`);
  response.status(404);
  next(error);
};

const errorMiddleware = (
  error: HttpException,
  _: Request,
  response: Response,
  _next: NextFunction,
): Response<any, Record<string, any>> => {
  const statusCode = response.statusCode === 200 ? 500 : response.statusCode;
  response.status(statusCode);
  return response.json({
    success: false,
    status: statusCode,
    message: error.message,
    stack: isDevelopment ? error.stack : '🤒',
  });
};

export { notFoundMiddlware, errorMiddleware };
