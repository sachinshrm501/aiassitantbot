# MongoDB Setup Guide (Live MongoDB Only)

This guide will help you set up MongoDB Atlas (cloud) for your AI Persona Chatbot project.

## Prerequisites

1. **MongoDB Atlas Account** - Free tier available
2. **Node.js** - Version 16 or higher
3. **npm** - Comes with Node.js

## MongoDB Atlas Setup

### 1. Create MongoDB Atlas Account
- Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
- Sign up for a free account
- Create a new cluster (free tier available)

### 2. Get Connection String
- Click "Connect" on your cluster
- Choose "Connect your application"
- Copy the connection string
- Replace `<password>` with your database user password

### 3. Update Environment Variables
```bash
# In your .env file
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-persona-chatbot
```

## Environment Setup

### 1. Copy Environment Template
```bash
cp .env.example .env
```

### 2. Update .env File
```bash
# For MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-persona-chatbot
```

## Database Operations

### 1. Seed Initial Data
```bash
npm run seed
```
This will create initial personas in your database.

### 2. Start the Server
```bash
npm run dev
```

### 3. Verify Database Connection
Check your server console for:
```
✅ MongoDB Connected: cluster.mongodb.net
```

## API Endpoints

### Personas
- `GET /api/personas` - Get all personas
- `GET /api/personas/:id` - Get persona by ID
- `POST /api/personas` - Create new persona
- `PUT /api/personas/:id` - Update persona
- `DELETE /api/personas/:id` - Delete persona

### Chats
- `GET /api/chats/persona/:personaId` - Get chats for a persona
- `GET /api/chats/session/:sessionId` - Get chat by session ID
- `POST /api/chats` - Create new chat session
- `POST /api/chats/:sessionId/messages` - Add message to chat
- `DELETE /api/chats/:sessionId` - Delete chat session

## Testing the Setup

### 1. Test Database Connection
```bash
curl http://localhost:5000/api/personas
```

### 2. Create a Test Persona
```bash
curl -X POST http://localhost:5000/api/personas \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Mentor",
    "description": "A test persona for development",
    "systemPrompt": "You are a helpful test mentor",
    "personality": "Friendly and helpful",
    "expertise": ["Testing", "Development"]
  }'
```

## Troubleshooting

### Common Issues:

1. **Authentication Failed**
   - Verify username/password in connection string
   - Check if user has proper permissions
   - Ensure IP address is whitelisted in Atlas

2. **Connection Timeout**
   - Check your internet connection
   - Verify the connection string format
   - Ensure cluster is running

3. **Database Not Found**
   - The database will be created automatically on first data insertion
   - Run the seed script: `npm run seed`

### Useful Commands:

```bash
# Test MongoDB connection
npm run seed

# Check server logs
npm run dev

# View environment variables
cat .env
```

## Data Models

### Persona Schema
- `name`: Unique persona name
- `description`: Brief description
- `systemPrompt`: OpenAI system prompt
- `personality`: Personality traits
- `expertise`: Array of expertise areas
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

### Chat Schema
- `personaId`: Reference to Persona
- `sessionId`: Unique chat session identifier
- `messages`: Array of conversation messages
- `startedAt`: Session start time
- `lastActivity`: Last activity timestamp

## Next Steps

1. **Customize Personas**: Modify the seed data or create new personas via API
2. **Integrate with Frontend**: Update your React components to use the new API endpoints
3. **Add Authentication**: Implement user authentication and authorization
4. **Add Analytics**: Track chat usage and user engagement
5. **Backup Strategy**: MongoDB Atlas provides automatic backups

## Support

If you encounter issues:
1. Check MongoDB Atlas logs
2. Verify environment variables
3. Test database connection manually
4. Check API endpoint responses
5. Verify IP whitelist in Atlas
