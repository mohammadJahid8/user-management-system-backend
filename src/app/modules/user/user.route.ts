import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidation.userRegisterZodSchema),
  UserController.registerUser
);

router.get('/', UserController.getAllUsers);

router.get('/profile', UserController.getMyProfile);

export const UserRoutes = router;
