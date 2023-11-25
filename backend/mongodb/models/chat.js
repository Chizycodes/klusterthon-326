import mongoose from 'mongoose';

const { Schema } = mongoose;

const ChatSchema = new Schema({
	content: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ['user', 'assistant'],
		required: true,
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
	session: {
		type: mongoose.Schema.ObjectId,
		ref: 'Session',
		required: true,
	},
});

const Chat = mongoose.model('Chat', ChatSchema);

export default Chat;
