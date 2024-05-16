"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = __importDefault(require("./controller/product-controller"));
const user_cotroller_1 = __importDefault(require("./controller/user-cotroller"));
const session_controller_1 = __importDefault(require("./controller/session-controller"));
const middleware_js_1 = require("./util/middleware.js");
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./util/config"));
const { CLIENT_URL } = config_1.default;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: CLIENT_URL }));
app.use(session_controller_1.default);
app.use(user_cotroller_1.default);
app.use(product_controller_1.default);
app.use(middleware_js_1.errorHandler);
exports.default = app;