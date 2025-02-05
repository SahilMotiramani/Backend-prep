"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* const allowedSemesters = [
    { id: 1, name: "Semester 1" },
    { id: 2, name: "Semester 2" },
    { id: 3, name: "Semester 3" },
    { id: 4, name: "Semester 4" },
    { id: 5, name: "Semester 5" },
    // Add more as needed
]; */
const mongoose_1 = __importStar(require("mongoose"));
// Allowed semesters defined earlier
const allowedSemesters = [
    { id: 1, name: "Semester 1" },
    { id: 2, name: "Semester 2" },
    { id: 3, name: "Semester 3" },
    { id: 4, name: "Semester 4" },
    { id: 5, name: "Semester 5" },
    // Add more as needed
];
// Extract allowed semester names for enum validation
const allowedSemesterNames = allowedSemesters.map(sem => sem.name);
const ResourceSchema = new mongoose_1.Schema({
    resourceId: { type: mongoose_1.default.Schema.Types.ObjectId, required: true },
    resourceType: {
        type: String,
        required: true,
        enum: ['pdf', 'video'], // Allowed values for resourceType
    },
    resourceUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
//
const ChapterSchema = new mongoose_1.Schema({
    chapterId: { type: mongoose_1.default.Schema.Types.ObjectId, required: true },
    chapterName: { type: String, required: true },
    resources: [ResourceSchema],
});
//
const SubjectSchema = new mongoose_1.Schema({
    subjectId: { type: mongoose_1.default.Schema.Types.ObjectId, required: true },
    subjectName: { type: String, required: true },
    chapters: [ChapterSchema],
});
// Update SemesterSchema to include enum validation
const SemesterSchema = new mongoose_1.Schema({
    semesterName: { type: String, required: true, enum: allowedSemesterNames, unique: true },
    year: { type: Number, required: true },
    subjects: [SubjectSchema],
});
const Semester = mongoose_1.default.model('Semester', SemesterSchema);
exports.default = Semester;
