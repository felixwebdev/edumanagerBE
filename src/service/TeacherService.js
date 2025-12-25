import Teacher from "../model/Teacher.js";

class TeacherService {
    // Create a new teacher
    async createTeacher(data) {
        const newTeacher = new Teacher(data);
        return await newTeacher.save();
    }
    // Get all teachers
    async getAllTeachers() {
        return await Teacher.find();
    }
    // Get a teacher by ID
    async getTeacherById(id) {
        return await Teacher.findById(id);
    }

    async deleteTeacher(id) {
        return await Teacher.findByIdAndDelete(id);
    }
};

export default new TeacherService();