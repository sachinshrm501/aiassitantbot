import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { OpenAI } from 'openai';
import { sandipSirPersona } from './persona/sandipSirPersona.js';
import { sachinSirPersona } from './persona/sachinSirPersona.js';

const app = express();
app.use(
	cors({
		origin: [
			"http://localhost:5183", // ✅ React local (alternative port)
			"http://localhost:3000", // ✅ React local (alternative port)
			"https://ai-persona-chat-bot.vercel.app" // ✅ Production
		],
		methods: ['GET', 'POST'],
		allowedHeaders: ['Content-Type'],
	}),
);
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.post('/chat/sandip', async (req, res) => {
	let { messages } = req.body;
	const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

	// Validate incoming messages array
	if (!Array.isArray(messages)) {
		return res.status(400).json({ error: 'messages must be an array' });
	}

	try {
		const response = await client.chat.completions.create({
			model: 'gpt-4.1-mini',
			messages: [
				{
					role: 'system',
					content: sandipSirPersona,
				},
				...messages, // Full conversation history
			],
		});

		res.json({ reply: response.choices[0].message.content });
	} catch (error) {
		console.error('Error in /chat/sandip:', error);
		res.status(500).json({ error: 'Something went wrong' });
	}
});
app.post('/chat/sachin', async (req, res) => {
	let { messages } = req.body;
	const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

	// Validate incoming messages array
	if (!Array.isArray(messages)) {
		return res.status(400).json({ error: 'messages must be an array' });
	}

	try {
		const response = await client.chat.completions.create({
			model: 'gpt-4.1-mini',
			messages: [
				{
					role: 'system',
					content: sachinSirPersona,
				},
				...messages, // Full conversation history
			],
		});

		res.json({ reply: response.choices[0].message.content });
	} catch (error) {
		console.error('Error in /chat/sachin:', error);
		res.status(500).json({ error: 'Something went wrong' });
	}
});

app.listen(PORT, () => {
	console.log(`✅ Server running on http://localhost:${PORT}`);
});