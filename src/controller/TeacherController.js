import TeacherService from "../service/TeacherService.js";
import UserService from "../service/UserService.js";
import TAService from "../service/TAService.js";
import ROLE from "../config/role.js";
import ApiResponse from "../utils/ApiResponse.js";

class TeacherController {
    async createTeacher(req, res, next) {
        try {
            const teacherData = req.body;
            const createdTeacher = await TeacherService.createTeacher(teacherData);
            const newUser = await UserService.register(teacherData.email, teacherData.password, createdTeacher.id, ROLE.GVBM);
            return ApiResponse.success(res, {
                username: teacherData.email,
                fullname: createdTeacher.fullname,
                token: newUser.accessToken
            });
        }
        catch(err) {
            next(err);
        }
    }

    async getAllTeachers(req, res, next) {
        try {
            const teachers = await TeacherService.getAllTeachers();
            return ApiResponse.success(res, teachers);
        }
        catch(err) {
            next(err);
        }
    }

    async getTeacherById(req, res, next) {
        try {
            const teacherId = req.params.id;
            const teacher = await TeacherService.getTeacherById(teacherId);
            return ApiResponse.success(res, teacher);
        }
        catch(err) {
            next(err);
        }
    }

    async getTeachingAssignments(req, res, next) {
        try {
            const userId = req.user.id;
            const user = await UserService.getUserById(userId);
            if (!user || !user.userId) {
                return ApiResponse.error(res, "User is not a teacher", 403);
            }
            const assignments = await TAService.getTeachingAssignmentsByTeacher(user.userId);
            return ApiResponse.success(res, assignments);
        }
        catch(err) {
            next(err);
        }
    }
}

export default new TeacherController();
