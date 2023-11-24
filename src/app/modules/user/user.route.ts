import express from 'express';
import auth from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidation.userRegisterZodSchema),
  UserController.registerUser
);

router.get('/', auth(), UserController.getAllUsers);

router.get('/profile', auth(), UserController.getMyProfile);

router.patch(
  '/updateProfile',
  auth(),
  // validateRequest(AuthValidation.updateProfileZodSchema),
  UserController.updateProfile
);

export const UserRoutes = router;
