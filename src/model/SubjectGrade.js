import mongoose from 'mongoose';

const SubjectGradeSchema = new mongoose.Schema({
    subjectId: { type: String, required: true },
    subjectName: { type: String, required: true },
    studentId: { type: String, required: true },
    studentName: { type: String, required: true },
    teacherId: { type: String, required: true },
    hs1: { type: Number, required: true },
    hs2: { type: Number, required: true },
    hs3: { type: Number, required: true },
});

export default mongoose.model('SubjectGrade', SubjectGradeSchema);