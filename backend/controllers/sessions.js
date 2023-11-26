import ErrorResponse from '../utils/errorResponse.js';
import Session from '../mongodb/models/session.js';
import asyncHandler from '../middleware/async.js';
import Chat from '../mongodb/models/chat.js';

// Get sessions
export const fetchSessions = asyncHandler(async (req, res, next) => {
	const sessions = await Session.find({ user: req.user.id }).populate('chats');

	res.status(200).json({ success: true, data: sessions });
});

// Create new chat session
export const startSession = asyncHandler(async (req, res, next) => {
	req.body.user = req.user.id;

	// Get the number of existing sessions for the current user
	const existingSessionsCount = await Session.countDocuments({ user: req.user.id });

	// Set the title to the number of existing sessions plus 1
	const session = await Session.create({
		...req.body,
		title: `Chat Session ${existingSessionsCount + 1}`,
	});

	res.status(201).json({
		success: true,
		data: session,
	});
});

// Create new chat session
export const updateSession = asyncHandler(async (req, res, next) => {
	let session = await Session.findById(req.params.id);

	if (!session) {
		return next(new ErrorResponse(`Session not found with id of ${req.params.id}`, 404));
	}

	session = await Session.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		success: true,
		data: session,
	});
});

// Delete a user's session with all the chats
export const deleteSession = asyncHandler(async (req, res, next) => {
	const session = await Session.findById(req.params.id);

	if (!session) {
		return next(new ErrorResponse(`Session not found with id of ${req.params.id}`, 404));
	}

	const chatIds = session.chats.map((chat) => chat.toString());

	// Delete associated chats
	await Chat.deleteMany({ _id: { $in: chatIds } });

	// Delete the session
	await Session.findByIdAndDelete(req.params.id);

	res.status(200).json({
		success: true,
		data: {},
	});
});
