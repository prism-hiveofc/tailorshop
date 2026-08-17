"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAction = void 0;
const password_helper_1 = require("../../../shared/helpers.ts/password.helper");
const app_error_1 = require("../../../shared/errors/app.error");
const auth_repository_1 = require("../repositories/auth.repository");
const registerAction = async (data) => {
    const { name, email, phone, password } = data;
    const existingEmail = await (0, auth_repository_1.findUserByEmail)(email);
    if (existingEmail) {
        throw new app_error_1.AppError("Email already exists", 409);
    }
    const existingPhone = await (0, auth_repository_1.findUserByPhone)(phone);
    if (existingPhone) {
        throw new app_error_1.AppError("Phone number already exists", 409);
    }
    const hashedPassword = await (0, password_helper_1.hashPassword)(password);
    const user = await (0, auth_repository_1.createUser)({
        name,
        email,
        phone,
        password: hashedPassword,
    });
    const { password: _password, ...userData } = user.toObject();
    return userData;
    return userData;
};
exports.registerAction = registerAction;
//# sourceMappingURL=register.action.js.map