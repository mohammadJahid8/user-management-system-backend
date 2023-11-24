import { z } from 'zod';

const loginZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

// const updateProfileZodSchema = z.object({
//   body: z.object({
//     oldPassword: z.string({
//       required_error: 'Old password is required',
//     }),
//     newPassword: z.string({
//       required_error: 'New password is required',
//     }),
//   }),
// });

export const AuthValidation = {
  loginZodSchema,

  // updateProfileZodSchema,
};
