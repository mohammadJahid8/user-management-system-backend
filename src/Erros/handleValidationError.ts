import mongoose from 'mongoose';
import { IGenericErrorRespnse } from '../interfaces/common';
import { IGenericErrorMessages } from '../interfaces/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorRespnse => {
  const errors: IGenericErrorMessages[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleValidationError;
