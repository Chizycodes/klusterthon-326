import express from 'express';
import { getSessionChats, updateSessionChats } from '../controllers/chats.js';
import { startSession, updateSession } from '../controllers/sessions.js';

const router = express.Router();

import { protect } from '../middleware/auth.js';

router.post('/', protect, startSession);
router.patch('/:sessionId/chat', protect, updateSessionChats);
router.route('/:id').get(protect, getSessionChats).patch(protect, updateSession);

export default router;
