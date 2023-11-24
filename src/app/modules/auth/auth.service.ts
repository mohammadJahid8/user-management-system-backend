import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import ApiError from '../../../Erros/ApiError';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { User } from '../user/user.model';
import { ILoginUser, IUpdateProfile } from './auth.interface';

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

const updateProfile = async (
  user: JwtPayload | null,
  payload: IUpdateProfile
): Promise<void> => {
  const { oldPassword, newPassword, name } = payload;

  const isUserExist = await User.findOne({ id: user?.userId }).select(
    '+password'
  );

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (name) {
    // If updating only the name
    isUserExist.name = name as string;
  }

  if (oldPassword && newPassword) {
    // If updating both name and password
    if (
      isUserExist.password &&
      !(await User.isPasswordMatch(oldPassword, isUserExist.password))
    ) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
    }

    isUserExist.name = name as string;
    isUserExist.password = newPassword;
  } else if (newPassword) {
    // If updating only the password
    if (
      isUserExist.password &&
      !(await User.isPasswordMatch(oldPassword, isUserExist.password))
    ) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
    }

    isUserExist.password = newPassword;
  }

  // updating using save()
  isUserExist.save();
};

export const AuthService = {
  loginUser,
  updateProfile,
};
