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
beforeEach(() => user_1.default.destroy({ truncate: true }));
describe('User API', () => {
    test('should return a array users --> GET /api/v1/users/', () => __awaiter(void 0, void 0, void 0, function* () {
        let response = yield (0, supertest_1.default)(app_1.default).get('/api/v1/users/');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
        const newUser = yield user_1.default.create({
            email: 'user1@mail.com',
            password: 'P4ssword',
        });
        response = yield (0, supertest_1.default)(app_1.default).get('/api/v1/users/');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            {
                createdAt: expect.any(String),
                email: newUser.email,
                id: newUser.id,
                updatedAt: expect.any(String),
            },
        ]);
    }));
    test('should return only a user --> GET /api/v1/users/:id', () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = yield user_1.default.create({
            email: 'user1@mail.com',
            password: 'P4ssword',
        });
        const response = yield (0, supertest_1.default)(app_1.default).get('/api/v1/users/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            createdAt: expect.any(String),
            email: newUser.email,
            id: newUser.id,
            updatedAt: expect.any(String),
        });
    }));
    test('should return 404 if user not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get('/api/v1/users/99999');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Not Found');
    }));
    test('should updated a user in DB --> PUT /api/v1/users/id', () => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.default.create({
            email: 'user1@mail.com',
            password: 'P4ssword',
        });
        const response = yield (0, supertest_1.default)(app_1.default).put('/api/v1/users/1').send({
            email: 'user10@mail.com',
        });
        const userList = yield user_1.default.findAll();
        expect(userList.length).toBe(1);
        expect(response.body).toEqual({
            createdAt: expect.any(String),
            email: 'user10@mail.com',
            id: expect.any(Number),
            updatedAt: expect.any(String),
        });
    }));
    test('should deleted a user in DB --> DELETE /api/v1/users/id', () => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.default.create({
            email: 'user1@mail.com',
            password: 'P4ssword',
        });
        const response = yield (0, supertest_1.default)(app_1.default).delete('/api/v1/users/1');
        expect(response.status).toBe(204);
        const userList = yield user_1.default.findAll();
        expect(userList.length).toBe(0);
    }));
});
//# sourceMappingURL=userController.test.js.map