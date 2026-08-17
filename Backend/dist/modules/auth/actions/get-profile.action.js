"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileAction = void 0;
const auth_repository_1 = require("../repositories/auth.repository");
const getProfileAction = async (userId) => {
    const user = await (0, auth_repository_1.findUserById)(userId);
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};
exports.getProfileAction = getProfileAction;
//# sourceMappingURL=get-profile.action.js.map