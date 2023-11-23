/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */

import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

import { ZodError } from 'zod';

import ApiError from '../../Erros/ApiError';
import handleCastError from '../../Erros/handleCastError';
import handleValidationError from '../../Erros/handleValidationError';
import handleZodError from '../../Erros/handleZodError';
import config from '../../config';
import { IGenericErrorMessages } from '../../interfaces/error';

const globalErrorHandler: ErrorRequestHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('From global error handler: ', error);
  let statusCode = 500;
  let message = 'Something went wrong';
  let errorMessages: IGenericErrorMessages[] = [];

  if (error?.name === 'ValidationError') {
    const simplifyError = handleValidationError(error);
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
    errorMessages = simplifyError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorMessages = error?.message
      ? [{ path: 'error', message: error?.message }]
      : [];
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessages = simplifiedError?.errorMessages;
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [{ path: 'error', message: error?.message }]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env === 'development' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
