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
exports.signIn = exports.signUp = void 0;
const loginToken_1 = require("../authentification/loginToken");
const user_1 = __importDefault(require("../models/user"));
const passwordBcrypt_1 = require("../authentification/passwordBcrypt");
/**
 * @Route /api/v1/users/register - POST
 */
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        email: req.body.email,
        password: yield (0, passwordBcrypt_1.passwordHashed)(req.body.password),
    };
    const newUser = yield user_1.default.create(user);
    return res.status(201).json({ user: newUser.id, message: 'User created' });
});
exports.signUp = signUp;
/**
 * @Route /api/v1/users/login - POST
 */
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ where: { email: req.body.email } });
    // the compare function of bcrypt to compare the password entered by the user with the hash stored in the database and  true or false
    const isPasswordValid = user && (yield (0, passwordBcrypt_1.compareHashed)(req.body.password, user.password));
    if (!isPasswordValid) {
        res
            .status(401)
            .json({ message: 'Sorry, the email or password is incorrect!' });
    }
    // time cookie
    const maxAge = 3 * 24 * 60 * 60 * 1000;
    // create a token with the userId and the secret key
    const token = (0, loginToken_1.createToken)(user.id);
    res.cookie('jwt', token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user.id });
});
exports.signIn = signIn;
//# sourceMappingURL=authController.js.map