import React, { useState, useRef, useEffect } from 'react';
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
	const [messages, setMessages] = useState([
		{ role: 'assistant', content: initialMessage },
	]);
	const [loading, setLoading] = useState(false);
	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
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

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
			{/* Background Effects */}
			<div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 animate-pulse"></div>

			{/* Floating Particles */}
			<div className="absolute inset-0 overflow-hidden">
				{[...Array(15)].map((_, i) => (
					<div
						key={i}
						className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-60"
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
							animationDelay: `${Math.random() * 3}s`,
							animationDuration: `${2 + Math.random() * 2}s`,
						}}
					/>
				))}
			</div>

			{/* Header */}
			<div className="relative z-10 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50">
				<div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
					<button
						onClick={() => window.history.back()}
						className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
					>
						<ArrowLeft className="w-5 h-5" />
						<span>Back</span>
					</button>

					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
							<img className="w-full h-full" src={src} alt="profile pic" />
						</div>
						<div>
							<h1 className="text-xl font-bold text-white">{name} Sir</h1>
							<p className="text-sm text-purple-400">{title}</p>
						</div>
					</div>

					<div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
						<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
						<span className="text-green-400 text-sm">Online</span>
					</div>
				</div>
			</div>

			{/* Chat Container */}
			<div className="relative z-10 max-w-4xl mx-auto px-6 py-6 flex flex-col h-[calc(100vh-140px)]">
				{/* Messages Area */}
				<div className="flex-1 overflow-y-auto space-y-6 mb-6 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-slate-800">
					{messages.map((msg, i) => (
						<div
							key={i}
							className={`flex gap-4 ${
								msg.role === 'user' ? 'justify-end' : 'justify-start'
							}`}
						>
							{msg.role === 'assistant' && (
								<div className="w-10 h-10 bg-gradient-to-r rounded-full from-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0">
									<img
										className="w-full h-full rounded-full"
										src={src}
										alt="profile pic"
									/>
								</div>
							)}

							<div
								className={`max-w-[70%] p-4 rounded-2xl ${
									msg.role === 'user'
										? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white ml-auto'
										: 'bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 text-slate-100'
								}`}
							>
								<p className="whitespace-pre-wrap leading-relaxed">
									{msg.content}
								</p>
							</div>

							{msg.role === 'user' && (
								<div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
									<User className="w-5 h-5 text-white rounded-full" />
								</div>
							)}
						</div>
					))}

					{loading && (
						<div className="flex gap-4 justify-start">
							<div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
								<Brain className="w-5 h-5 text-white" />
							</div>
							<div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 max-w-[70%]">
								<div className="flex items-center gap-2">
									<div className="flex gap-1">
										<div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
										<div
											className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
											style={{ animationDelay: '0.1s' }}
										></div>
										<div
											className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
											style={{ animationDelay: '0.2s' }}
										></div>
									</div>
									<span className="text-slate-400 text-sm">
										{name} is thinking...
									</span>
								</div>
							</div>
						</div>
					)}
					<div ref={messagesEndRef} />
				</div>

				{/* Input Area */}
				<div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4">
					<div className="flex items-end gap-4">
						<div className="flex-1">
							<textarea
								value={input}
								onChange={(e) => setInput(e.target.value)}
								onKeyDown={handleKeyPress}
								placeholder="Ask me about programming, web development, career advice, or anything tech-related..."
								className="w-full bg-transparent text-white placeholder-slate-400 resize-none outline-none max-h-32 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-slate-800"
								rows="1"
								style={{ minHeight: '24px' }}
								onInput={(e) => {
									e.target.style.height = 'auto';
									e.target.style.height = e.target.scrollHeight + 'px';
								}}
							/>
						</div>

						<button
							onClick={sendMessage}
							disabled={!input.trim() || loading}
							className="group bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 disabled:from-slate-600 disabled:to-slate-600 text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center"
						>
							<Send className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
						</button>
					</div>

					{/* Quick Actions */}
					<div className="flex flex-wrap gap-2 mt-4">
						{[
							{
								icon: Code,
								text: 'Code Review',
								prompt: 'Can you help me with a code review?',
							},
							{
								icon: Brain,
								text: 'Career Advice',
								prompt: "I'd like some career guidance in tech",
							},
							{
								icon: Sparkles,
								text: 'Best Practices',
								prompt: 'What are the best practices for web development?',
							},
							{
								icon: MessageCircle,
								text: 'Tech Trends',
								prompt: 'What are the latest trends in technology?',
							},
						].map((action, i) => (
							<button
								key={i}
								onClick={() => setInput(action.prompt)}
								className="flex items-center gap-2 px-3 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white rounded-lg text-sm transition-all duration-200 border border-slate-600/30 hover:border-purple-500/50"
							>
								<action.icon className="w-4 h-4" />
								<span>{action.text}</span>
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default MentorPersona;