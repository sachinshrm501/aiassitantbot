import mongoose from 'mongoose';

const personaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  systemPrompt: {
    type: String,
    required: true
  },
  personality: {
    type: String,
    required: true
  },
  expertise: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
personaSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Persona = mongoose.model('Persona', personaSchema);

export default Persona;
