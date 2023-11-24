"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = require("../../middlewares/validateRequest");
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post('/register', (0, validateRequest_1.validateRequest)(user_validation_1.UserValidation.userRegisterZodSchema), user_controller_1.UserController.registerUser);
router.get('/', (0, auth_1.default)(), user_controller_1.UserController.getAllUsers);
router.get('/profile', (0, auth_1.default)(), user_controller_1.UserController.getMyProfile);
router.patch('/updateProfile', (0, auth_1.default)(), 
// validateRequest(AuthValidation.updateProfileZodSchema),
user_controller_1.UserController.updateProfile);
exports.UserRoutes = router;
