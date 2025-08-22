import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Sparkles, Users, ArrowRight, Star, Zap, Heart } from 'lucide-react';

const Home = () => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [isVisible, setIsVisible] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const handleMouseMove = (e) => {
			setMousePosition({
				x: (e.clientX / window.innerWidth) * 100,
				y: (e.clientY / window.innerHeight) * 100,
			});
		};

		// Add entrance animation
		setTimeout(() => setIsVisible(true), 100);

		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, []);

	const handleNavigation = (path) => {
		navigate(path);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 via-blue-900 to-slate-900 overflow-hidden relative">
			{/* Enhanced Animated Background */}
			<div
				className="absolute inset-0 opacity-40"
				style={{
					background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(147, 51, 234, 0.25), transparent 50%)`,
				}}
			/>
			
			{/* Additional gradient layers */}
			<div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10" />
			<div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />

			{/* Enhanced Floating Particles */}
			<div className="absolute inset-0">
				{[...Array(30)].map((_, i) => (
					<div
						key={i}
						className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse"
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
							animationDelay: `${Math.random() * 4}s`,
							animationDuration: `${3 + Math.random() * 3}s`,
							opacity: 0.6 + Math.random() * 0.4,
						}}
					/>
				))}
			</div>

			{/* Animated Stars */}
			<div className="absolute inset-0">
				{[...Array(15)].map((_, i) => (
					<div
						key={i}
						className="absolute text-yellow-300 animate-twinkle"
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
							animationDelay: `${Math.random() * 3}s`,
							fontSize: `${8 + Math.random() * 12}px`,
						}}
					>
						<Star className="w-3 h-3" fill="currentColor" />
					</div>
				))}
			</div>

			{/* Main Content */}
			<div className="relative z-10 container mx-auto px-6 py-12">
				{/* Enhanced Header */}
				<div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
					
					<h3 className="text-7xl md:text-9xl font-black bg-gradient-to-r from-white via-purple-200 via-blue-200 to-cyan-300 bg-clip-text text-transparent mb-8 animate-pulse leading-tight">
						Connect & Learn
					</h3>
				</div>

				{/* Enhanced Persona Cards */}
				<div className={`grid md:grid-cols-1 gap-8 max-w-5xl mx-auto mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
					{/* Sandip Sir Card - temporarily hidden
					<div className="group relative">
						<div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
						<div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 h-full">
							<div className="flex items-center gap-4 mb-6">
								<div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center">
									<img
										className="w-full h-full"
										src="https://scontent.fdel27-4.fna.fbcdn.net/v/t39.30808-6/520340418_10161659184718733_4637582195983080457_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=xRJmMwDIQDEQ7kNvwHYS5jQ&_nc_oc=AdkBtJ6k8k30VXvk3dimI9TwiLpcO1C9Svh-m8uF_-XsHQhF1uL_XfW17LSFLpHWVc_J2P-Q0I3qXS2tBPSunRMK&_nc_zt=23&_nc_ht=scontent.fdel27-4.fna&_nc_gid=EMWUIZaDrh0TOwHWXiPOhA&oh=00_AfUHPmRglPZrSAmOCFhA1zJntUo-aKHucOUgp2XVjf1jCQ&oe=68A87C56"
									/>
								</div>
								<div>
									<h3 className="text-3xl font-bold text-white">Sandip Sir</h3>
									<p className="text-purple-400">Tech Mentor & Guide</p>
								</div>
							</div>

							<p className="text-slate-300 mb-6 leading-relaxed">
								Get expert insights on programming, development, and technology.
								Perfect for technical guidance and career advice.
							</p>

							<div className="flex flex-wrap gap-2 mb-6">
								{['Programming', 'Web Dev', 'Career', 'Tech'].map((tag) => (
									<span
										key={tag}
										className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-sm"
									>
										{tag}
									</span>
								))}
							</div>

							<button
								onClick={() => handleNavigation('/chat/sandip')}
								className="group/btn inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 cursor-pointer"
							>
								<MessageCircle className="w-5 h-5" />
								Start Conversation
								<ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
							</button>
						</div>
					</div>
					*/}

					{/* Enhanced Sachin Card */}
					<div className="group relative max-w-2xl mx-auto">
						<div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
						<div className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90 backdrop-blur-xl border border-slate-600/30 rounded-3xl p-10 h-full shadow-2xl shadow-blue-500/20">
							{/* Profile Section */}
							<div className="flex items-center gap-6 mb-8">
								<div className="relative">
									<div className="w-20 h-20 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-3xl flex items-center justify-center p-1 shadow-2xl shadow-blue-500/30">
										<img
											className="w-full h-full rounded-2xl object-cover"
											src="https://scontent.fdel27-5.fna.fbcdn.net/v/t39.30808-1/289597833_3162199834095870_6998094828136306737_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=103&ccb=1-7&_nc_sid=1d2534&_nc_ohc=hpGhiYLJe_QQ7kNvwHnsA3a&_nc_oc=Adluh51mv-FF_BjU8_dyHkFtXx7pu8oMUCaiOrDSGDjWa61x6MOslWii8VNdWmUg97INz-6kdK6cuVkLB3f2SCkJ&_nc_zt=24&_nc_ht=scontent.fdel27-5.fna&_nc_gid=epbjuEm7INU0zRR7IFT3Aw&oh=00_AfVX_SbVqYtpwmd7TyMUckOk7Ek7x4cT7Aj8ywSlvNJIMA&oe=68A885F4"
											alt="Sachin Profile"
										/>
									</div>
									<div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
								</div>
								<div>
									<h3 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mb-2">
										Sachin
									</h3>
									<p className="text-cyan-300 text-lg font-medium flex items-center gap-2">
										<Zap className="w-5 h-5" />
										Developer & Life Coach
									</p>
									<div className="flex items-center gap-1 mt-2">
										{[...Array(5)].map((_, i) => (
											<Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
										))}
										<span className="text-slate-400 text-sm ml-2">5.0</span>
									</div>
								</div>
							</div>

							{/* Description */}
							<p className="text-slate-200 mb-8 leading-relaxed text-lg">
								Discover life insights, personal growth strategies, and
								meaningful conversations about success and fulfillment. 
								Get ready for transformative discussions that will change your perspective.
							</p>

							{/* Enhanced Tags */}
							<div className="flex flex-wrap gap-3 mb-8">
								{['Programming', 'Life Advice', 'Growth', 'Success', 'Mindset'].map(
									(tag) => (
										<span
											key={tag}
											className="px-4 py-2 bg-gradient-to-r from-blue-900/50 to-cyan-900/50 text-blue-200 rounded-full text-sm font-medium border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105"
										>
											{tag}
										</span>
									),
								)}
							</div>

							{/* Enhanced CTA Button */}
							<button
								onClick={() => handleNavigation('/chat/sachin')}
								className="group/btn w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:via-blue-500 hover:to-purple-500 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/40 cursor-pointer border border-cyan-400/30"
							>
								<MessageCircle className="w-6 h-6" />
								Start Your Journey
								<ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300" />
							</button>
						</div>
					</div>
				</div>

				{/* Enhanced Stats Section */}
				<div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
					{[
						{ icon: Users, label: 'AI Personas', value: '1', color: 'from-purple-500 to-pink-500' },
						{ icon: MessageCircle, label: 'Conversations', value: '∞', color: 'from-blue-500 to-cyan-500' },
						{ icon: Sparkles, label: 'Insights', value: 'Unlimited', color: 'from-yellow-500 to-orange-500' },
					].map((stat, index) => (
						<div
							key={index}
							className="group text-center p-8 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-slate-700/30 rounded-3xl hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
						>
							<div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
								<stat.icon className="w-8 h-8 text-white" />
							</div>
							<div className="text-4xl font-black text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
								{stat.value}
							</div>
							<div className="text-slate-300 text-lg font-medium">{stat.label}</div>
						</div>
					))}
				</div>

				{/* Enhanced CTA Section */}
				<div className={`text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
					<div className="inline-flex items-center gap-3 text-slate-300 mb-6 p-4 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-600/30">
						<div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
						<span className="font-medium">Available 24/7</span>
						<Heart className="w-4 h-4 text-red-400 animate-pulse" />
					</div>
					<p className="text-slate-200 max-w-2xl mx-auto text-xl leading-relaxed">
						Choose your AI mentor and start an engaging conversation that could
						change your perspective forever. Your journey to growth starts now.
					</p>
				</div>
			</div>

			{/* Enhanced Custom Animation Styles */}
			<style jsx>{`
				@keyframes tilt {
					0%, 50%, 100% {
						transform: rotate(0deg);
					}
					25% {
						transform: rotate(1deg);
					}
					75% {
						transform: rotate(-1deg);
					}
				}
				@keyframes twinkle {
					0%, 100% {
						opacity: 0.3;
						transform: scale(0.8);
					}
					50% {
						opacity: 1;
						transform: scale(1.2);
					}
				}
				.animate-tilt {
					animation: tilt 10s infinite linear;
				}
				.animate-twinkle {
					animation: twinkle 3s infinite ease-in-out;
				}
			`}</style>
		</div>
	);
};

export default Home;