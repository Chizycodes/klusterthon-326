import express from 'express';
import {
	register,
	login,
	getMe,
	forgotPassword,
	resetPassword,
	updateDetails,
	updatePassword,
	logout,
} from '../controllers/auth.js';

const router = express.Router();

import { protect } from '../middleware/auth.js';

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/user', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

export default router;
