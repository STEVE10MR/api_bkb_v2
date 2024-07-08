import express from "express";
import * as courseController from '../controllers/courseController.js';
import authRole from '../middleware/authRole.js';
import authMiddleware from '../middleware/authMiddleware.js';


const router = express.Router()

router.use(authMiddleware)


router.route('/')
.get(courseController.listarCurso)
.post(courseController.crearCurso)

router.route('/:id')
.patch(courseController.editarCurso)

router.route('/:id/activar')
.patch(courseController.activarCurso)

router.route('/:id/desactivar')
.patch(courseController.desactivarCurso)


export default router