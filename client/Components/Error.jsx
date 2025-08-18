import React from 'react';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';

const Error = () => {
	const handleRefresh = () => {
		window.location.reload();
	};

	const handleGoHome = () => {
		window.location.href = '/';
	};

	const handleGoBack = () => {
		window.history.back();
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex items-center justify-center p-6">
			{/* Background Effects */}
			<div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 animate-pulse"></div>

			{/* Floating Particles */}
			<div className="absolute inset-0 overflow-hidden">
				{[...Array(20)].map((_, i) => (
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

			{/* Error Card */}
			<div className="relative z-10 max-w-md w-full">
				{/* Glowing border effect */}
				<div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl blur opacity-75 animate-pulse"></div>

				<div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 text-center">
					{/* Error Icon */}
					<div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
						<AlertTriangle className="w-10 h-10 text-white" />
					</div>

					{/* Error Title */}
					<h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-4">
						Oops! Something went wrong
					</h1>

					{/* Error Message */}
					<p className="text-slate-300 text-lg leading-relaxed mb-8">
						We encountered an unexpected error. Don't worry, our team has been
						notified and we're working to fix it.
					</p>

					{/* Action Buttons */}
					<div className="space-y-4">
						<button
							onClick={handleRefresh}
							className="w-full group bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 flex items-center justify-center gap-2"
						>
							<RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
							Try Again
						</button>

						<div className="flex gap-3">
							<button
								onClick={handleGoBack}
								className="flex-1 bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 hover:border-purple-500/50 text-slate-300 hover:text-white font-medium px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
							>
								<ArrowLeft className="w-4 h-4" />
								Go Back
							</button>

							<button
								onClick={handleGoHome}
								className="flex-1 bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 hover:border-purple-500/50 text-slate-300 hover:text-white font-medium px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
							>
								<Home className="w-4 h-4" />
								Home
							</button>
						</div>
					</div>

					{/* Error Code (Optional) */}
					<div className="mt-6 pt-6 border-t border-slate-700/50">
						<p className="text-slate-500 text-sm">
							Error Code: <span className="font-mono text-red-400">500</span>
						</p>
					</div>
				</div>
			</div>

			{/* Additional floating elements for ambiance */}
			<div className="absolute top-20 left-20 w-32 h-32 bg-red-500/5 rounded-full blur-xl animate-pulse"></div>
			<div className="absolute bottom-20 right-20 w-40 h-40 bg-orange-500/5 rounded-full blur-xl animate-pulse"></div>
		</div>
	);
};

export default Error;