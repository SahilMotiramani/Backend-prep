"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const adminController_1 = require("../controllers/adminController");
const router = (0, express_1.Router)();
router.post('/admin', authMiddleware_1.authenticate, authMiddleware_1.authorizeAdmin, adminController_1.banner);
exports.default = router;
