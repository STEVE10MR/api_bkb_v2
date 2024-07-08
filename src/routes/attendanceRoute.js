import express from "express";
import * as attendanceController from '../controllers/attendanceController.js';
import authRole from '../middleware/authRole.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router({ mergeParams: true })

router.use(authMiddleware)


router.route('/')
.get(attendanceController.listarAsistencia)

router.route('/:id')
.patch(attendanceController.editarAsistencia)

export default router