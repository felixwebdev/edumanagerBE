import SubjectGradeService from "../service/SubjectGradeService.js";
import UserService from "../service/UserService.js";
import ApiResponse from "../utils/ApiResponse.js";

class SubjectGradeController {
    async addSubjectGrade(req, res, next) {
        try {
            const gradeData = req.body;
            const userId = req.user.id;
            const user = await UserService.getUserById(userId);
            const newGrade = await SubjectGradeService.addSubjectGrade(gradeData, user.userId);
            return ApiResponse.success(res, newGrade);
        }
        catch(err) {
            next(err);
        }
    }

    async getGradesByStudentId(req, res, next) {
        try {
            const studentId = req.params.studentId;
            const grades = await SubjectGradeService.getGradesByStudentId(studentId);
            return ApiResponse.success(res, grades);
        }
        catch(err) {
            next(err);
        }
    }

    async updateSubjectGrade(req, res, next) {
        try {
            const gradeId = req.params.id;
            const updateData = req.body;
            const updatedGrade = await SubjectGradeService.updateSubjectGrade(gradeId, updateData);
            return ApiResponse.success(res, updatedGrade);
        }
        catch(err) {
            next(err);
        }
    }

    async deleteSubjectGrade(req, res, next) {
        try {
            const gradeId = req.params.id;
            await SubjectGradeService.deleteSubjectGrade(gradeId);
            return ApiResponse.success(res, { message: "Subject grade deleted successfully" });
        }
        catch(err) {
            next(err);
        }
    }

    async getGradesSaved(req, res, next) {
        try{
            const userId = req.user.id;
            const teacher = await UserService.getUserById(userId);
            const grades = await SubjectGradeService.getGradesSaved(teacher.userId);
            return ApiResponse.success(res, grades);
        }
        catch (err){
            next(err)
        }
    }

}

export default new SubjectGradeController();