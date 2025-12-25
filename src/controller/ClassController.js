import ClassService from "../service/ClassService.js";
import Student from "../model/Student.js";
import EFormService from "../service/EFormService.js";
import User from "../model/User.js";
import ApiResponse from "../utils/ApiResponse.js";

class ClassController {
    async createClass(req, res, next) {
        try {
            const classData = req.body;
            const newClass = await ClassService.createClass(classData);
            return ApiResponse.success(res, newClass);
        }
        catch (err) {
            next(err);
        }
    }

    async getClassById(req, res, next) {
        try {
            const classId = req.params.id;
            const classDetails = await ClassService.getClassById(classId);
            return ApiResponse.success(res, classDetails);
        }
        catch (err) {
            next(err);
        }
    }

    async getAllClasses(req, res, next) {
        try {
            const result = await ClassService.getAllClasses();
            return ApiResponse.success(res, result);
        }
        catch(err) {
            next(err);
        }
    }

    async updateClass(req, res, next) {
        try {
            const classId = req.params.id;
            const updateData = req.body;
            const updatedClass = await ClassService.updateClass(classId, updateData);
            return ApiResponse.success(res, updatedClass);
        }
        catch (err) {
            next(err);
        }
    }

    async getStudentsByClassId(req, res, next) {
        try {
            const classId = req.params.id;
            const students = await ClassService.getStudentsByClassId(classId);
            return ApiResponse.success(res, students);
        }
        catch (err) {
            next(err);
        }
    }

    async addStudentToClass(req, res, next) {
        try {
            const classId = req.params.id;
            const studentId = req.body.studentId;
            const classData = await ClassService.getClassById(classId);
            if (!classData) {
                return ApiResponse.error(res, "Class not found", 404);
            }

            // Check capacity
            const currentStudents = await ClassService.getStudentsByClassId(classId);
            if (currentStudents.length >= classData.quantity) {
                return ApiResponse.error(res, "Class is full", 400);
            }

            const updatedEForm = await EFormService.updateEFormStatus(studentId, classId, 1);
            return ApiResponse.success(res, updatedEForm);
        }
        catch (err) {
            next(err);
        }
    }

    async getAllClassesWithTeachers(req, res, next) {
        try {
            const classesWithTeachers = await ClassService.getAllClassesWithTeachers();
            return ApiResponse.success(res, classesWithTeachers);
        }
        catch (err) {
            next(err);
        }
    }

    async getClassWithTeacher(req, res, next) {
        try {
            const userId = req.user.id;
            const user = await User.findById(userId);
            const teacherId = user.userId;
            console.log(teacherId);
            const classWithTeacher = await ClassService.getClassWithTeacher(teacherId);
            return ApiResponse.success(res, classWithTeacher);
        }
        catch (err) {
            next(err);
        }
    }

    async deleteClass(req, res, next) {
        try {
            const classId = req.params.id;
            await ClassService.deleteClass(classId);
            return ApiResponse.success(res, { message: "Class deleted successfully" });
        }
        catch (err) {
            next(err);
        }
    }

    async deleteStudentFromClass(req, res, next) {
        try {
            const classId = req.params.id;
            const studentId = req.body.studentId;
            const classData = await ClassService.getClassById(classId);
            const student = await Student.findById(studentId);
            if (!classData) {
                return ApiResponse.error(res, "Class not found", 404);
            }
            const updatedEForm = await EFormService.updateEFormStatus(student.studentId, "null", 0);
            return ApiResponse.success(res, updatedEForm);
        }
        catch (err) {
            next(err);
        }
    }

    async getClassByStudentId(req, res, next) {
        try {
            const studentId = req.body;
            const classData = await EFormService.getEFormByStudentId(studentId);
            return ApiResponse.success(res, classData);
        }
        catch(err) {
            next(err);
        }
    }
}

export default new ClassController();