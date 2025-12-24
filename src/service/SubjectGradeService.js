import SubjectGrade from "../model/SubjectGrade.js";
import Student from "../model/Student.js";
import Subject from "../model/Subject.js";

class SubjectGradeService {
    async addSubjectGrade(gradeData, teacherId) {
        const student = await Student.findById(gradeData.studentId);
        const subject = await Subject.findById(gradeData.subjectId);
        const newGrade = new SubjectGrade(gradeData);
        newGrade.studentName = student.fullname;
        newGrade.subjectName = subject.name;
        newGrade.teacherId = teacherId;
        await newGrade.save();
        return newGrade;
    }

    async getGradesByStudentId(studentId) {
        return await SubjectGrade.find({ studentId: studentId });
    }

    async getGradesSaved(teacherId) {
        return await SubjectGrade.find({teacherId: teacherId});
    }

    async updateSubjectGrade(gradeId, updateData) {
        return await SubjectGrade.findByIdAndUpdate(gradeId, updateData, { new: true });
    }

    async deleteSubjectGrade(gradeId) {
        return await SubjectGrade.findByIdAndDelete(gradeId);
    }
}
export default new SubjectGradeService();