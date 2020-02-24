import mongoose from 'mongoose';

const Issue = new mongoose.Schema({
  title: { type: String },
  responsible: { type: String },
  description: { type: String },
  severity: { type: String },
  status: { type: String, default: 'OPEN' }
});

export default mongoose.model('Issue', Issue);
