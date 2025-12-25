import SubjectService from "../service/SubjectService.js";
import ApiResponse from "../utils/ApiResponse.js";

class SubjectController {
    async getAllSubjects(req, res, next) {
        try {
            const subjects = await SubjectService.getAllSubjects();
            return ApiResponse.success(res, subjects);
        }
        catch (err) {
            next(err);
        }
    }
    async createSubject(req, res, next) {
        try {
            const subjectData = req.body;
            const newSubject = await SubjectService.createSubject(subjectData);
            return ApiResponse.success(res, newSubject);
        }
        catch (err) {
            next(err);
        }
    }

    async deleteSubject(req, res, next) {
        try {
            const subjectId = req.params.id;
            await SubjectService.deleteSubject(subjectId);
            return ApiResponse.success(res, { message: "Subject deleted successfully" });
        }
        catch (err) {
            next(err);
        }
    }
}

export default new SubjectController();