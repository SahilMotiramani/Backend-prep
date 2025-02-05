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
const semesterServices_1 = __importDefault(require("../services/semesterServices"));
class SemesterController {
    createSemester(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const semester = yield semesterServices_1.default.createSemester(req.body);
                res.status(201).json({ semesterId: semester._id, semester });
            }
            catch (error) { // Specify the type as unknown
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message }); // Access error.message safely
                }
                else {
                    res.status(500).json({ error: 'An unexpected error occurred.' });
                }
            }
        });
    }
    addSubject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { semesterId } = req.params;
            const { subjectName } = req.body;
            try {
                const subject = yield semesterServices_1.default.addSubject(semesterId, subjectName);
                res.status(201).json(subject);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'An unexpected error occurred.' });
                }
            }
        });
    }
    addchapter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { semesterId, subjectId } = req.params;
            const { chapterName } = req.body;
            try {
                const subject = yield semesterServices_1.default.addChapter(semesterId, subjectId, chapterName);
                res.status(201).json(subject);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'An unexpected error occurred.' });
                }
            }
        });
    }
    addResource(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { semesterId, subjectId, chapterId } = req.params;
            console.log(chapterId);
            console.log(semesterId);
            console.log(subjectId);
            try {
                console.log("in");
                const resource = yield semesterServices_1.default.addResource(semesterId, subjectId, chapterId, req.body);
                console.log("sown");
                res.status(201).json(resource);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'An unexpected error occurred.' });
                }
            }
        });
    }
    getAllSemesters(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const semesters = yield semesterServices_1.default.getAllSemesters();
                res.status(200).json(semesters);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'An unexpected error occurred.' });
                }
            }
        });
    }
    getSubjectsBySemester(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { semesterId } = req.params;
            try {
                const subjects = yield semesterServices_1.default.getSubjectsBySemester(semesterId);
                res.json(subjects);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'An unexpected error occurred.' });
                }
            }
        });
    }
    getChaptersById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { subjectId } = req.params;
            console.log(subjectId);
            try {
                const chapters = yield semesterServices_1.default.getChaptersBySubjectId(subjectId);
                console.log(chapters);
                res.json(chapters);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'An unexpected error occurred.' });
                }
            }
        });
    }
}
exports.default = new SemesterController();
