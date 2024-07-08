import express from "express";
import * as authController from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router()

router.post('/login',authController.login)
router.get('/logout',authController.logout)

router.get('/verify-session',authMiddleware,authController.verifySession)
router.patch('/forgotpassword',authController.forgotPassword)
router.patch('/resetpassword/:token',authController.resetPassword)
router.patch('/verification/:token',authController.validateEmailAddress)

export default router