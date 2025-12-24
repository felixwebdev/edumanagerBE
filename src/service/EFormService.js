import EnrollmentForm from "../model/EnrollmentForm.js";
import Class from "../model/Class.js";

class EFormService {
    async getAllEForms() {
        return await EnrollmentForm.find();
    }

    async createEForm(eformData) {
        const newEForm = new EnrollmentForm(eformData);
        await newEForm.save();
        return newEForm;
    }

    async updateEFormStatus(StudentId, ClassId, status) {
        let ClassName = "null";
        if (ClassId !== "null") {
            const classData = await Class.findById(ClassId);
            ClassName = classData.className;
        }
        return await EnrollmentForm.findOneAndUpdate(
            { studentId: StudentId},
            { 
                classId: ClassId,
                className: ClassName,
                status: status 
            },
            { new: true }
        );
    }

    async getEFormByStudentId(studentId) {
        return await EnrollmentForm.findOne({ studentId: studentId });
    }

    async getEFormWithStatus(status) {
        return await EnrollmentForm.find({ status: status });
    }
}

export default new EFormService();