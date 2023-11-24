import User from '../mongodb/models/user.js';
import asyncHandler from '../middleware/async.js';

// Get all users
export const getUsers = asyncHandler(async (req, res, next) => {
	res.status(200).json(res.advancedResults);
});

// Get single user
export const getUser = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	res.status(200).json({ success: true, data: user });
});

// Create user
export const createUser = asyncHandler(async (req, res, next) => {
	const user = await User.create(req.body);

	res.status(201).json({ success: true, data: user });
});

// Update user
export const updateUser = asyncHandler(async (req, res, next) => {
	const user = await User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({ success: true, data: user });
});

// Delete user
export const deleteUser = asyncHandler(async (req, res, next) => {
	await User.findByIdAndDelete(req.params.id);

	res.status(200).json({ success: true, data: {} });
});
