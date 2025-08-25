import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Components/Home';
import MentorPersona from '../Components/MentorPersona';
import AnalyticsDashboard from '../Components/AnalyticsDashboard';
import Error from '../Components/Error';

function App() {
	const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
	const SACHIN_ENDPOINT = import.meta.env.VITE_SACHIN_ENDPOINT || '/chat/sachin';
	const APP_NAME = import.meta.env.VITE_APP_NAME || 'AI Persona ChatBot';

	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				
				<Route
					path="/chat/sachin"
					element={
						<MentorPersona
							name="Sachin"
							title="Ai Engineer"
							initialMessage="Hello, to aaj hmlog kis topic par bat karne wale hai?"
							endpoint={`${API_BASE_URL}${SACHIN_ENDPOINT}`}
							src="https://projectsuperone.s3.us-west-2.amazonaws.com/uploads/profile/68a89fb1ec3a1.jpeg"
						/>
					}
				/>

				<Route path="/analytics" element={<AnalyticsDashboard />} />
				
				<Route path="*" element={<Error />} />
			</Routes>
		</>
	);
}

export default App;