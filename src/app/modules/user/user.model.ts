import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.statics.isUserExist = async function (
  id: string
): Promise<Pick<IUser, 'name' | 'password' | 'email'> | null> {
  const user = await User.findOne(
    { id },
    { email: 1, password: 1, name: 1 }
  ).lean();

  return user;
};

userSchema.statics.isPasswordMatch = async function (
  givenPass: string,
  savedPass: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(givenPass, savedPass);

  return isMatch;
};

userSchema.pre('save', async function (next) {
  // hash password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
