import React, { useState, useEffect } from 'react';
import {
	Key,
	Eye,
	EyeOff,
	Shield,
	CheckCircle,
	AlertCircle,
	ExternalLink,
} from 'lucide-react';

const ApiKeyModal = ({ isOpen, onApiKeySubmit }) => {
	const [apiKey, setApiKey] = useState('');
	const [showKey, setShowKey] = useState(false);
	const [isValidating, setIsValidating] = useState(false);
	const [error, setError] = useState('');

	// Check if API key is already stored
	useEffect(() => {
		const storedKey = sessionStorage.getItem('openai_api_key');
		if (storedKey && !isOpen) {
			onApiKeySubmit(storedKey);
		}
	}, [isOpen, onApiKeySubmit]);

	const validateApiKey = (key) => {
		// Basic validation for OpenAI API key format
		return key.startsWith('sk-') && key.length > 40;
	};

	const handleSubmit = async () => {
		setError('');

		if (!apiKey.trim()) {
			setError('Please enter your API key');
			return;
		}

		if (!validateApiKey(apiKey)) {
			setError('Invalid API key format. OpenAI API keys start with "sk-"');
			return;
		}

		setIsValidating(true);

		try {
			// Optional: Test the API key by making a simple request
			// You can implement this validation on your backend
			await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated validation

			// Store in session storage (cleared when browser closes)
			sessionStorage.setItem('openai_api_key', apiKey);
			onApiKeySubmit(apiKey);
		} catch (err) {
			setError('Invalid API key. Please check and try again.');
		} finally {
			setIsValidating(false);
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleSubmit();
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			{/* Backdrop */}
			<div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

			{/* Background Effects */}
			<div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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
			</div>

			{/* Modal Content */}
			<div className="relative z-10 w-full max-w-md">
				{/* Glowing border effect */}
				<div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-75 animate-pulse"></div>

				<div className="relative bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8">
					{/* Header */}
					<div className="text-center mb-8">
						<div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
							<Key className="w-8 h-8 text-white" />
						</div>

						<h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
							OpenAI API Key Required
						</h2>

						<p className="text-slate-300 text-sm leading-relaxed">
							To use our AI personas, please provide your OpenAI API key. Your
							key is stored securely in your browser session.
						</p>
					</div>

					{/* Input Section */}
					<div className="space-y-6">
						<div>
							<label className="block text-slate-300 text-sm font-medium mb-2">
								API Key
							</label>
							<div className="relative">
								<input
									type={showKey ? 'text' : 'password'}
									value={apiKey}
									onChange={(e) => setApiKey(e.target.value)}
									onKeyDown={handleKeyPress}
									placeholder="sk-..."
									className="w-full bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 text-white placeholder-slate-400 rounded-xl px-4 py-3 pr-12 outline-none focus:border-purple-500/50 transition-all duration-200"
								/>
								<button
									onClick={() => setShowKey(!showKey)}
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
								>
									{showKey ? (
										<EyeOff className="w-5 h-5" />
									) : (
										<Eye className="w-5 h-5" />
									)}
								</button>
							</div>
						</div>

						{error && (
							<div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
								<AlertCircle className="w-4 h-4 flex-shrink-0" />
								<span>{error}</span>
							</div>
						)}

						<button
							onClick={handleSubmit}
							disabled={isValidating || !apiKey.trim()}
							className="w-full group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
						>
							{isValidating ? (
								<>
									<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
									Validating...
								</>
							) : (
								<>
									<CheckCircle className="w-5 h-5" />
									Continue
								</>
							)}
						</button>
					</div>

					{/* Info Section */}
					<div className="mt-6 pt-6 border-t border-slate-700/50">
						<div className="flex items-start gap-3 text-slate-400 text-sm">
							<Shield className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-400" />
							<div>
								<p className="text-slate-300 font-medium mb-1">
									Your API key is secure
								</p>
								<ul className="space-y-1 text-xs">
									<li>• Stored only in your browser session</li>
									<li>• Automatically cleared when you close the browser</li>
									<li>• Never sent to our servers</li>
								</ul>
							</div>
						</div>

						<div className="mt-4 text-center">
							<a
								href="https://platform.openai.com/api-keys"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm transition-colors"
							>
								Get your API key from OpenAI
								<ExternalLink className="w-3 h-3" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

// Example wrapper component showing how to use the modal
const AppWithApiKey = ({ children }) => {
	const [showModal, setShowModal] = useState(false);
	const [apiKey, setApiKey] = useState(null);

	useEffect(() => {
		// Check if API key exists in session storage
		const storedKey = sessionStorage.getItem('openai_api_key');
		if (storedKey) {
			setApiKey(storedKey);
		} else {
			setShowModal(true);
		}
	}, []);

	const handleApiKeySubmit = (key) => {
		setApiKey(key);
		setShowModal(false);
	};

	return (
		<>
			<ApiKeyModal isOpen={showModal} onApiKeySubmit={handleApiKeySubmit} />
			{apiKey ? children : null}
		</>
	);
};

export { ApiKeyModal, AppWithApiKey };
export default ApiKeyModal;