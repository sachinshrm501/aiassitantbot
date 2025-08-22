import express from 'express';
import Chat from '../models/Chat.js';
import Persona from '../models/Persona.js';

const router = express.Router();

// Get all chats for a persona
router.get('/persona/:personaId', async (req, res) => {
  try {
    const chats = await Chat.find({ personaId: req.params.personaId })
      .sort({ lastActivity: -1 })
      .select('-__v');
    res.json(chats);
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).json({ error: 'Failed to fetch chats' });
  }
});

// Get chat by session ID
router.get('/session/:sessionId', async (req, res) => {
  try {
    const chat = await Chat.findOne({ sessionId: req.params.sessionId })
      .populate('personaId', 'name description')
      .select('-__v');
    
    if (!chat) {
      return res.status(404).json({ error: 'Chat session not found' });
    }
    
    res.json(chat);
  } catch (error) {
    console.error('Error fetching chat:', error);
    res.status(500).json({ error: 'Failed to fetch chat' });
  }
});

// Create new chat session
router.post('/', async (req, res) => {
  try {
    const { personaId, sessionId, initialMessage } = req.body;
    
    // Verify persona exists
    const persona = await Persona.findById(personaId);
    if (!persona) {
      return res.status(404).json({ error: 'Persona not found' });
    }

    // Check if session already exists
    const existingChat = await Chat.findOne({ sessionId });
    if (existingChat) {
      return res.status(400).json({ error: 'Chat session already exists' });
    }

    const messages = [];
    if (initialMessage) {
      messages.push({
        role: 'user',
        content: initialMessage
      });
    }

    const chat = new Chat({
      personaId,
      sessionId,
      messages
    });

    const savedChat = await chat.save();
    res.status(201).json(savedChat);
  } catch (error) {
    console.error('Error creating chat:', error);
    res.status(500).json({ error: 'Failed to create chat' });
  }
});

// Add message to chat
router.post('/:sessionId/messages', async (req, res) => {
  try {
    const { role, content } = req.body;
    
    const chat = await Chat.findOne({ sessionId: req.params.sessionId });
    if (!chat) {
      return res.status(404).json({ error: 'Chat session not found' });
    }

    chat.messages.push({ role, content });
    const updatedChat = await chat.save();
    
    res.json(updatedChat);
  } catch (error) {
    console.error('Error adding message:', error);
    res.status(500).json({ error: 'Failed to add message' });
  }
});

// Delete chat session
router.delete('/:sessionId', async (req, res) => {
  try {
    const chat = await Chat.findOneAndDelete({ sessionId: req.params.sessionId });
    if (!chat) {
      return res.status(404).json({ error: 'Chat session not found' });
    }
    
    res.json({ message: 'Chat session deleted successfully' });
  } catch (error) {
    console.error('Error deleting chat:', error);
    res.status(500).json({ error: 'Failed to delete chat' });
  }
});

export default router;
