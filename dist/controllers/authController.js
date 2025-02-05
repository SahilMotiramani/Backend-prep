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
exports.login = exports.register = void 0;
const authService_1 = require("../services/authService");
const semester_1 = __importDefault(require("../models/semester"));
const allowedSemesters = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5'];
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, role, semesterName } = req.body;
        //logic
        if (role === 'student') {
            // Validate semester only for students
            if (!allowedSemesters.includes(semesterName)) {
                res.status(400).json({ message: "Invalid semester name" });
                return; // Early return to prevent further execution
            }
            const semesterr = yield semester_1.default.findOne({ semesterName });
            if (!semesterr) {
                res.status(400).json({ message: "Semester not found" });
                return; // Early return
            }
        }
        else if (role === 'admin') {
            //nt
        }
        else {
            res.status(400).json({ message: "Invalid role" });
            return; // Early return
        }
        yield (0, authService_1.registerUser)(email, password, role, semesterName);
        console.log(email, password, role);
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const { token } = yield (0, authService_1.loginUser)(email, password);
        res.cookie('token', token, {
            httpOnly: true, // Prevents JavaScript access
            secure: false,
            /* sameSite: 'None'   */ // Cookie is only sent over HTTPS in production
            // sameSite: 'Strict', // Helps prevent CSRF attacks
        });
        res.status(200).json({ message: 'Login successful', token }); // Optionally send a success message
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(401).json({ message: error.message }); // Invalid credentials
        }
        else {
            res.status(500).json({ message: 'An unknown error occurred' }); // Server error
        }
    }
});
exports.login = login;
