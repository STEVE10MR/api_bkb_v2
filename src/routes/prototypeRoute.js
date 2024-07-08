import express from "express";
import * as prototypeController from '../controllers/prototypeController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

const router = express.Router()

router.post('/detect',upload.single('imagen'),prototypeController.detect)
router.post('/consultFace',upload.single('imagen'),prototypeController.consultFace)
router.post('/addFace',upload.single('imagen'),prototypeController.addFace)

export default router