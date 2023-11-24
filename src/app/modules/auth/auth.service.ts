import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import ApiError from '../../../Erros/ApiError';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { User } from '../user/user.model';
import { IChangePassword, ILoginUser } from './auth.interface';

const loginUser = async (payload: ILoginUser): Promise<string> => {
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

  return accessToken;
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword } = payload;

  // const isUserExist = await User.isUserExist(user?.id);
  const isUserExist = await User.findOne({ id: user?.id }).select('+password');

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const isPasswordMatch =
    isUserExist.password &&
    (await User.isPasswordMatch(oldPassword, isUserExist?.password));

  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password is incorrect');
  }

  await isUserExist.save();
};

export const AuthService = {
  loginUser,
  changePassword,
};
