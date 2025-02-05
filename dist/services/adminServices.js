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
exports.createBanner = void 0;
const adminBanner_1 = require("../models/adminBanner"); // Adjust the import based on your structure
// Service to create a new banner
const createBanner = (imageUrl, text, createdBy) => __awaiter(void 0, void 0, void 0, function* () {
    const newBanner = new adminBanner_1.Banner({
        imageUrl,
        text,
        createdBy,
    });
    return yield newBanner.save();
});
exports.createBanner = createBanner;
