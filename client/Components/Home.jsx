import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout.jsx';
import { MessageCircle, Sparkles, Users, ArrowRight, Star, Zap, Heart, Database, RefreshCw, Brain, Code } from 'lucide-react';

const Home = () => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isVisible, setIsVisible] = useState(false);
	const [personas, setPersonas] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
	const APP_NAME = import.meta.env.VITE_APP_NAME || 'SachinAI';

	useEffect(() => {
		const handleMouseMove = (e) => {
			setMousePosition({
				x: (e.clientX / window.innerWidth) * 100,
				y: (e.clientY / window.innerHeight) * 100,
			});
		};
		setTimeout(() => setIsVisible(true), 100);
		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, []);

	// Fetch personas from MongoDB
	useEffect(() => {
		fetchPersonas();
	}, []);

	const fetchPersonas = async () => {
		try {
			setLoading(true);
			setError(null);

			const response = await fetch(`${API_BASE_URL}/api/personas`);
			if (!response.ok) {
				throw new Error('Failed to fetch personas');
			}

			const data = await response.json();
			setPersonas(data);
		} catch (err) {
			console.error('Error fetching personas:', err);
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const handleNavigation = (path) => {
		navigate(path);
	};

	const handleRefresh = () => {
		fetchPersonas();
	};

	return (
		<Layout personas={personas} loading={loading} error={error} onRefresh={handleRefresh} onNavigate={handleNavigation}>
			{/* Hero Section */}
			<div className="text-center mb-16 pt-8">
				<h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent mb-6 animate-fade-in">
					Your AI Mentor. Your Growth Partner.
				</h2>
				<p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay">
					SachinAI is an AI-first innovation company building intelligent mentorship bots, agentic AI systems, and knowledge-driven LLM platforms. 
					We empower individuals and businesses with personalized AI mentors, collaborative AI notebooks, and autonomous AI agents.
				</p>
			</div>

			{/* Company Vision & Mission */}
			<div className="mb-16">
				<div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/40 rounded-3xl p-8 shadow-xl">
					{/* Header with Vision and Mission */}
					<div className="flex flex-col lg:flex-row items-start gap-2">
						{/* Vision Section */}
						<div className="flex-1">
							<div className="bg-slate-700/30 border border-slate-600/30 rounded-2xl p-6">
								<div className="flex items-center gap-3 mb-4">
									<div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
										<Sparkles className="w-5 h-5 text-white" />
									</div>
									<h3 className="text-2xl font-bold text-white">🚀 Our Vision</h3>
								</div>
								<p className="text-slate-200 leading-relaxed text-lg">
									To make AI mentorship and knowledge augmentation accessible for everyone — from students to enterprises — enabling humans and AI to co-create, learn, and grow together.
								</p>
							</div>
						</div>

						{/* Mission Section */}
						<div className="flex-1">
							<div className="bg-slate-700/30 border border-slate-600/30 rounded-2xl p-6">
								<div className="flex items-center gap-3 mb-4">
									<div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
										<Zap className="w-5 h-5 text-white" />
									</div>
									<h3 className="text-2xl font-bold text-white">🎯 Our Mission</h3>
								</div>
								<p className="text-slate-200 leading-relaxed text-lg">
									We are on a mission to build trustworthy, explainable, and agentic AI systems that guide, teach, and solve real-world problems through Generative AI, RAG (Retrieval-Augmented Generation), and LLM-powered agents.
								</p>
							</div>
						</div>
					</div>
					
					{/* CTA Button */}
					<div className="text-center mt-8">
						<button 
							onClick={() => handleNavigation('/chat/sachin')}
							className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center gap-3 mx-auto text-lg"
						>
							<MessageCircle className="w-6 h-6" />
							Start Your AI Journey
						</button>
					</div>
				</div>
			</div>

			{/* What We Offer Section */}
			<div className="mb-16">
				<div className="text-center mb-12">
					<h3 className="text-3xl font-bold text-white mb-4">💡 What We Offer</h3>
					<p className="text-slate-400 text-lg">Comprehensive AI solutions for learning, productivity, and intelligence</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 shadow-2xl shadow-pink-500/20">
						<div className="text-center mb-6">
							<div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
								<Brain className="w-8 h-8 text-white" />
							</div>
							<h4 className="text-xl font-bold text-white mb-2">🤖 AI Mentorship Bots</h4>
						</div>
						<ul className="space-y-3 text-slate-300">
							<li className="flex items-start gap-2">
								<span className="text-green-400">✓</span>
								<span>Personal AI tutors & mentors for career, learning, and skill growth</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-green-400">✓</span>
								<span>Always available, adaptive, and personalized guidance</span>
							</li>
						</ul>
					</div>
					
					<div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 shadow-2xl shadow-blue-500/20">
						<div className="text-center mb-6">
							<div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
								<Code className="w-8 h-8 text-white" />
							</div>
							<h4 className="text-xl font-bold text-white mb-2">📓 AI Notebook & Knowledge Systems</h4>
						</div>
						<ul className="space-y-3 text-slate-300">
							<li className="flex items-start gap-2">
								<span className="text-green-400">✓</span>
								<span>A Generative AI Notebook to brainstorm, document, and co-create with AI</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-green-400">✓</span>
								<span>RAG-powered LLMs to retrieve knowledge, cite sources, and stay accurate</span>
							</li>
						</ul>
					</div>
					
					<div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 shadow-2xl shadow-green-500/20">
						<div className="text-center mb-6">
							<div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
								<Zap className="w-8 h-8 text-white" />
							</div>
							<h4 className="text-xl font-bold text-white mb-2">🧠 Agentic AI & LLM Agents</h4>
						</div>
						<ul className="space-y-3 text-slate-300">
							<li className="flex items-start gap-2">
								<span className="text-green-400">✓</span>
								<span>Autonomous AI agents that plan, act, and execute workflows</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="text-green-400">✓</span>
								<span>Enterprise-ready knowledge assistants for teams & organizations</span>
							</li>
						</ul>
					</div>
				</div>
			</div>



			{/* About Sachin Section */}
			{!loading && !error && personas.length > 0 && (
				<div className="mb-16">
					<div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/40 rounded-3xl p-8 shadow-xl">
						{/* Grid Layout for Three Sections */}
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
							{/* First Part: Meet Sachin Profile */}
							<div className="lg:col-span-1">
								<div className="flex flex-col items-center text-center">
									{/* Profile Image */}
									<div className="relative mb-4">
										<div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center p-1 shadow-lg">
											<img
												className="w-full h-full rounded-xl object-cover"
												src="https://projectsuperone.s3.us-west-2.amazonaws.com/uploads/profile/68a89fb1ec3a1.jpeg"
												alt="Sachin Profile"
											/>
										</div>
										<div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
									</div>

									{/* Profile Info */}
									<h3 className="text-2xl font-bold text-white mb-2">
										Meet Sachin
									</h3>
									<p className="text-cyan-400 text-lg font-medium mb-3">
										Senior AI Engineer & Tech Mentor
									</p>
									
									{/* Rating */}
									<div className="flex items-center justify-center gap-2 mb-3">
										<div className="flex items-center gap-1">
											{[...Array(5)].map((_, i) => (
												<Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
											))}
										</div>
										<span className="text-slate-300 text-sm">4.9/5.0 (2,847 reviews)</span>
									</div>
									
									{/* Stats */}
									<div className="flex items-center justify-center gap-4">
										<div className="text-center">
											<div className="text-lg font-bold text-cyan-400">8+</div>
											<div className="text-xs text-slate-400">Years</div>
										</div>
										<div className="text-center">
											<div className="text-lg font-bold text-blue-400">500+</div>
											<div className="text-xs text-slate-400">Projects</div>
										</div>
										<div className="text-center">
											<div className="text-lg font-bold text-purple-400">15K+</div>
											<div className="text-xs text-slate-400">Students</div>
										</div>
									</div>
								</div>
							</div>

							{/* Second Part: About Section */}
							<div className="lg:col-span-1">
								<div className="bg-slate-700/30 border border-slate-600/30 rounded-2xl p-6 h-full">
									<h4 className="text-white font-semibold text-lg mb-3">About Sachin</h4>
									<p className="text-slate-200 leading-relaxed">
										I'm a passionate AI engineer with 8+ years of experience building scalable applications. 
										I love helping developers understand complex concepts through simple explanations and real-world examples. 
										Whether you're stuck on a bug, need career advice, or want to learn new technologies, I'm here to help!
									</p>
								</div>
							</div>

							{/* Third Part: Button Section */}
							<div className="lg:col-span-1">
								<div className="flex flex-col items-center justify-center h-full">
									<div className="text-center">
										<h4 className="text-white font-semibold text-lg mb-4">Ready to Start?</h4>
										<p className="text-slate-300 text-sm mb-6 leading-relaxed">
											Begin your AI learning journey with personalized mentorship and expert guidance.
										</p>
										<button 
											onClick={() => handleNavigation('/chat/sachin')}
											className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center gap-3 mx-auto text-lg w-full"
										>
											<MessageCircle className="w-6 h-6" />
											Start Chatting
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}


			{/* Error Display */}
			{error && (
				<div className="mb-8 p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-300">
					<p className="text-center">Error loading personas: {error}</p>
					<button
						onClick={handleRefresh}
						className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors mx-auto block"
					>
						Try Again
					</button>
				</div>
			)}

			{/* Loading State */}
			{loading && (
				<div className="flex justify-center items-center py-20">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
				</div>
			)}

			{/* No Personas State */}
			{!loading && !error && personas.length === 0 && (
				<div className="text-center py-20">
					<Database className="w-16 h-16 text-slate-500 mx-auto mb-4" />
					<h3 className="text-2xl font-semibold text-slate-300 mb-2">No Personas Found</h3>
					<p className="text-slate-400 mb-6">No personas are currently available in the database.</p>
					<button
						onClick={handleRefresh}
						className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-xl transition-colors"
					>
						Refresh
					</button>
				</div>
			)}

			{/* Why Choose Us Section */}
			<div className="mt-20">
				<div className="text-center mb-12">
					<h3 className="text-3xl font-bold text-white mb-4">🌟 Why Choose SachinAI?</h3>
					<p className="text-slate-400 text-lg">We're not just another chatbot company</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<div className="text-center p-6 rounded-2xl bg-slate-800/30 border border-slate-600/30">
						<Sparkles className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
						<h3 className="text-xl font-semibold text-white mb-2">Mentorship-Driven AI</h3>
						<p className="text-slate-300">Not just chatbots, but true AI guides that understand and mentor</p>
					</div>
					<div className="text-center p-6 rounded-2xl bg-slate-800/30 border border-slate-600/30">
						<Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
						<h3 className="text-xl font-semibold text-white mb-2">RAG-Enhanced</h3>
						<p className="text-slate-300">Ensuring accurate, context-aware responses with source citations</p>
					</div>
					<div className="text-center p-6 rounded-2xl bg-slate-800/30 border border-slate-600/30">
						<MessageCircle className="w-12 h-12 text-purple-400 mx-auto mb-4" />
						<h3 className="text-xl font-semibold text-white mb-2">Agentic AI</h3>
						<p className="text-slate-300">Our bots don't just answer, they act and execute workflows</p>
					</div>
					<div className="text-center p-6 rounded-2xl bg-slate-800/30 border border-slate-600/30">
						<Zap className="w-12 h-12 text-green-400 mx-auto mb-4" />
						<h3 className="text-xl font-semibold text-white mb-2">Secure & Scalable</h3>
						<p className="text-slate-300">Designed for personal and enterprise use with enterprise-grade security</p>
					</div>
					<div className="text-center p-6 rounded-2xl bg-slate-800/30 border border-slate-600/30">
						<Brain className="w-12 h-12 text-pink-400 mx-auto mb-4" />
						<h3 className="text-xl font-semibold text-white mb-2">Future-Ready</h3>
						<p className="text-slate-300">Bridging learning, productivity, and intelligence for tomorrow's challenges</p>
					</div>
					<div className="text-center p-6 rounded-2xl bg-slate-800/30 border border-slate-600/30">
						<Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
						<h3 className="text-xl font-semibold text-white mb-2">Human-Centric</h3>
						<p className="text-slate-300">Built with humans in mind, enhancing rather than replacing human capabilities</p>
					</div>
				</div>
			</div>

			{/* Statistics Section */}
			<div className="mt-20">
				<div className="text-center mb-12">
					<h3 className="text-3xl font-bold text-white mb-4">Trusted by Developers Worldwide</h3>
					<p className="text-slate-400 text-lg">Join thousands of developers who have improved their skills with AI mentors</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div className="text-center p-6 rounded-2xl bg-slate-800/20 border border-slate-600/20">
						<div className="text-4xl font-bold text-cyan-400 mb-2">15.2K+</div>
						<p className="text-slate-300">Active Learners</p>
					</div>
					<div className="text-center p-6 rounded-2xl bg-slate-800/20 border border-slate-600/20">
						<div className="text-4xl font-bold text-blue-400 mb-2">89.7K+</div>
						<p className="text-slate-300">Questions Answered</p>
					</div>
					<div className="text-center p-6 rounded-2xl bg-slate-800/20 border border-slate-600/20">
						<div className="text-4xl font-bold text-purple-400 mb-2">97.3%</div>
						<p className="text-slate-300">Success Rate</p>
					</div>
					<div className="text-center p-6 rounded-2xl bg-slate-800/20 border border-slate-600/20">
						<div className="text-4xl font-bold text-green-400 mb-2">24/7</div>
						<p className="text-slate-300">Support Available</p>
					</div>
				</div>
			</div>

			{/* How It Works Section */}
			<div className="mt-20">
				<div className="text-center mb-12">
					<h3 className="text-3xl font-bold text-white mb-4">How It Works</h3>
					<p className="text-slate-400 text-lg">Get started in just 3 simple steps</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="text-center p-6 rounded-2xl bg-slate-800/20 border border-slate-600/20">
						<div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">1</div>
						<h4 className="text-xl font-semibold text-white mb-3">Choose Your Mentor</h4>
						<p className="text-slate-300">Browse our curated list of AI mentors, each specializing in different technologies and domains</p>
					</div>
					<div className="text-center p-6 rounded-2xl bg-slate-800/20 border border-slate-600/20">
						<div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">2</div>
						<h4 className="text-xl font-semibold text-white mb-3">Ask Anything</h4>
						<p className="text-slate-300">Ask questions about code, debugging, architecture, career advice, or any tech-related topic</p>
					</div>
					<div className="text-center p-6 rounded-2xl bg-slate-800/20 border border-slate-600/20">
						<div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">3</div>
						<h4 className="text-xl font-semibold text-white mb-3">Learn & Apply</h4>
						<p className="text-slate-300">Receive detailed explanations, code examples, and practical advice you can implement immediately</p>
					</div>
				</div>
			</div>

			{/* Testimonials Section */}
			<div className="mt-20">
				<div className="text-center mb-12">
					<h3 className="text-3xl font-bold text-white mb-4">What Developers Are Saying</h3>
					<p className="text-slate-400 text-lg">Real feedback from our community of learners</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<div className="p-6 rounded-2xl bg-slate-800/20 border border-slate-600/20">
						<div className="flex items-center gap-3 mb-4">
							<div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">R</div>
							<div>
								<h5 className="text-white font-semibold">Rahul Sharma</h5>
								<p className="text-slate-400 text-sm">Senior Full Stack Developer @ TechCorp</p>
							</div>
						</div>
						<p className="text-slate-300">"Sachin helped me debug a complex React state management issue in minutes. His explanations are crystal clear and he always provides practical solutions. Game changer!"</p>
						<div className="flex items-center gap-1 mt-3">
							{[...Array(5)].map((_, i) => (
								<Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
							))}
						</div>
					</div>
					<div className="p-6 rounded-2xl bg-slate-800/20 border border-slate-600/20">
						<div className="flex items-center gap-3 mb-4">
							<div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">P</div>
							<div>
								<h5 className="text-white font-semibold">Priya Patel</h5>
								<p className="text-slate-400 text-sm">Frontend Engineer @ StartupXYZ</p>
							</div>
						</div>
						<p className="text-slate-300">"The career guidance I received was invaluable. Sachin helped me prepare for technical interviews and negotiate better offers. Landed my dream job!"</p>
						<div className="flex items-center gap-1 mt-3">
							{[...Array(5)].map((_, i) => (
								<Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
							))}
						</div>
					</div>
					<div className="p-6 rounded-2xl bg-slate-800/20 border border-slate-600/20">
						<div className="flex items-center gap-3 mb-4">
							<div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">A</div>
							<div>
								<h5 className="text-white font-semibold">Amit Kumar</h5>
								<p className="text-slate-400 text-sm">DevOps Engineer @ CloudTech</p>
							</div>
						</div>
						<p className="text-slate-300">"Sachin's expertise in AWS and Docker helped me optimize our deployment pipeline. Reduced deployment time by 60% and costs by 30%!"</p>
						<div className="flex items-center gap-1 mt-3">
							{[...Array(5)].map((_, i) => (
								<Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Technologies Section */}
			<div className="mt-20">
				<div className="text-center mb-12">
					<h3 className="text-3xl font-bold text-white mb-4">Technologies We Cover</h3>
					<p className="text-slate-400 text-lg">Expert guidance on modern development stacks and tools</p>
				</div>
				<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
					{[
						{ name: 'React', icon: '⚛️' },
						{ name: 'Node.js', icon: '🟢' },
						{ name: 'Laravel', icon: '🔴' },
						{ name: 'Python', icon: '🐍' },
						{ name: 'AWS', icon: '☁️' },
						{ name: 'Docker', icon: '🐳' },
						{ name: 'MongoDB', icon: '🍃' },
						{ name: 'TypeScript', icon: '🔷' },
						{ name: 'Vue.js', icon: '💚' },
						{ name: 'Flutter', icon: '🦋' },
						{ name: 'Kubernetes', icon: '⚓' },
						{ name: 'GraphQL', icon: '🔵' }
					].map((tech, index) => (
						<div key={index} className="text-center p-4 rounded-xl bg-slate-800/20 border border-slate-600/20 hover:bg-slate-700/30 transition-colors cursor-pointer group">
							<div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 text-2xl group-hover:scale-110 transition-transform">
								{tech.icon}
							</div>
							<p className="text-slate-300 text-sm font-medium">{tech.name}</p>
						</div>
					))}
				</div>
			</div>

			{/* CTA Section */}
			<div className="mt-20">
				<div className="text-center p-12 rounded-3xl bg-gradient-to-r from-cyan-900/30 via-blue-900/30 to-purple-900/30 border border-slate-600/30">
					<h3 className="text-4xl font-bold text-white mb-4">Ready to Accelerate Your Development Journey?</h3>
					<p className="text-slate-300 text-xl mb-8 max-w-2xl mx-auto">
						Join 15,000+ developers who are already learning faster with AI mentors. 
						Stop getting stuck on Stack Overflow and get personalized help instead!
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<button 
							onClick={() => handleNavigation('/chat/sachin')}
							className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center gap-3 mx-auto text-lg"
						>
							<MessageCircle className="w-6 h-6" />
							Start Learning with Sachin
						</button>
						<button className="bg-slate-800/50 hover:bg-slate-700/50 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 border border-slate-600/30">
							View All Mentors
						</button>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Home;