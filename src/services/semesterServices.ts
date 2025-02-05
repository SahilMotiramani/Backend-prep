import Semester, { ISemester, ISubject, IResource, IChapter } from '../models/semester';
import mongoose from 'mongoose';

class SemesterService {
    async createSemester(data: ISemester): Promise<ISemester> {
        const semester = new Semester(data);
        return await semester.save();
    }

    async addSubject(semesterId: string, subjectName: string): Promise<ISubject> {
        const semester = await Semester.findById(semesterId);
        if (!semester) throw new Error('Semester not found');

        const subject: ISubject = {
            subjectId: new mongoose.Types.ObjectId(),
            subjectName,
            chapters: [],
        };

        semester.subjects.push(subject);
        await semester.save();
        return subject;
    }

    async addResource(
        semesterId: string,
        subjectId: string,
        chapterId: string,
        resourceData: { resourceType: 'pdf' | 'video'; resourceUrl: string } // Restricting resourceType
    ): Promise<IResource> {
        const semester = await Semester.findById(semesterId);
        if (!semester) throw new Error('Semester not found');
        console.log(semester)
    
        const subject = semester.subjects.find((s: ISubject) => s.subjectId.equals(subjectId));
        if (!subject) throw new Error('Subject not found');
        console.log(subject)

        const chapterIdObj = new mongoose.Types.ObjectId(chapterId);

    
        const chapter = subject.chapters.find((c: IChapter) => c.chapterId.equals(chapterIdObj));
        if (!chapter) {
            console.log('Chapter ID passed:', chapterId);
            console.log('Available Chapters:', subject.chapters.map(c => c.chapterId.toString())); // Log available chapters
            throw new Error('Chapter not found');
        }

        if (!chapter) throw new Error('Chapter not found');
    
        // Validate resourceType
        if (!['pdf', 'video'].includes(resourceData.resourceType)) {
            throw new Error('Invalid resource type. Allowed types are "pdf" or "video".');
        }
    
        const resource: IResource = {
            resourceId: new mongoose.Types.ObjectId(),
            resourceType: resourceData.resourceType,
            resourceUrl: resourceData.resourceUrl,
            createdAt: new Date(),
        };
    
        chapter.resources.push(resource);
        await semester.save();
    
        return resource;
    }
    


    async getAllSemesters(): Promise<ISemester[]> {
        return await Semester.find({}, { semesterName: 1, year: 1 });
    }

    async getSubjectsBySemester(semesterId: string): Promise<ISubject[]> {
        const semester = await Semester.findById(semesterId)
            .populate('subjects', 'subjectName'); // Populate subjects
        if (!semester) {
            throw new Error('Semester not found');
        }
        return semester.subjects; // Return the populated subjects
    }
    
    async getChaptersBySubjectId(subjectId: string): Promise<IChapter[]> {
        const semester = await Semester.findOne({ 'subjects.subjectId': subjectId });
        if (!semester) throw new Error('Semester not found');
    
        const subject = semester.subjects.find((s: ISubject) => s.subjectId.equals(subjectId));
        if (!subject) throw new Error('Subject not found');
    
        return subject.chapters; // Return the chapters directly
    }
    


    async addChapter(semesterId: string, subjectId: string, chapterName: string): Promise<IChapter> {
        const semester = await Semester.findById(semesterId);
        if (!semester) throw new Error(`Semester with ID ${semesterId} not found`);
    
        const subject = semester.subjects.find((s: ISubject) => s.subjectId.toString() === subjectId);
        if (!subject) throw new Error(`Subject with ID ${subjectId} not found`);
    
        const chapter: IChapter = {
            chapterId: new mongoose.Types.ObjectId(),
            chapterName,
            resources: [],
        };
    
        subject.chapters.push(chapter);
        await semester.save();
        return chapter;
    }
    


}

export default new SemesterService();
