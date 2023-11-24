"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
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
exports.AuthValidation = {
    loginZodSchema,
    // updateProfileZodSchema,
};
