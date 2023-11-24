import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import ApiError from '../../../Erros/ApiError';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { User } from '../user/user.model';
import { ILoginUser, ILoginUserResponse } from './auth.interface';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await User.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const isPasswordMatch =
    isUserExist.password &&
    (await User.isPasswordMatch(password, isUserExist?.password));

  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password');
  }

  const payLoad = { email: isUserExist.email, name: isUserExist.name };
  const accessToken = jwtHelpers.createToken(
    payLoad,
    config.jwt.secret as Secret,
    config?.jwt?.expires_in as string
  );

  return { accessToken };
};

export const AuthService = {
  loginUser,
};
