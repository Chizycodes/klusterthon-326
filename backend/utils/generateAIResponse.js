import { OpenAI } from 'openai';
import * as dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const generateAIResponse = async (chats) => {
	openai.chat.completions
		.create({
			model: 'gpt-3.5-turbo',
			messages: [
				{
					role: 'system',
					content:
						'Your name is DiagnoSync. You are a doctor. You are a health assistant. You can provide answers and diagnoses for health-related questions.',
				},
				...chats,
			],
		})
		.then((res) => {
			return res?.choices[0]?.message;
		})
		.catch((e) => {
			return e;
		});
};

export default generateAIResponse;
