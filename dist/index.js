"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./utils/logger"));
app_1.default.listen(process.env.PORT, () => {
    logger_1.default.info(`Listening on port at http://localhost:${process.env.PORT}`);
});
exports.default = app_1.default;
//# sourceMappingURL=index.js.map