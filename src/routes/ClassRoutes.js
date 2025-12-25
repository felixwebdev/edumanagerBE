import express, { Router } from "express";
import ClassController from "../controller/ClassController.js";
import verifyRole from "../middleware/verifyRoles.js";
import ROLE from "../config/role.js";

const router = express.Router();

router.route("/addStudent/:id").put(verifyRole(ROLE.GVCN, ROLE.GVBM, ROLE.CBHV, ROLE.BGH), ClassController.addStudentToClass);
router.route("/removeStudent/:id").put(verifyRole(ROLE.GVCN, ROLE.GVBM, ROLE.CBHV, ROLE.BGH), ClassController.deleteStudentFromClass);
router.route("/students/:id").get(verifyRole(ROLE.GVCN, ROLE.GVBM, ROLE.CBHV, ROLE.BGH), ClassController.getStudentsByClassId);
router.route("/class-teacher").get(verifyRole(ROLE.GVCN), ClassController.getClassWithTeacher);

router.route("/")
    .post(verifyRole(ROLE.CBHV, ROLE.BGH), ClassController.createClass)

router.route("/:id")
    .get(verifyRole(ROLE.GVCN, ROLE.GVBM, ROLE.CBHV, ROLE.BGH), ClassController.getClassById)
    .put(verifyRole(ROLE.CBHV, ROLE.BGH), ClassController.updateClass)
    .delete(verifyRole(ROLE.BGH), ClassController.deleteClass);
    
export default router;