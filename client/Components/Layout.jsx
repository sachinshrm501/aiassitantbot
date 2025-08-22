import React from 'react';
import { Brain, Database, RefreshCw, MessageCircle } from 'lucide-react';

const Layout = ({ children, personas = [], loading = false, error = null, onRefresh, onNavigate }) => {
	const APP_NAME = import.meta.env.VITE_APP_NAME || 'SachinAI';

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
			<header className="relative z-10 bg-slate-900/90 backdrop-blur-sm border-b border-slate-700/50 sticky top-0">
				<div className="w-full px-6 py-4">
					<div className="flex items-center justify-between">
						{/* Logo and Brand */}
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
								<Brain className="w-6 h-6 text-white" />
							</div>
							<h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
								{APP_NAME}
							</h1>
						</div>

						{/* Navigation Menu */}
						<nav className="hidden md:flex items-center gap-8">
							<a href="/" className="text-slate-300 hover:text-cyan-400 transition-colors font-medium">Home</a>
							<a href="#" className="text-slate-300 hover:text-cyan-400 transition-colors font-medium">Mentors</a>
							<a href="#" className="text-slate-300 hover:text-cyan-400 transition-colors font-medium">Technologies</a>
							<a href="#" className="text-slate-300 hover:text-cyan-400 transition-colors font-medium">Pricing</a>
							<a href="#" className="text-slate-300 hover:text-cyan-400 transition-colors font-medium">About</a>
						</nav>

						{/* Right Side Actions */}
						<div className="flex items-center gap-4">
							{/* Database Status & Refresh */}
							<div className="hidden lg:flex items-center gap-4">
								<div className="flex items-center gap-2 text-slate-300">
									<Database className="w-4 h-4" />
									<span className="text-sm">
										{loading ? 'Loading...' : `${personas.length} Personas`}
									</span>
								</div>
								{onRefresh && (
									<button
										onClick={onRefresh}
										disabled={loading}
										className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors disabled:opacity-50"
										title="Refresh personas"
									>
										<RefreshCw className={`w-4 h-4 text-slate-300 ${loading ? 'animate-spin' : ''}`} />
									</button>
								)}
							</div>

							{/* User Actions */}
							<div className="flex items-center gap-3">
								<button className="hidden sm:block px-4 py-2 text-slate-300 hover:text-white transition-colors font-medium">
									Sign In
								</button>
								<button 
									onClick={() => onNavigate && onNavigate('/chat/sachin')}
									className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold px-6 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
								>
									Start Learning
								</button>
							</div>

							{/* Mobile Menu Button */}
							<button className="md:hidden p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors">
								<svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
								</svg>
							</button>
						</div>
					</div>

					{/* Mobile Database Status */}
					<div className="md:hidden mt-4 flex items-center justify-between">
						<div className="flex items-center gap-2 text-slate-300">
							<Database className="w-4 h-4" />
							<span className="text-sm">
								{loading ? 'Loading...' : `${personas.length} Personas`}
							</span>
						</div>
						{onRefresh && (
							<button
								onClick={onRefresh}
								disabled={loading}
								className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors disabled:opacity-50"
								title="Refresh personas"
							>
								<RefreshCw className={`w-4 h-4 text-slate-300 ${loading ? 'animate-spin' : ''}`} />
							</button>
						)}
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="relative z-10">
				{children}
			</main>

			{/* Footer */}
			<footer className="relative z-10 mt-20 bg-slate-900/80 backdrop-blur-sm border-t border-slate-700/50">
				<div className="w-full px-6 py-12">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
						{/* Company Info */}
						<div className="col-span-1 md:col-span-2">
							<div className="flex items-center gap-3 mb-4">
								<div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
									<Brain className="w-6 h-6 text-white" />
								</div>
								<h4 className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
									SachinAI
								</h4>
							</div>
							<p className="text-slate-300 mb-4 max-w-md">
								An AI-first innovation company building intelligent mentorship bots, agentic AI systems, and knowledge-driven LLM platforms. We empower individuals and businesses with personalized AI mentors, collaborative AI notebooks, and autonomous AI agents.
							</p>
							<div className="flex items-center gap-4">
								<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
								<span className="text-slate-400 text-sm">Live AI Mentors Available</span>
							</div>
						</div>

						{/* Quick Links */}
						<div>
							<h5 className="text-white font-semibold mb-4">Quick Links</h5>
							<ul className="space-y-2">
								<li><a href="/" className="text-slate-400 hover:text-cyan-400 transition-colors">Home</a></li>
								<li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">Mentors</a></li>
								<li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">Technologies</a></li>
								<li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">Pricing</a></li>
							</ul>
						</div>

						{/* Support */}
						<div>
							<h5 className="text-white font-semibold mb-4">Support</h5>
							<ul className="space-y-2">
								<li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">Help Center</a></li>
								<li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">Contact Us</a></li>
								<li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">FAQ</a></li>
								<li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">Community</a></li>
							</ul>
						</div>
					</div>

					{/* Divider */}
					<div className="border-t border-slate-700/50 pt-8">
						<div className="flex flex-col md:flex-row items-center justify-between gap-4">
							{/* Copyright */}
							<div className="text-slate-400 text-sm">
								© 2024 SachinAI. All rights reserved. | 
								<span className="ml-2">Built with ❤️ by Sachin Sharma</span>
							</div>

							{/* Social Links */}
							<div className="flex items-center gap-4">
								<a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
									<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
										<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
									</svg>
								</a>
								<a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
									<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
										<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.047-1.852-3.047-1.853 0-2.136 1.445-2.136 2.939v5.677H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
									</svg>
								</a>
								<a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
									<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
										<path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
									</svg>
								</a>
								<a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">
									<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
										<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
									</svg>
								</a>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Layout;
