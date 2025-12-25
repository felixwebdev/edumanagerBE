import Student from "../model/Student.js";
import EnrollmentForm from "../model/EnrollmentForm.js";

class StudentService {
    async getAllStudents() {
        // Fetch all students
        const students = await Student.find({}, null, { sort: { studentId: 1 } }).lean();

        // Fetch active enrollments (status "1")
        const activeEnrollments = await EnrollmentForm.find({ status: "1" });

        // Map studentId to className for quick lookup
        const enrollmentMap = {};
        activeEnrollments.forEach(e => {
            enrollmentMap[e.studentId] = e.className;
        });

        // Merge class info into student data
        const studentsWithClass = students.map(student => ({
            ...student,
            className: enrollmentMap[student.studentId] || null
        }));

        return studentsWithClass;
    }

    async getStudentById(studentId) {
        return await Student.findById(studentId);
    }

    async registerStudent(studentData) {
        const newStudent = new Student(studentData);
        await newStudent.save();
        return newStudent;
    }

    async updateStudent(studentId, updateData) {
        return await Student.findByIdAndUpdate(studentId, updateData, { new: true });
    }

    async deleteStudent(studentId) {
        return await Student.findByIdAndDelete(studentId);
    }

    async getStudentsBySI(si) {
        return await Student.find({ studentId: si });
    }
}

export default new StudentService();