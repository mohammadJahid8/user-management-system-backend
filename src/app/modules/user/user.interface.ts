/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IUser = {
  name: string;
  email: string;
  password: string;
};

// export type IUserMethods = {
//   isUserExist(id: string): Promise<Partial<IUser> | null>;
//   isPasswordMatch(givenPass: string, savedPass: string): Promise<boolean>;
// };

// export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;

export type UserModel = {
  isUserExist(id: string): Promise<Pick<IUser, 'name' | 'password' | 'email'>>;
  isPasswordMatch(givenPass: string, savedPass: string): Promise<boolean>;
} & Model<IUser>;
