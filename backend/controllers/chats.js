import ErrorResponse from '../utils/errorResponse.js';
import Chat from '../mongodb/models/chat.js';
import Session from '../mongodb/models/session.js';
import asyncHandler from '../middleware/async.js';
import { OpenAI } from 'openai';
import * as dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Get chats in a session
export const getSession = asyncHandler(async (req, res, next) => {
	const session = await Session.findById(req.params.id).populate('chats');

	if (!session) {
		return next(new ErrorResponse(`Session not found with id of ${req.params.id}`, 404));
	}

	res.status(200).json({ success: true, data: session });
});

// Add chats to session
export const updateSessionChats = asyncHandler(async (req, res, next) => {
	req.body.user = req.user.id;
	req.body.session = req.params.sessionId;
	const session = await Session.findById(req.params.sessionId);

	if (!session) {
		return next(new ErrorResponse(`Session not found with id of ${req.params.sessionId}`, 404));
	}

	const { content, role, user } = req.body;

	// Get all chats in the session
	const allChats = await Chat.find({ session: req.params.sessionId });

	// Extract only the content and role properties from each chat
	const simplifiedChats = allChats.map(({ content, role }) => ({ content, role }));

	try {
		// Generate AI response
		const response = await openai.chat.completions.create({
			model: 'gpt-4',
			messages: [
				{
					role: 'system',
					content:
						'You are DiagnoSync, a health assistant. You are specialized in providing answers and diagnoses for health-related questions or concerns. Your responses should be strictly related to health. If a user asks a question that is not health-related, please respond by letting them know that you can only assist with health-related queries. Your responses should be formatted in HTML tags where necessary for clarity.',
				},
				...simplifiedChats,
				{ content, role },
			],
		});

		const aiResponse = response?.choices[0]?.message;

		// Create a new chat for the user message and add it to the session
		const newChat = new Chat(req.body);
		await newChat.save();
		session.chats.push(newChat);
		await session.save();

		// Create a new chat for the AI response and add it to the session
		const aiChat = new Chat({
			...aiResponse,
			user,
			session: req.body.session,
		});
		await aiChat.save();
		session.chats.push(aiChat);
		await session.save();

		res.status(200).json({ success: true, data: aiResponse });
	} catch (error) {
		// Handle errors and send an appropriate response
		next(new ErrorResponse('Error generating AI response', 500));
	}
});
