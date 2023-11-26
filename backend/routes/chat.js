import express from 'express';
import { getSession, updateSessionChats } from '../controllers/chats.js';
import { startSession, updateSession, fetchSessions, deleteSession } from '../controllers/sessions.js';

const router = express.Router();

import { protect } from '../middleware/auth.js';

router.route('/').post(protect, startSession).get(protect, fetchSessions);

router.patch('/:sessionId/chat', protect, updateSessionChats);

router.route('/:id').get(protect, getSession).patch(protect, updateSession).delete(deleteSession);

export default router;
