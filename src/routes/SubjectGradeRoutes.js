import express from 'express';
import SubjectGradeController from '../controller/SubjectGradeController.js';
import verifyRole from '../middleware/verifyRoles.js';
import ROLE from '../config/role.js';

const router = express.Router();

router.route('/')
    .post(verifyRole(ROLE.GVBM, ROLE.GVCN, ROLE.CBHV, ROLE.BGH), SubjectGradeController.addSubjectGrade)
    .get(verifyRole(ROLE.GVBM, ROLE.GVCN), SubjectGradeController.getGradesSaved);

router.route('/:id')
    .put(verifyRole(ROLE.GVBM, ROLE.CBHV, ROLE.BGH, ROLE.GVCN), SubjectGradeController.updateSubjectGrade)
    .delete(verifyRole(ROLE.BGH), SubjectGradeController.deleteSubjectGrade);

router.route('/student/:studentId')
    .get(verifyRole(ROLE.GVCN, ROLE.GVBM, ROLE.CBHV, ROLE.BGH), SubjectGradeController.getGradesByStudentId);

export default router;