import express from "express";
import TAController from "../controller/TAController.js";
import ROLE from "../config/role.js";
import VerifyRole from "../middleware/VerifyRoles.js";

const router = express.Router();

router.post("/", VerifyRole(ROLE.BGH), TAController.createTeachingAssignment);
router.get("/", VerifyRole(ROLE.GVCN, ROLE.GVBM, ROLE.BGH), TAController.getAllTeachingAssignments);
router.get("/:id", VerifyRole(ROLE.BGH, ROLE.GVCN, ROLE.GVBM), TAController.getTeachingAssignmentById);
router.put("/:id", VerifyRole(ROLE.BGH), TAController.updateTeachingAssignment);   
router.delete("/:id", VerifyRole(ROLE.BGH), TAController.deleteTeachingAssignment);

export default router;