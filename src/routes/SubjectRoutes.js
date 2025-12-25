import express from "express";
import SubjectController from "../controller/SubjectController.js";
import verifyRole from "../middleware/verifyRoles.js";
import ROLE from "../config/role.js";
const router = express.Router();

router.route("/").post(verifyRole(ROLE.CBHV, ROLE.BGH), SubjectController.createSubject);
router.route("/").get(verifyRole(ROLE.GVCN, ROLE.GVBM, ROLE.CBHV, ROLE.BGH), SubjectController.getAllSubjects);
router.route("/:id").delete(verifyRole(ROLE.CBHV, ROLE.BGH), SubjectController.deleteSubject);

export default router;