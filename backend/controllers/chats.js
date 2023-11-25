import ErrorResponse from '../utils/errorResponse.js';
import Chat from '../mongodb/models/chat.js';
import Session from '../mongodb/models/session.js';
import asyncHandler from '../middleware/async.js';
import { Server } from 'socket.io';
import generateAIResponse from '../utils/generateAIResponse.js';

// Get chats in a session
export const getSessionChats = asyncHandler(async (req, res, next) => {
	const session = await Session.findById(req.params.id).populate('chats');

	if (!session) {
		return next(new ErrorResponse(`Session not found with id of ${req.params.id}`, 404));
	}

	res.status(200).json({ success: true, data: session.chats });
});

//Add chats to session
export const updateSessionChats = asyncHandler(async (req, res, next) => {
	req.body.user = req.user.id;
	req.body.session = req.params.sessionId;
	const session = await Session.findById(req.params.sessionId);

	if (!session) {
		return next(new ErrorResponse(`Session not found with id of ${id}`, 404));
	}

	const { content, role, user } = req.body;

	const newChat = new Chat(req.body);

	// Save the new chat
	await newChat.save();

	// Update the session with the new chat
	session.chats.push(newChat);

	// Save the updated session
	await session.save();

	// Generate AI response
	const aiChats = [{ content, role }];
	const aiResponse = await generateAIResponse(aiChats);

	// Create a new chat for the AI response and add it to the session
	const aiChat = new Chat({
		content: aiResponse,
		role: 'assistant',
		user,
		session: req.body.session,
	});

	// Save the AI chat
	await aiChat.save();

	// Update the session with the AI chat
	session.chats.push(aiChat);

	// Save the updated session
	await session.save();

	// Send a success response
	res.status(200).json({ success: true, data: session });
});
