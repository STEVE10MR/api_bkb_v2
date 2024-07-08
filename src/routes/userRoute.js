import express from "express";
import * as userController from '../controllers/userController.js';
import authRole from '../middleware/authRole.js';
import authMiddleware from '../middleware/authMiddleware.js';


const router = express.Router()

router.use(authMiddleware)


router.route('/obtenerUsuarios')
.get(userController.listarUsuarios)

router.post('/registrarUsuario',userController.registrarUsuario)
router.route('/miembroCambio/obtenerUsuarios')
.get(userController.listarUsuarios)

router.get('/listar-comite-proyecto',userController.listarMiembroCambio)
router.get('/listar-equipo-proyecto',userController.listarEquipoProyecto)
router.get('/listar-proyecto-rol-proyecto/:rolEquipo_id',userController.listarProyectoPorRolEquipo)

router.route('/informacion')
.get(userController.obtenerInformacion,userController.obtenerUsuario)

router.patch('/actualizarPassword',userController.obtenerInformacion,userController.editarPasswordUsuario)
router.patch('/actualizarName',userController.obtenerInformacion,userController.editarNameUsuario)


router.route('/:id')
.patch(userController.editarUsuario)
.get(userController.obtenerUsuario)

router.patch('/:id/activar',userController.activarUsuario)
router.patch('/:id/desactivar',userController.desactivarUsuario)

export default router