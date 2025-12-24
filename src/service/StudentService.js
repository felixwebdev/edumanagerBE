import Student from "../model/Student.js";

class StudentService {
    async getAllStudents() {
        return await Student.find();
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
        return await Student.find({studentId: si});
    }
}

export default new StudentService();