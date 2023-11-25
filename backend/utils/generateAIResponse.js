import { OpenAI } from 'openai';
import * as dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const generateAIResponse = async (chats) => {
	return 'This is an ai test response';
	// openai.chat.completions.create({
	// 		model: 'gpt-3.5-turbo',
	// 		messages: [
	// 			{
	// 				role: 'system',
	// 				content:
	// 					'You are a DiagnoSync AI. You can help with health related issues and provide diagnosis to health symptoms',
	// 			},
	// 			...chats,
	// 		],
	// 	})
	// 	.then((res) => {
	// 		console.log(res.data.choices[0].message);
	// 	})
	// 	.catch((e) => {
	// 		console.error('Error generating AI response:', e);
	// 	});
};

export default generateAIResponse;
