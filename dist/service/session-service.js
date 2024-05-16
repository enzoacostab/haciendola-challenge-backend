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
exports.logout = exports.login = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ActiveSessions_1 = __importDefault(require("../models/ActiveSessions"));
const config_1 = __importDefault(require("../util/config"));
const { SECRET } = config_1.default;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({
            where: {
                email
            }
        });
        const alreadyLogged = yield ActiveSessions_1.default.findOne({
            include: {
                model: User_1.default,
                where: {
                    email
                }
            }
        });
        const passwordCorrect = user
            ? yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.passwordHash)
            : false;
        if (!user || !passwordCorrect) {
            return res.status(401).json({
                error: 'The email or password is incorrect'
            });
        }
        if (alreadyLogged) {
            res.json({ id: alreadyLogged.userId, token: alreadyLogged.token });
        }
        const userForToken = {
            email,
            id: user.id
        };
        const token = jsonwebtoken_1.default.sign(userForToken, SECRET);
        yield ActiveSessions_1.default.create({
            token,
            userId: user.id
        });
        res.json({ token, id: user.id });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            throw new Error('User not authenticated');
        }
        yield ActiveSessions_1.default.destroy({
            where: {
                userId: user.id
            }
        });
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
});
exports.logout = logout;
