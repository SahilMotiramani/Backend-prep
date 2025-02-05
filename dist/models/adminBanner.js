"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banner = void 0;
const mongoose_1 = require("mongoose");
const bannerSchema = new mongoose_1.Schema({
    imageUrl: { type: String, required: true },
    text: { type: String, optional: true },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true }, // Correctly specify ObjectId type
    createdAt: { type: Date, default: Date.now }
});
exports.Banner = (0, mongoose_1.model)('Banner', bannerSchema);
