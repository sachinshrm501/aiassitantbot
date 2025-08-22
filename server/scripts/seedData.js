import mongoose from 'mongoose';
import 'dotenv/config';
import Persona from '../models/Persona.js';
import { sachinSirPersona } from '../persona/sachinSirPersona.js';

const seedData = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      throw new Error('MONGODB_URI environment variable is required. Please set it in your .env file.');
    }

    // Connect to MongoDB
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Persona.deleteMany({});
    console.log('✅ Cleared existing personas');

    // Seed initial personas
    const personas = [
      {
        name: 'Sachin',
        description: 'A knowledgeable and experienced mentor who provides guidance on various topics',
        systemPrompt: sachinSirPersona,
        personality: 'Wise, patient, and encouraging mentor who shares knowledge generously',
        expertise: ['Mentoring', 'Career Guidance', 'Life Advice', 'Problem Solving', 'Leadership', 'Laravel', 'MERN Stack', 'AWS', 'Team Management']
      }
    ];

    const savedPersonas = await Persona.insertMany(personas);
    console.log('✅ Seeded personas:', savedPersonas.map(p => p.name));

    console.log('✅ Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error.message);
    console.log('💡 Make sure to set MONGODB_URI in your .env file with your live MongoDB connection string');
    process.exit(1);
  }
};

seedData();
