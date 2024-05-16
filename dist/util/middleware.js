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
exports.userExtractor = exports.errorHandler = void 0;
const ActiveSessions_1 = __importDefault(require("../models/ActiveSessions"));
const User_1 = __importDefault(require("../models/User"));
const errorHandler = (error, req, res, next) => {
    console.error(error.message);
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' });
    }
    res.status(500).json({ error: error.message });
    next(error);
};
exports.errorHandler = errorHandler;
const userExtractor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.get('authorization');
    console.log(token);
    if (token && token.startsWith('Bearer ')) {
        try {
            const session = yield ActiveSessions_1.default.findOne({
                include: {
                    model: User_1.default
                },
                where: {
                    token: token.substring(7)
                }
            });
            console.log(session);
            req.user = session === null || session === void 0 ? void 0 : session.user;
        }
        catch (error) {
            return res.status(401).json({ error: 'token invalid' });
        }
    }
    else {
        return res.status(401).json({ error: 'token missing' });
    }
    next();
});
exports.userExtractor = userExtractor;
