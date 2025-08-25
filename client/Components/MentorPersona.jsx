import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from "react-markdown";
import Layout from './Layout.jsx';
import { useAnalytics } from '../src/hooks/useAnalytics.js';

import {
	Send,
	Brain,
	ArrowLeft,
	Sparkles,
	Code,
	MessageCircle,
	User,
} from 'lucide-react';

function MentorPersona({ name, title, initialMessage, endpoint, src }) {
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [personaData, setPersonaData] = useState(null);
	const [personaLoading, setPersonaLoading] = useState(true);
	const messagesEndRef = useRef(null);
	const { trackPageVisit } = useAnalytics();

	const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

	// Track page visit when component mounts
	useEffect(() => {
		trackPageVisit('/chat/sachin', 'Sachin Chat');
	}, [trackPageVisit]);

	// Fetch persona data from database
	useEffect(() => {
		const fetchPersonaData = async () => {
			try {
				setPersonaLoading(true);
				const response = await fetch(`${API_BASE_URL}/api/personas`);
				if (!response.ok) {
					throw new Error('Failed to fetch personas');
				}

				const personas = await response.json();
				const currentPersona = personas.find(p =>
					p.name.toLowerCase().includes(name.toLowerCase()) ||
					name.toLowerCase().includes(p.name.toLowerCase())
				);

				if (currentPersona) {
					setPersonaData(currentPersona);
					// Set initial message from database
					setMessages([
						{
							role: 'assistant',
							content: currentPersona.description || initialMessage
						}
					]);
				} else {
					// Fallback to props if not found in database
					setMessages([
						{ role: 'assistant', content: initialMessage }
					]);
				}
			} catch (error) {
				console.error('Error fetching persona data:', error);
				// Fallback to props if API fails
				setMessages([
					{ role: 'assistant', content: initialMessage }
				]);
			} finally {
				setPersonaLoading(false);
			}
		};

		fetchPersonaData();
	}, [name, initialMessage, API_BASE_URL]);

	const scrollToBottom = () => {
		// Scroll only the messages container, not the entire page
		const messagesContainer = document.querySelector('.messages-container');
		if (messagesContainer) {
			messagesContainer.scrollTop = messagesContainer.scrollHeight;
		}
	};

	// Auto-scroll only when new responses come in
	useEffect(() => {
		// Only scroll when there's a new assistant response (not user messages)
		const lastMessage = messages[messages.length - 1];
		if (lastMessage && lastMessage.role === 'assistant' && messages.length > 1) {
			scrollToBottom();
		}
	}, [messages]);

	const sendMessage = async () => {
		if (!input.trim()) return;

		const userMessage = { role: 'user', content: input };
		const updatedMessages = [...messages, userMessage];
		setMessages(updatedMessages);
		setInput('');
		setLoading(true);

		try {
			const res = await fetch(endpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ messages: updatedMessages }),
			});
			const data = await res.json();
			if (data.reply) {
				setMessages((prev) => [
					...prev,
					{ role: 'assistant', content: data.reply },
				]);
			}
		} catch (error) {
			console.error('Error:', error);
			setMessages((prev) => [
				...prev,
				{
					role: 'assistant',
					content: 'Sorry, I encountered an error. Please try again.',
				},
			]);
		}
		setLoading(false);
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	};

	// Show loading state while fetching persona data
	if (personaLoading) {
		return (
			<Layout>
				<div className="min-h-screen flex items-center justify-center">
					<div className="text-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
						<p className="text-purple-400">Loading {name}...</p>
					</div>
				</div>
			</Layout>
		);
	}

	return (
		<Layout>
			{/* Chat Header */}
			{/* <div className="bg-slate-900/90 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-10">
				<div className="w-full px-6 py-4 flex items-center justify-between">
					<button
						onClick={() => window.history.back()}
						className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-slate-800/50"
					>
						<ArrowLeft className="w-5 h-5" />
						<span className="font-medium">Back to Home</span>
					</button>

					<div className="flex items-center gap-4">
						<div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center p-1 shadow-lg">
							<img
								className="w-full h-full rounded-xl object-cover"
								src={src}
								alt="profile pic"
							/>
						</div>
						<div>
							<h1 className="text-2xl font-bold text-white">
								{personaData ? personaData.name : name}
							</h1>
							<p className="text-cyan-400 font-medium">
								{personaData ? personaData.personality : title}
							</p>
						</div>
					</div>

					<div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full">
						<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
						<span className="text-green-400 text-sm font-medium">Available Now</span>
					</div>
				</div>
			</div> */}

			

			{/* Chat Container Box */}
			<div className="w-full px-4 py-4 flex justify-center">
				<div className="w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-lg overflow-hidden">
					{/* Chat Header */}
					<div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
								<img
									className="w-8 h-8 rounded-full object-cover"
									src={src}
									alt="profile pic"
								/>
							</div>
							<div>
								<h3 className="text-white font-semibold text-lg">
									{personaData ? personaData.name : name}
								</h3>
								<p className="text-white/80 text-sm">
									{personaData ? personaData.personality : title}
								</p>
							</div>
							<div className="ml-auto flex items-center gap-2">
								<div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
								<span className="text-white/80 text-sm">Online</span>
							</div>
						</div>
					</div>

					{/* Chat Container */}
					<div className="w-full flex flex-col h-[calc(100vh-280px)]">
						{/* Messages Area */}
						<div className="messages-container flex-1 overflow-y-auto space-y-4 p-4 bg-slate-50 dark:bg-slate-800">
							{messages.map((msg, i) => (
								<div
									key={i}
									className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'
										}`}
								>
									{msg.role === 'assistant' && (
										<div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
											<img
												className="w-6 h-6 rounded-full object-cover"
												src={src}
												alt="profile pic"
											/>
										</div>
									)}

									<div
										className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user'
											? 'bg-blue-500 text-white shadow-sm'
											: 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 shadow-sm'
											}`}
									>
										<div className="text-sm leading-relaxed">
											<ReactMarkdown>{msg.content}</ReactMarkdown>
										</div>
									</div>

									{msg.role === 'user' && (
										<div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
											<User className="w-4 h-4 text-white" />
										</div>
									)}
								</div>
							))}

							{loading && (
								<div className="flex gap-3 justify-start">
									<div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
										<Brain className="w-4 h-4 text-white" />
									</div>
									<div className="max-w-[80%] bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl p-3 shadow-sm">
										<div className="flex items-center gap-2">
											<div className="flex gap-1">
												<div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
												<div
													className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
													style={{ animationDelay: '0.1s' }}
												></div>
												<div
													className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
													style={{ animationDelay: '0.2s' }}
												></div>
											</div>
											<span className="text-slate-600 dark:text-slate-300 text-sm">
												{personaData ? personaData.name : name} is typing...
											</span>
										</div>
									</div>
								</div>
							)}
							<div ref={messagesEndRef} />
						</div>

						{/* Input Area */}
						<div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 p-4">
							<div className="flex items-end gap-3">
								<div className="flex-1">
									<textarea
										value={input}
										onChange={(e) => setInput(e.target.value)}
										onKeyDown={handleKeyPress}
										placeholder="Type a message..."
										className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl p-3 text-slate-800 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-400 resize-none outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 text-sm leading-relaxed"
										rows="1"
										style={{ minHeight: '20px' }}
										onInput={(e) => {
											e.target.style.height = 'auto';
											e.target.style.height = e.target.scrollHeight + 'px';
										}}
									/>
								</div>
								<button
									onClick={sendMessage}
									disabled={loading || !input.trim()}
									className="bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed shadow-sm"
								>
									<Send className="w-4 h-4" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default MentorPersona;