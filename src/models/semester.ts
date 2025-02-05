
/* const allowedSemesters = [
    { id: 1, name: "Semester 1" },
    { id: 2, name: "Semester 2" },
    { id: 3, name: "Semester 3" },
    { id: 4, name: "Semester 4" },
    { id: 5, name: "Semester 5" },
    // Add more as needed
]; */
import mongoose, { Schema, Document } from 'mongoose';

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

export interface IResource {
    resourceId: mongoose.Types.ObjectId;
    resourceType: 'pdf' | 'video'; 
    resourceUrl: string;
    createdAt: Date;
}

export interface IChapter {
    chapterId: mongoose.Types.ObjectId;
    chapterName: string;
    resources: IResource[];
}
export interface ISubject {
    subjectId: mongoose.Types.ObjectId;
    subjectName: string;
    chapters: IChapter[];
}

export interface ISemester extends Document {
    semesterName: string;
    year: number;
    subjects: ISubject[];
}

const ResourceSchema = new Schema<IResource>({
    resourceId: { type: mongoose.Schema.Types.ObjectId, required: true },
    resourceType: {
        type: String,
        required: true,
        enum: ['pdf', 'video'], // Allowed values for resourceType
    },
    resourceUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

//

const ChapterSchema  = new Schema<IChapter>({
    chapterId: { type: mongoose.Schema.Types.ObjectId, required: true },
    chapterName: { type: String, required: true },
    resources: [ResourceSchema],

})
//

const SubjectSchema = new Schema<ISubject>({
    subjectId: { type: mongoose.Schema.Types.ObjectId, required: true },
    subjectName: { type: String, required: true },
    chapters: [ChapterSchema],
});

// Update SemesterSchema to include enum validation
const SemesterSchema = new Schema<ISemester>({
    semesterName: { type: String, required: true, enum: allowedSemesterNames, unique: true },
    year: { type: Number, required: true },
    subjects: [SubjectSchema],
});


const Semester = mongoose.model<ISemester>('Semester', SemesterSchema);

export default Semester;
