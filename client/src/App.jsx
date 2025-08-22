import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Components/Home';
import Error from '../Components/Error';
// import { AppWithApiKey } from '../Components/ApiKeyModal';
import MentorPersona from '../Components/MentorPersona';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				{/* Sandip Sir route temporarily hidden
				<Route
					path="/chat/sandip"
					element={
						<MentorPersona
							name="Sandip"
							title="Tech Mentor & Guide"
							initialMessage="Hanjii kaise hai aap? mai aapki aaj kis tarike se madad kar skta hun"
							endpoint="http://localhost:3001/chat/sandip"
							src="https://scontent.fdel27-4.fna.fbcdn.net/v/t39.30808-6/520340418_10161659184718733_4637582195983080457_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=xRJmMwDIQDEQ7kNvwHYS5jQ&_nc_oc=AdkBtJ6k8k30VXvk3dimI9TwiLpcO1C9Svh-m8uF_-XsHQhF1uL_XfW17LSFLpHWVc_J2P-Q0I3qXS2tBPSunRMK&_nc_zt=23&_nc_ht=scontent.fdel27-4.fna&_nc_gid=EMWUIZaDrh0TOwHWXiPOhA&oh=00_AfUHPmRglPZrSAmOCFhA1zJntUo-aKHucOUgp2XVjf1jCQ&oe=68A87C56"
						/>
					}
				/>
				*/}
				<Route
					path="/chat/sachin"
					element={
						<MentorPersona
							name="Sachin"
							title="Tech Mentor & Guide"
							initialMessage="Hello, to aaj hmlog kis topic par bat karne wale hai?"
							endpoint="http://localhost:3001/chat/sachin"
							src="https://scontent.fdel27-5.fna.fbcdn.net/v/t39.30808-1/289597833_3162199834095870_6998094828136306737_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=103&ccb=1-7&_nc_sid=1d2534&_nc_ohc=hpGhiYLJe_QQ7kNvwHnsA3a&_nc_oc=Adluh51mv-FF_BjU8_dyHkFtXx7pu8oMUCaiOrDSGDjWa61x6MOslWii8VNdWmUg97INz-6kdK6cuVkLB3f2SCkJ&_nc_zt=24&_nc_ht=scontent.fdel27-5.fna&_nc_gid=epbjuEm7INU0zRR7IFT3Aw&oh=00_AfVX_SbVqYtpwmd7TyMUckOk7Ek7x4cT7Aj8ywSlvNJIMA&oe=68A885F4"
						/>
					}
				/>
				<Route path="*" element={<Error />} />
			</Routes>
		</>
	);
}

export default App;