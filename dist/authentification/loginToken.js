"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: 3 * 24 * 60 * 60 * 1000,
    });
};
exports.createToken = createToken;
//# sourceMappingURL=loginToken.js.map