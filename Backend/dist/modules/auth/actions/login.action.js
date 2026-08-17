"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAction = void 0;
const password_helper_1 = require("../../../shared/helpers.ts/password.helper");
const jwt_helper_1 = require("../../../shared/helpers.ts/jwt.helper");
const auth_repository_1 = require("../repositories/auth.repository");
const app_error_1 = require("../../../shared/errors/app.error");
const loginAction = async (data) => {
    const { email, password } = data;
    const user = await (0, auth_repository_1.findUserByEmail)(email);
    if (!user) {
        throw new Error("Invalid email or password");
    }
    const isPasswordValid = await (0, password_helper_1.comparePassword)(password, user.password);
    if (!isPasswordValid) {
        throw new app_error_1.AppError("Invalid email or password", 401);
    }
    const token = (0, jwt_helper_1.generateToken)(user._id.toString(), user.role);
    const { password: _password, ...userData } = user.toObject();
    return {
        user: userData,
        token,
    };
};
exports.loginAction = loginAction;
//# sourceMappingURL=login.action.js.map