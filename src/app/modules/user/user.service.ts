import { IUser } from './user.interface';
import { User } from './user.model';

import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../Erros/ApiError';
import { IUpdateProfile } from '../auth/auth.interface';

const registerUser = async (userData: IUser): Promise<IUser | null> => {
  const { email } = userData;

  const isUserExist = await User.isUserExist(email);

  if (isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User already exist');
  }

  const result = await User.create(userData);

  return result;
};

const updateProfile = async (
  user: JwtPayload | null,
  payload: IUpdateProfile
): Promise<void> => {
  if (!Object.keys(payload).length) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No data found to update!');
  }

  const { oldPassword, newPassword, name } = payload;

  const isUserExist = await User.findOne({ email: user?.email }).select(
    '+password'
  );

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (name && !oldPassword && !newPassword) {
    await User.updateOne({ email: user?.email }, { $set: { name } });
    return;
  }

  if (newPassword || oldPassword) {
    if (!newPassword || !oldPassword)
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'Old Password & New Password is required.'
      );
    if (
      isUserExist.password &&
      !(await User.isPasswordMatch(oldPassword, isUserExist.password))
    ) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
    }

    isUserExist.password = newPassword;
    isUserExist.name = name || user?.name;

    // updating using save()
    isUserExist.save();
  }
};

const getAllUsers = async (): Promise<IUser[]> => {
  const users = await User.find({});
  return users;
};

const getMyProfile = async (user: any): Promise<IUser | null> => {
  const myProfile = await User.findOne({
    email: user.email,
  });
  return myProfile;
};

export const UserService = {
  registerUser,
  getAllUsers,
  getMyProfile,
  updateProfile,
};
