import StudentService from "../service/StudentService.js";
import ApiResponse from "../utils/ApiResponse.js";
import UserService from "../service/UserService.js";
import EFormService from "../service/EFormService.js";
import CTFormService from "../service/CTFormService.js";
import SubjectGradeService from "../service/SubjectGradeService.js";

class StudentController {
    async registerStudent(req, res, next) {
        try {
            const studentData = req.body;
            const newStudent = await StudentService.registerStudent(studentData);

            const dob = new Date(newStudent.dob);
            const password =
                String(dob.getDate()).padStart(2, '0')+
                String(dob.getMonth() + 1).padStart(2, '0') +
                dob.getFullYear().toString();
            console.log(password);
           
            const newUser = await UserService.register(studentData.studentId, password, newStudent._id);

            await EFormService.createEForm({
                studentId: studentData.studentId,
                enrollmentDate: new Date(),
                status: 0
            });
            
            return ApiResponse.success(res, {
                username: studentData.studentId,
                fullname: newStudent.fullname,
                token: newUser.accessToken
            });
        }
        catch(err) {
            next(err);
        }
    }

    async getAllStudents(req, res, next) {
        try {
            const students = await StudentService.getAllStudents();
            return ApiResponse.success(res, students);
        }
        catch(err) {
            next(err);
        }
    }

    async getStudentById(req, res, next) {
        try {
            const studentId = req.params.id;
            const student = await StudentService.getStudentById(studentId);
            return ApiResponse.success(res, student);
        }
        catch(err) {
            next(err);
        }
    }

    async updateStudent(req, res, next) {
        try {
            const studentId = req.params.id;
            const updateData = req.body;
            const updatedStudent = await StudentService.updateStudent(studentId, updateData);
            return ApiResponse.success(res, updatedStudent);
        }
        catch(err) {
            next(err);
        }
    }

    async deleteStudent(req, res, next) {
        try {
            const studentId = req.params.id;
            await StudentService.deleteStudent(studentId);
            return ApiResponse.success(res, { message: "Student deleted successfully" });
        }
        catch(err) {
            next(err);
        }
    }

    async getStudentWaitingList(req, res, next) {
        try {
            const waitingEForms = await EFormService.getEFormWithStatus(0);
            return ApiResponse.success(res, waitingEForms);
        }
        catch(err) {
            next(err);
        }
    }

    async changeClassForStudent(req, res, next) {
        try {
            const studentId = req.params.id;
            const { newClassId, reason } = req.body;
            const student = await StudentService.getStudentById(studentId);
            if (!student) {
                return ApiResponse.error(res, "Student not found", 404);
            }
            const eForm = await EFormService.getEFormByStudentId(student.studentId);
            if (!eForm) {
                return ApiResponse.error(res, "EForm not found for the student", 404);
            }
            const ctForm = await CTFormService.createCTForm({
                studentId: studentId,
                newClassId: newClassId,
                oldClassId: eForm.classId,
                reason: reason
            });

            await EFormService.updateEFormStatus(student.studentId, newClassId, 1);
            return ApiResponse.success(res, ctForm);
        }
        catch(err) {
            next(err);
        }
    }

    async getSubjectGrades(req, res, next) {
        try {
            const userId = req.user.id;
            const user = await UserService.getUserById(userId);
            const studentId = user.userId;
            const grades = await SubjectGradeService.getGradesByStudentId(studentId);
            return ApiResponse.success(res, grades);
        }
        catch(err) {
            next(err);
        }
    }

    async getMyInfo(req, res, next){
        try {
            const userId = req.user.id;
            const user = await UserService.getUserById(userId);
            const studentId = user.userId;
            const student = await StudentService.getStudentById(studentId);
            const _class = await EFormService.getEFormByStudentId(student.studentId);
            return ApiResponse.success(res, 
            {
                student,
                _class 
            });
        }
        catch(err)
        {
            next(err)
        }
    }

    async getStudentsByClass(req, res, next) {
        try {
            const classId = req.params.classId;
            const students = await StudentService.getStudentsByClass(classId);
            return ApiResponse.success(res, students);
        }
        catch(err) {
            next(err);
        }
    }
}

export default new StudentController();