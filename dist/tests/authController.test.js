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
const app_1 = __importDefault(require("../app"));
const supertest_1 = __importDefault(require("supertest"));
const user_1 = __importDefault(require("../models/user"));
const passwordBcrypt_1 = require("../authentification/passwordBcrypt");
// cleaning the table before each test
beforeEach(() => {
    return user_1.default.destroy({ truncate: true });
});
describe('User auth API', () => {
    describe('User Registration', () => {
        const postValidUser = () => (0, supertest_1.default)(app_1.default).post('/api/v1/users/register').send({
            email: 'user1@mail.com',
            password: 'P4ssword',
        });
        test('validate user registration', () => __awaiter(void 0, void 0, void 0, function* () {
            // check if DB is empty
            let userList = yield user_1.default.findAll();
            expect(userList.length).toBe(0);
            // Call our route
            const response = yield postValidUser();
            // Check status - message - if property user exist
            expect(response.status).toBe(201);
            expect(response.body.message).toBe('User created');
            expect(response.body).toHaveProperty('user');
            // check if exist a user in DB
            userList = yield user_1.default.findAll();
            expect(userList.length).toBe(1);
            // check email in DB
            const savedUser = userList[0];
            expect(savedUser.email).toBe('user1@mail.com');
            // makes sure the password is not plain text (it's hashed)
            expect(savedUser.password).not.toBe('P4ssword');
        }));
        // test('should email unique', async () => {
        //   const newUser = await User.create({
        //     email: 'user1@mail.com',
        //     password: 'P4ssword',
        //   })
        //   // await expect(postValidUser()).rejects.toThrow()
        //   // expect(t).toThrow(TypeError)
        // })
    });
    describe('User Login', () => {
        const postLoginUser = () => (0, supertest_1.default)(app_1.default).post('/api/v1/users/login').send({
            email: 'user1@mail.com',
            password: 'P4ssword',
        });
        test('should return 200 and cookies', () => __awaiter(void 0, void 0, void 0, function* () {
            let userList = yield user_1.default.findAll();
            expect(userList.length).toBe(0);
            yield user_1.default.create({
                email: 'user1@mail.com',
                password: yield (0, passwordBcrypt_1.passwordHashed)('P4ssword'),
            });
            userList = yield user_1.default.findAll();
            expect(userList.length).toBe(1);
            const response = yield postLoginUser();
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('user');
        }));
    });
});
//# sourceMappingURL=authController.test.js.map