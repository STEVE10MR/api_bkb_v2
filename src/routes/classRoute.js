import express from "express";
import * as classController from '../controllers/classController.js';
import authRole from '../middleware/authRole.js';
import authMiddleware from '../middleware/authMiddleware.js';
import attendanceRoute from './attendanceRoute.js';

const router = express.Router()

router.use(authMiddleware)


router.route('/')
.get(classController.listarClase)
.post(classController.crearClase)

router.route('/:id')
.patch(classController.editarClase)


router.route('/:id/activar')
.patch(classController.activarClase)

router.route('/:id/desactivar')
.patch(classController.desactivarClase)

router.route('/:id/agregar-estudiante')
.patch(classController.crearEstudianteClase)

router.route('/:id/agregar-horario')
.patch(classController.crearHorarioClase)

router.route('/:id/agregar-horario-tiempo')
.patch(classController.crearSubHorarioClase)

router.route('/:id/quitar-estudiante')
.patch(classController.quitarEstudianteClase)

router.route('/:id/quitar-horario')
.patch(classController.quitarHorarioClase)

router.route('/:id/quitar-horario-tiempo')
.patch(classController.quitarSubHorarioClase)

router.use('/:id/asistencia',attendanceRoute)
router.use('/test',attendanceRoute)
export default router