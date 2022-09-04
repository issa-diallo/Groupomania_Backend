"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.userInfo = exports.getAllUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
/**
 * Get all users
 * @Route /api/v1/users/ - GET
 */
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.findAll({ attributes: { exclude: ['password'] } });
    res.status(200).json(users);
});
exports.getAllUsers = getAllUsers;
/**
 * Get a user
 * @Route /api/v1/users/ - GET
 */
const userInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const paramsId = req.params.id;
    const user = yield user_1.default.findByPk(paramsId, {
        attributes: { exclude: ['password'] },
    });
    if (!user) {
        res.status(404).json({ message: 'Not Found' });
        return next();
    }
    res.status(200).json(user);
});
exports.userInfo = userInfo;
/**
 * Update a user
 * @Route /api/v1/users/:id - PUT
 */
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paramsId = req.params.id;
    const user = yield user_1.default.findByPk(paramsId, {
        attributes: { exclude: ['password'] },
    });
    yield user.update(Object.assign({}, req.body));
    res.status(200).json(user);
});
exports.updateUser = updateUser;
/**
 * Delete a user
 * @Route /api/v1/users/:id - DELETE
 */
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paramsId = req.params.id;
    const user = yield user_1.default.findByPk(paramsId, {
        attributes: { exclude: ['password'] },
    });
    yield user.destroy();
    res.status(204).json();
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map