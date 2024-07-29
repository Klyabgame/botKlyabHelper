"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const env_var_1 = require("env-var");
exports.envs = {
    PORT: (0, env_var_1.get)('PORT').required().asPortNumber(),
    CLAVE_API_OPENAI: (0, env_var_1.get)('CLAVE_API_OPENAI').default('public').asString(),
    DISCORD_TOKEN: (0, env_var_1.get)('DISCORD_TOKEN').default('public').asString(),
    WEB_DEPLOY: (0, env_var_1.get)('WEB_DEPLOY').default('public').asString()
};
