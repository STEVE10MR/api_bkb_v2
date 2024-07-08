import express from "express";
import * as studentController from '../controllers/studentController.js';
import authRole from '../middleware/authRole.js';
import authMiddleware from '../middleware/authMiddleware.js';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

const router = express.Router()

router.use(authMiddleware)


router.route('/')
.get(studentController.listarUsuarios)
.post(upload.single('imagen'),studentController.crearUsuario)

router.route('/:id')
.patch(studentController.editarUsuario)

router.route('/:id/activar')
.patch(studentController.activarUsuario)

router.route('/:id/desactivar')
.patch(studentController.desactivarUsuario)


export default router