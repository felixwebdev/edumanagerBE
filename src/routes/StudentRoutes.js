import express from "express";
import StudentController from "../controller/StudentController.js";
import verifyRole from "../middleware/verifyRoles.js";
import ROLE from "../config/role.js";

const router = express.Router();

router.route("/register").post(verifyRole(ROLE.CBHV, ROLE.BGH), StudentController.registerStudent);
router.route("/myInfo").get(verifyRole(ROLE.HOCSINH), StudentController.getMyInfo);
router.route("/subject-grades").get(verifyRole(ROLE.HOCSINH), StudentController.getSubjectGrades);
router.route("/waiting").get(verifyRole(ROLE.GVCN, ROLE.GVBM, ROLE.CBHV, ROLE.BGH), StudentController.getStudentWaitingList);
router.route("/changeClass/:id").post(verifyRole(ROLE.CBHV, ROLE.BGH), StudentController.changeClassForStudent);
router.route("/class/:classId").get(verifyRole(ROLE.GVCN, ROLE.GVBM, ROLE.CBHV, ROLE.BGH), StudentController.getStudentsByClass);
router.route("/").get(verifyRole(ROLE.GVCN, ROLE.GVBM, ROLE.CBHV, ROLE.BGH), StudentController.getAllStudents);
router.route("/:id")
    .get(verifyRole(ROLE.GVCN, ROLE.GVBM, ROLE.CBHV, ROLE.BGH), StudentController.getStudentById)
    .put(verifyRole(ROLE.CBHV, ROLE.BGH), StudentController.updateStudent);
router.route("/:id").delete(verifyRole(ROLE.BGH, ROLE.CBHV), StudentController.deleteStudent);


export default router;