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
const semester_1 = __importDefault(require("../models/semester"));
const mongoose_1 = __importDefault(require("mongoose"));
class SemesterService {
    createSemester(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const semester = new semester_1.default(data);
            return yield semester.save();
        });
    }
    addSubject(semesterId, subjectName) {
        return __awaiter(this, void 0, void 0, function* () {
            const semester = yield semester_1.default.findById(semesterId);
            if (!semester)
                throw new Error('Semester not found');
            const subject = {
                subjectId: new mongoose_1.default.Types.ObjectId(),
                subjectName,
                chapters: [],
            };
            semester.subjects.push(subject);
            yield semester.save();
            return subject;
        });
    }
    addResource(semesterId, subjectId, chapterId, resourceData // Restricting resourceType
    ) {
        return __awaiter(this, void 0, void 0, function* () {
            const semester = yield semester_1.default.findById(semesterId);
            if (!semester)
                throw new Error('Semester not found');
            console.log(semester);
            const subject = semester.subjects.find((s) => s.subjectId.equals(subjectId));
            if (!subject)
                throw new Error('Subject not found');
            console.log(subject);
            const chapterIdObj = new mongoose_1.default.Types.ObjectId(chapterId);
            const chapter = subject.chapters.find((c) => c.chapterId.equals(chapterIdObj));
            if (!chapter) {
                console.log('Chapter ID passed:', chapterId);
                console.log('Available Chapters:', subject.chapters.map(c => c.chapterId.toString())); // Log available chapters
                throw new Error('Chapter not found');
            }
            if (!chapter)
                throw new Error('Chapter not found');
            // Validate resourceType
            if (!['pdf', 'video'].includes(resourceData.resourceType)) {
                throw new Error('Invalid resource type. Allowed types are "pdf" or "video".');
            }
            const resource = {
                resourceId: new mongoose_1.default.Types.ObjectId(),
                resourceType: resourceData.resourceType,
                resourceUrl: resourceData.resourceUrl,
                createdAt: new Date(),
            };
            chapter.resources.push(resource);
            yield semester.save();
            return resource;
        });
    }
    getAllSemesters() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield semester_1.default.find({}, { semesterName: 1, year: 1 });
        });
    }
    getSubjectsBySemester(semesterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const semester = yield semester_1.default.findById(semesterId)
                .populate('subjects', 'subjectName'); // Populate subjects
            if (!semester) {
                throw new Error('Semester not found');
            }
            return semester.subjects; // Return the populated subjects
        });
    }
    getChaptersBySubjectId(subjectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const semester = yield semester_1.default.findOne({ 'subjects.subjectId': subjectId });
            if (!semester)
                throw new Error('Semester not found');
            const subject = semester.subjects.find((s) => s.subjectId.equals(subjectId));
            if (!subject)
                throw new Error('Subject not found');
            return subject.chapters; // Return the chapters directly
        });
    }
    addChapter(semesterId, subjectId, chapterName) {
        return __awaiter(this, void 0, void 0, function* () {
            const semester = yield semester_1.default.findById(semesterId);
            if (!semester)
                throw new Error(`Semester with ID ${semesterId} not found`);
            const subject = semester.subjects.find((s) => s.subjectId.toString() === subjectId);
            if (!subject)
                throw new Error(`Subject with ID ${subjectId} not found`);
            const chapter = {
                chapterId: new mongoose_1.default.Types.ObjectId(),
                chapterName,
                resources: [],
            };
            subject.chapters.push(chapter);
            yield semester.save();
            return chapter;
        });
    }
}
exports.default = new SemesterService();
