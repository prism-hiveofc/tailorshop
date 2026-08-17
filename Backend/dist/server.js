"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const database_1 = require("./database/database");
const startServer = async () => {
    await (0, database_1.connectDatabase)();
    app_1.default.listen(env_1.ENV.PORT, () => {
        console.log(` Server Running on Port ${env_1.ENV.PORT}`);
    });
};
startServer();
//# sourceMappingURL=server.js.map