# AI Persona ChatBot

A React-based chat application featuring AI personas of tech mentors (Sandip Mishra and Sachin Sharma) built with modern web technologies.

## 🚀 Features

- **AI Personas**: Chat with Sandip Sir and Sachin AI personas
- **Real-time Chat**: Interactive chat interface with typing indicators
- **Modern UI**: Beautiful gradient design with animations
- **Responsive**: Works on desktop and mobile devices
- **Quick Actions**: Pre-defined conversation starters

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Lucide React Icons
- React Router DOM

### Backend
- Node.js
- Express.js
- OpenAI API
- CORS
- Dotenv

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone <repository-url>
cd AI-Persona-chatBot
```

### 2. Install dependencies
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client && npm install && cd ..

# Install server dependencies
cd server && npm install && cd ..
```

### 3. Set up environment variables
Create a `.env` file in the `server` directory:
```bash
cd server
echo "OPENAI_API_KEY=your_actual_openai_api_key_here" > .env
echo "PORT=3001" >> .env
cd ..
```

**Important**: Replace `your_actual_openai_api_key_here` with your real OpenAI API key.

### 4. Start the development servers

#### Option 1: Using the convenience script
```bash
./start-dev.sh
```

#### Option 2: Manual start
```bash
# Start both client and server simultaneously
npm run dev
```

#### Option 3: Start separately
```bash
# Terminal 1 - Start server
cd server && npm run dev

# Terminal 2 - Start client
cd client && npm run dev
```

### 5. Access the application
- **Client**: http://localhost:5173
- **Server**: http://localhost:3001

## 📁 Project Structure

```
AI-Persona-chatBot/
├── client/                 # React frontend
│   ├── Components/         # React components
│   ├── src/               # Source files
│   └── package.json       # Frontend dependencies
├── server/                # Node.js backend
│   ├── persona/           # AI persona configurations
│   ├── server.js          # Express server
│   └── package.json       # Backend dependencies
├── package.json           # Root package.json
├── start-dev.sh           # Development startup script
└── README.md              # This file
```

## 🔧 Configuration

### Server Configuration
The server runs on port 3001 by default. You can change this in the `server/.env` file.

### Client Configuration
The client runs on port 5173 by default (Vite's default port).

### API Endpoints
- `POST /chat/sandip` - Chat with Sandip Sir persona
- `POST /chat/sachin` - Chat with Sachin persona

## 🎯 Usage

1. Open http://localhost:5173 in your browser
2. Choose a mentor (Sandip Sir or Sachin)
3. Start chatting with the AI persona
4. Use quick action buttons for common topics

## 🔍 Troubleshooting

### Port Already in Use
If port 3001 is already in use, change the PORT in `server/.env`:
```bash
PORT=3002
```

### OpenAI API Errors
- Ensure your API key is valid and has sufficient credits
- Check the `.env` file is properly configured
- Verify the API key is not exposed in version control

### CORS Issues
The server is configured to allow requests from:
- http://localhost:5173 (Vite default)
- http://localhost:3000 (Alternative React port)
- https://ai-persona-chat-bot.vercel.app (Production)

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy the dist folder
```

### Backend (Render/Railway)
```bash
cd server
# Set environment variables in your hosting platform
# Deploy the server directory
```

## 📝 License

This project is for educational purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you encounter any issues, please check the troubleshooting section or create an issue in the repository. 