#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Setting up Live MongoDB for AI Persona Chatbot\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '.env.example');

if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file from template...');
  
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ .env file created successfully');
  } else {
    console.log('❌ .env.example not found');
    process.exit(1);
  }
} else {
  console.log('✅ .env file already exists');
}

console.log('\n📋 Next steps:');
console.log('1. Edit your .env file and add your MongoDB Atlas connection string');
console.log('2. Set your OpenAI API key');
console.log('3. Run: npm run seed (to populate the database)');
console.log('4. Run: npm run dev (to start the server)');
console.log('\n🔗 Get your MongoDB Atlas connection string from: https://www.mongodb.com/atlas');
console.log('\n💡 Example connection string format:');
console.log('   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-persona-chatbot');
