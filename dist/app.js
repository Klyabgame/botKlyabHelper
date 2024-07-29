"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const controller_1 = require("./presentation/openAI/controller");
const cors_1 = __importDefault(require("cors"));
(() => {
    main();
})();
function main() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json()); // raw
    app.use(express_1.default.urlencoded({ extended: true })); // x-www-form-urlencoded
    app.use((0, cors_1.default)());
    const controller = new controller_1.OpenAIController();
    app.get('/', (req, res) => {
        res.send('Bot de Discord está activo.');
    });
    app.post('/api/openAI', controller.postMessageGPT);
    app.listen(config_1.envs.PORT, () => {
        console.log(`APP running on port ${config_1.envs.PORT}`);
    });
}
