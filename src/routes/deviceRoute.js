import express from "express";
import * as deviceController from '../controllers/deviceController.js';
import authRole from '../middleware/authRole.js';
import authMiddleware from '../middleware/authMiddleware.js';
import * as attendanceController from '../controllers/attendanceController.js';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });


const router = express.Router()


router.route('/')
.get(authMiddleware,deviceController.listarDispositivo)
.post(authMiddleware,deviceController.crearDispositivo)

router.route('/:id')
.patch(authMiddleware,deviceController.editarDispositivo)

router.route('/:id/activar')
.patch(authMiddleware,deviceController.activarDispositivo)

router.route('/:id/desactivar')
.patch(authMiddleware,deviceController.desactivarDispositivo)

router.route('/crear-asistencia')
.post(upload.single('imageFile'),attendanceController.crearAsistencia)


export default router

