import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import ApiError from '../../Erros/ApiError';
import config from '../../config';
import { jwtHelpers } from '../../helpers/jwtHelpers';

const auth = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token)
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');

    let verifiedUser = null;

    verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

    req.user = verifiedUser;

    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
