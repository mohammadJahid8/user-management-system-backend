import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorRespnse } from '../interfaces/common';
import { IGenericErrorMessages } from '../interfaces/error';

const handleZodError = (error: ZodError): IGenericErrorRespnse => {
  const errors: IGenericErrorMessages[] = error.issues.map(
    (issue: ZodIssue) => {
      return {
        path: issue?.path[issue?.path?.length - 1],
        message: issue?.message,
      };
    }
  );

  const statusCode = 400;
  return {
    statusCode,
    message: 'Zod Validation Error',
    errorMessages: errors,
  };
};

export default handleZodError;
