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
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const logger_1 = __importDefault(require("./utils/logger"));
const user_1 = __importDefault(require("./models/user"));
const sequelize_typescript_1 = require("sequelize-typescript");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
const sequelize = new sequelize_typescript_1.Sequelize({
    database: process.env.MYSQL_DATABASE,
    dialect: 'mysql',
    port: 3310,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    models: [user_1.default],
    logging: false,
});
const connexion = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        logger_1.default.info(`Connection has ${process.env.MYSQL_DATABASE} been established successfully.`);
        // await sequelize.sync({ force: true }) // (force: true) completely deleted the table at each synchronization
    }
    catch (error) {
        logger_1.default.fatal('Unable to connect to the database:', error);
    }
});
connexion();
/**
 * To handle the POST request coming from the front-end application,
 * we need to extract the JSON body.
 * For this, you just need a very simple middleware,
 * provided by the Express framework.
 */
app.use(express_1.default.json());
// routes
app.use('/api/v1/users', userRoutes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map