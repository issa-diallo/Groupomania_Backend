"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHashed = exports.passwordHashed = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const passwordHashed = (reqPassword) => bcrypt_1.default.hash(reqPassword, 10);
exports.passwordHashed = passwordHashed;
const compareHashed = (reqPassword, passwordDB) => bcrypt_1.default.compare(reqPassword, passwordDB);
exports.compareHashed = compareHashed;
//# sourceMappingURL=passwordBcrypt.js.map