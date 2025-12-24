import express from "express";
import LeaderController from "../controller/LeaderController.js";
import verifyRole from "../middleware/verifyRoles.js";
import ROLE from "../config/role.js";
const router = express.Router();

router.route("/register/cbhv").post(LeaderController.registerCBHV);
router.route("/register/bgh").post(LeaderController.registerBGH);

export default router;