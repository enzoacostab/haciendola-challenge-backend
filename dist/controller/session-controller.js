"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_service_1 = require("../service/session-service");
const middleware_1 = require("../util/middleware");
const router = (0, express_1.Router)();
router.post('/api/login', session_service_1.login);
router.delete('/api/logout', middleware_1.userExtractor, session_service_1.logout);
exports.default = router;
