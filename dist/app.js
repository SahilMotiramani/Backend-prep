"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const semesterRoutes_1 = __importDefault(require("./routes/semesterRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
mongoose_1.default.connect('mongodb+srv://shivpratikhande2017:KWAj0BaKnkHOio9s@cluster0.ggko1.mongodb.net/')
    .then(() => console.log('Connected successfully to MongoDB'))
    .catch(err => console.error("failed to connect", err));
app.use('/auth', authRoutes_1.default);
app.use('/user', userRoutes_1.default);
app.use("/admin", adminRoutes_1.default);
app.use("/api", semesterRoutes_1.default);
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
