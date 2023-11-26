import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import auth from './routes/auth.js';
import chat from './routes/chat.js';
import errorHandler from './middleware/error.js';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
});

app.use(express.json());
app.use(cors());


app.use(express.json());
app.use(cors());

app.use('/api/auth', auth);
app.use('/api/session', chat);

app.use(errorHandler);

// Socket.io connection handling
io.on('connection', (socket) => {
	console.log('User connected:', socket.id);

	// Handle disconnection
	socket.on('disconnect', () => {
		console.log('User disconnected:', socket.id);
	});
});



const startServer = async () => {
	try {
		connectDB(process.env.MONGODB_URL);

		app.listen(5000, () => console.log('Server started on port http://localhost:5000'));
	} catch (error) {
		console.log(error, 'error');
	}
};

startServer();
