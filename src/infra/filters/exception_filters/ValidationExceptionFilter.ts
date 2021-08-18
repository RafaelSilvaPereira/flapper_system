import { ArgumentsHost, ExceptionFilter, HttpStatus, ValidationError } from '@nestjs/common';
import { Request, Response } from 'express';

export class ValidationExceptionFilter implements ExceptionFilter<ValidationError> {
  catch(exception: ValidationError, host: ArgumentsHost): any {
    console.log(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response
      .status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      timestamp: new Date().toISOString(),
      path: request.url,
      reason: exception.toString(),
    });
  }

}
