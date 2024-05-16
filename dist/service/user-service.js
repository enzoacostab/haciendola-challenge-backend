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
exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.findAll();
        if (!users) {
            return res.status(401).json({ message: "No user found" });
        }
        res.json(users);
    }
    catch (error) {
        next(error);
    }
});
exports.getUsers = getUsers;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const where = {};
    if (req.query.read) {
        where.read = req.query.read === 'true';
    }
    try {
        const { id } = req.params;
        const user = yield User_1.default.findByPk(id);
        if (!user) {
            throw new Error("User not found");
        }
        res.json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getUser = getUser;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const checkUsername = yield User_1.default.findOne({
            where: {
                email
            }
        });
        if (checkUsername)
            throw new Error('An account with this email already exists');
        const passwordHash = yield bcrypt_1.default.hash(password, 10);
        const user = yield User_1.default.create({
            name,
            email,
            passwordHash
        });
        res.json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    const newEmail = req.body.email;
    try {
        const user = yield User_1.default.findOne({
            where: {
                email
            }
        });
        if (!user) {
            throw new Error("User not found");
        }
        user.email = newEmail;
        yield user.save();
        res.json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
