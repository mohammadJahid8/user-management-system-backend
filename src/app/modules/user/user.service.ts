import { IUser } from './user.interface';
import { User } from './user.model';

import httpStatus from 'http-status';
import ApiError from '../../../Erros/ApiError';

const registerUser = async (userData: IUser): Promise<IUser | null> => {
  const { email } = userData;

  const isUserExist = await User.isUserExist(email);

  if (isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User already exist');
  }

  const result = await User.create(userData);

  return result;
};

const getAllUsers = async (): Promise<IUser[]> => {
  const users = await User.find({});
  return users;
};

const getMyProfile = async (user: IUser): Promise<IUser | null> => {
  const myProfile = await User.findOne({
    email: user.email,
  });
  return myProfile;
};

export const UserService = {
  registerUser,
  getAllUsers,
  getMyProfile,
};
