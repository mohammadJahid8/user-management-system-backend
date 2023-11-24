"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("./user.model");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../Erros/ApiError"));
const registerUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = userData;
    const isUserExist = yield user_model_1.User.isUserExist(email);
    if (isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User already exist');
    }
    const result = yield user_model_1.User.create(userData);
    return result;
});
const updateProfile = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Object.keys(payload).length) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'No data found to update!');
    }
    const { oldPassword, newPassword, name } = payload;
    const isUserExist = yield user_model_1.User.findOne({ email: user === null || user === void 0 ? void 0 : user.email }).select('+password');
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    if (name && !oldPassword && !newPassword) {
        yield user_model_1.User.updateOne({ email: user === null || user === void 0 ? void 0 : user.email }, { $set: { name } });
        return;
    }
    if (newPassword || oldPassword) {
        if (!newPassword || !oldPassword)
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Old Password & New Password is required.');
        if (isUserExist.password &&
            !(yield user_model_1.User.isPasswordMatch(oldPassword, isUserExist.password))) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Old Password is incorrect');
        }
        isUserExist.password = newPassword;
        isUserExist.name = name || (user === null || user === void 0 ? void 0 : user.name);
        // updating using save()
        isUserExist.save();
    }
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find({});
    return users;
});
const getMyProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const myProfile = yield user_model_1.User.findOne({
        email: user.email,
    });
    return myProfile;
});
exports.UserService = {
    registerUser,
    getAllUsers,
    getMyProfile,
    updateProfile,
};
