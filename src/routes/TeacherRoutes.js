import TeacherController from "../controller/TeacherController.js";
import express from "express";
import verifyRole from "../middleware/verifyRoles.js";
import ROLE from "../config/role.js";
const router = express.Router();

router.route("/assignments")
    .get(verifyRole(ROLE.GVCN, ROLE.GVBM, ROLE.CBHV, ROLE.BGH), TeacherController.getTeachingAssignments);
router.route("/")
    .post(verifyRole(ROLE.BGH, ROLE.CBHV), TeacherController.createTeacher)
    .get(verifyRole(ROLE.GVCN, ROLE.GVBM, ROLE.CBHV, ROLE.BGH), TeacherController.getAllTeachers);
router.route("/:id")
    .get(verifyRole(ROLE.GVCN, ROLE.GVBM, ROLE.CBHV, ROLE.BGH), TeacherController.getTeacherById);
export default router;
