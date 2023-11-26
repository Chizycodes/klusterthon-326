import express from 'express';
import { getSessionChats, updateSessionChats } from '../controllers/chats.js';
import { startSession, updateSession, fetchSessions } from '../controllers/sessions.js';

const router = express.Router();

import { protect } from '../middleware/auth.js';

router.route('/').post(protect, startSession).get(protect, fetchSessions);

router.patch('/:sessionId/chat', protect, updateSessionChats);

router.route('/:id').get(protect, getSessionChats).patch(protect, updateSession);

export default router;
