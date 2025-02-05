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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeAdmin = exports.authenticate = void 0;
const authService_1 = require("../services/authService");
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    const token = req.cookies.token;
    console.log(token);
    if (token == null)
        return res.sendStatus(401);
    try {
        const user = yield (0, authService_1.authenticateToken)(token);
        req.user = user; // Attach user to request
        console.log(user);
        next();
    }
    catch (error) {
        res.sendStatus(403);
    }
});
exports.authenticate = authenticate;
// Middleware to authorize admin users
const authorizeAdmin = (req, res, next) => {
    const user = req.user; // Retrieve user from request
    // Check if the user role is 'admin'
    if (user && user.role === 'admin') {
        next(); // Proceed if user is admin
    }
    else {
        res.sendStatus(403); // Forbidden
    }
};
exports.authorizeAdmin = authorizeAdmin;
