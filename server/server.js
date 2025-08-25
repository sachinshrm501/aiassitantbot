import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { OpenAI } from 'openai';
import connectDB from './config/database.js';
import personaRoutes from './routes/personas.js';
import chatRoutes from './routes/chats.js';
import Persona from './models/Persona.js';

// Connect to MongoDB
connectDB();

const app = express();
app.use(
	cors({
		origin: [
			"http://localhost:5176", // ✅ Vite client port
			"http://localhost:5175", // ✅ Vite alternative port
			"http://localhost:3000", // ✅ React default port
			"http://localhost:3001", // ✅ React alternative port
			"https://aiassitantbot.vercel.app", // ✅ Production
			"https://aiassitantbot-xtm9.vercel.app/api/personas"
		],
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type'],
		credentials: true,
	}),
);
app.use(express.json());
const PORT = process.env.PORT || 3001;

// Routes
app.use('/api/personas', personaRoutes);
app.use('/api/chats', chatRoutes);

app.post('/chat/sachin', async (req, res) => {
	let { messages } = req.body;
	const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

	// Validate incoming messages array
	if (!Array.isArray(messages)) {
		return res.status(400).json({ error: 'messages must be an array' });
	}

	try {
		// Fetch persona data from MongoDB
		const persona = await Persona.findOne({ name: 'Sachin' });
		if (!persona) {
			return res.status(404).json({ error: 'Sachin persona not found' });
		}

		const response = await client.chat.completions.create({
			model: 'gpt-4.1-mini',
			messages: [
				{
					role: 'system',
					content: persona.systemPrompt,
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