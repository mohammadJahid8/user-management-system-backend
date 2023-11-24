export type ILoginUser = {
  email: string;
  password: string;
};

export type IUpdateProfile = {
  name?: string;
  oldPassword: string;
  newPassword: string;
};
