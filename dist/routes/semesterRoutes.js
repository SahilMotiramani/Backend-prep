"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const semesterController_1 = __importDefault(require("../controllers/semesterController"));
const router = express_1.default.Router();
router.post('/semesters', semesterController_1.default.createSemester);
router.post('/semesters/:semesterId/subjects', semesterController_1.default.addSubject);
router.post('/semesters/:semesterId/subjects/:subjectId/chapters', semesterController_1.default.addchapter);
router.post('/semesters/:semesterId/subjects/:subjectId/chapters/:chapterId/resources', semesterController_1.default.addResource);
router.get('/semesters', semesterController_1.default.getAllSemesters);
router.get('/semesters/:semesterId/subjects', semesterController_1.default.getSubjectsBySemester.bind(semesterController_1.default));
router.get("/semesters/:semesterId/subjects/:subjectId/chapters", semesterController_1.default.getChaptersById);
exports.default = router;
