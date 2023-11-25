import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import auth from './routes/auth.js';
import chat from './routes/chat.js';
import errorHandler from './middleware/error.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', auth);
app.use('/api/session', chat);

app.use(errorHandler);

const startServer = async () => {
	try {
		connectDB(process.env.MONGODB_URL);

		app.listen(5000, () => console.log('Server started on port http://localhost:5000'));
	} catch (error) {
		console.log(error, 'error');
	}
};

startServer();
