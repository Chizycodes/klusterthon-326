import ErrorResponse from '../utils/errorResponse.js';
import Session from '../mongodb/models/session.js';
import asyncHandler from '../middleware/async.js';

// Get sessions
export const getSessions = asyncHandler(async (req, res, next) => {
	const sessions = await Session.find({ user: req.user.id });

	res.status(200).json({ success: true, data: sessions });
});

// Create new chat session
export const startSession = asyncHandler(async (req, res, next) => {
	req.body.user = req.user.id;

	const session = await Session.create(req.body);

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
