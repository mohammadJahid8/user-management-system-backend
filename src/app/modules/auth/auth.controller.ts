/* eslint-disable no-prototype-builtins */
import { Request, Response } from 'express';
import httpStatus from 'http-status';

import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
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

  await AuthService.updateProfile(user, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully',
  });
});

export const AuthController = {
  loginUser,
  updateProfile,
};
