import mongoose from 'mongoose';

const { Schema } = mongoose;

const SessionSchema = new Schema({
	title: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true,
	},
	chats: [
		{
			type: mongoose.Schema.ObjectId,
			ref: 'Chat',
		},
	],
});

const Session = mongoose.model('Session', SessionSchema);

export default Session;
