import express from 'express';
import semesterController from '../controllers/semesterController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/semesters', semesterController.createSemester);
router.post('/semesters/:semesterId/subjects', semesterController.addSubject);
router.post('/semesters/:semesterId/subjects/:subjectId/chapters', semesterController.addchapter);
router.post('/semesters/:semesterId/subjects/:subjectId/chapters/:chapterId/resources', semesterController.addResource);



router.get('/semesters', semesterController.getAllSemesters);
router.get('/semesters/:semesterId/subjects', semesterController.getSubjectsBySemester.bind(semesterController));
router.get("/semesters/:semesterId/subjects/:subjectId/chapters", semesterController.getChaptersById)

export default router;
