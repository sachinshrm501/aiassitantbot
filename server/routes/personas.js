import express from 'express';
import Persona from '../models/Persona.js';

const router = express.Router();

// Get all personas
router.get('/', async (req, res) => {
  try {
    const personas = await Persona.find().select('-__v');
    res.json(personas);
  } catch (error) {
    console.error('Error fetching personas:', error);
    res.status(500).json({ error: 'Failed to fetch personas' });
  }
});

// Get persona by ID
router.get('/:id', async (req, res) => {
  try {
    const persona = await Persona.findById(req.params.id).select('-__v');
    if (!persona) {
      return res.status(404).json({ error: 'Persona not found' });
    }
    res.json(persona);
  } catch (error) {
    console.error('Error fetching persona:', error);
    res.status(500).json({ error: 'Failed to fetch persona' });
  }
});

// Create new persona
router.post('/', async (req, res) => {
  try {
    const { name, description, systemPrompt, personality, expertise } = req.body;
    
    // Check if persona with same name already exists
    const existingPersona = await Persona.findOne({ name });
    if (existingPersona) {
      return res.status(400).json({ error: 'Persona with this name already exists' });
    }

    const persona = new Persona({
      name,
      description,
      systemPrompt,
      personality,
      expertise: expertise || []
    });

    const savedPersona = await persona.save();
    res.status(201).json(savedPersona);
  } catch (error) {
    console.error('Error creating persona:', error);
    res.status(500).json({ error: 'Failed to create persona' });
  }
});

// Update persona
router.put('/:id', async (req, res) => {
  try {
    const { name, description, systemPrompt, personality, expertise } = req.body;
    
    const persona = await Persona.findById(req.params.id);
    if (!persona) {
      return res.status(404).json({ error: 'Persona not found' });
    }

    // Check if name is being changed and if it conflicts with existing
    if (name && name !== persona.name) {
      const existingPersona = await Persona.findOne({ name });
      if (existingPersona) {
        return res.status(400).json({ error: 'Persona with this name already exists' });
      }
    }

    const updatedPersona = await Persona.findByIdAndUpdate(
      req.params.id,
      { name, description, systemPrompt, personality, expertise },
      { new: true, runValidators: true }
    );

    res.json(updatedPersona);
  } catch (error) {
    console.error('Error updating persona:', error);
    res.status(500).json({ error: 'Failed to update persona' });
  }
});

// Delete persona
router.delete('/:id', async (req, res) => {
  try {
    const persona = await Persona.findByIdAndDelete(req.params.id);
    if (!persona) {
      return res.status(404).json({ error: 'Persona not found' });
    }
    res.json({ message: 'Persona deleted successfully' });
  } catch (error) {
    console.error('Error deleting persona:', error);
    res.status(500).json({ error: 'Failed to delete persona' });
  }
});

export default router;
