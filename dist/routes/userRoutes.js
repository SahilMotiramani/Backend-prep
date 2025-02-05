"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.get('/profile', authMiddleware_1.authenticate, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});
exports.default = router;
