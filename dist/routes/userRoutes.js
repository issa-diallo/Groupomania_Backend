"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// auth
router.post('/register', authController_1.signUp);
router.post('/login', authController_1.signIn);
// user DB
router.get('/', userController_1.getAllUsers);
router.get('/:id', userController_1.userInfo);
router.put('/:id', userController_1.updateUser);
router.delete('/:id', userController_1.deleteUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map