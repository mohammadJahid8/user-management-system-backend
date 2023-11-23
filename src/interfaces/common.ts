import { IGenericErrorMessages } from './error';

export type IGenericErrorRespnse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessages[];
};

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
