import mongoose from 'mongoose';

const simulationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: true, trim: true },
  category: { type: String, required: true },
  answers: { type: Object, required: true },
  result: { type: Object, required: true },
  favorite: { type: Boolean, default: false },
  replay: { progress: String, updatedAt: Date },
}, { timestamps: true });

export default mongoose.model('Simulation', simulationSchema);
