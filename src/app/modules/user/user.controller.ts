/* eslint-disable no-prototype-builtins */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.registerUser(req.body);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const updateData = req.body;

  for (const key in updateData) {
    if (updateData.hasOwnProperty(key) && updateData[key] === '') {
      delete updateData[key];
    }
  }
  console.log({ updateData });

  await UserService.updateProfile(user, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await UserService.getAllUsers();

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users fetched successfully',
    data: users,
  });
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const user = await UserService.getMyProfile(req.user);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My profile got successfully',
    data: user,
  });
});

export const UserController = {
  registerUser,
  getAllUsers,
  getMyProfile,
  updateProfile,
};
