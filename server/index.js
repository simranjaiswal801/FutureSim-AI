import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './models/User.js';
import Simulation from './models/Simulation.js';
import { requireAuth } from './middleware/auth.js';
import { askAssistant, runSimulation } from './services/simulation.js';

const app = express();
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',').map(origin => origin.trim().replace(/\/$/, '')).filter(Boolean);
app.use(cors({ origin(origin, callback) { if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ''))) return callback(null, true); return callback(new Error('This origin is not allowed to access the API.')); } }));
app.use(express.json({ limit: '1mb' }));
const token = user => jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
const safeUser = user => ({ id: user._id, name: user.name, email: user.email });

app.get('/api/health', (_, res) => res.json({ ok: true }));
app.post('/api/auth/register', async (req, res, next) => { try {
  const { name, email, password } = req.body;
  if (!name || !email || !password || password.length < 6) return res.status(400).json({ message: 'Name, email and a 6+ character password are required.' });
  if (await User.exists({ email: email.toLowerCase() })) return res.status(409).json({ message: 'Email already registered.' });
  const user = await User.create({ name, email, passwordHash: await bcrypt.hash(password, 12) });
  res.status(201).json({ token: token(user), user: safeUser(user) });
} catch (e) { next(e); } });
app.post('/api/auth/login', async (req, res, next) => { try {
  const user = await User.findOne({ email: String(req.body.email || '').toLowerCase() });
  if (!user || !(await bcrypt.compare(req.body.password || '', user.passwordHash))) return res.status(401).json({ message: 'Invalid email or password.' });
  res.json({ token: token(user), user: safeUser(user) });
} catch (e) { next(e); } });
app.get('/api/profile', requireAuth, async (req, res) => res.json(safeUser(await User.findById(req.userId))));
app.patch('/api/profile', requireAuth, async (req, res) => res.json(safeUser(await User.findByIdAndUpdate(req.userId, { name: req.body.name }, { new: true }))));
app.post('/api/assistant', requireAuth, async (req, res, next) => { try {
  const message = String(req.body.message || '').trim();
  if (!message || message.length > 2000) return res.status(400).json({ message: 'Please send a question under 2,000 characters.' });
  const reply = await askAssistant(message, req.body.context || {});
  res.json({ reply });
} catch (e) { next(e); } });
app.get('/api/simulations', requireAuth, async (req, res) => res.json(await Simulation.find({ user: req.userId }).sort({ createdAt: -1 })));
app.post('/api/simulations', requireAuth, async (req, res, next) => { try {
  const { category, answers, title } = req.body;
  if (!category || !answers) return res.status(400).json({ message: 'Category and answers are required.' });
  const result = await runSimulation(category, answers);
  res.status(201).json(await Simulation.create({ user: req.userId, title: title || answers.goal || `${category} simulation`, category, answers, result }));
} catch (e) { next(e); } });
app.patch('/api/simulations/:id', requireAuth, async (req, res) => {
  const updates = {}; if (typeof req.body.favorite === 'boolean') updates.favorite = req.body.favorite; if (req.body.progress) updates.replay = { progress: req.body.progress, updatedAt: new Date() };
  const item = await Simulation.findOneAndUpdate({ _id: req.params.id, user: req.userId }, updates, { new: true });
  if (!item) return res.status(404).json({ message: 'Simulation not found.' }); res.json(item);
});
app.delete('/api/simulations/:id', requireAuth, async (req, res) => { const item = await Simulation.findOneAndDelete({ _id: req.params.id, user: req.userId }); if (!item) return res.status(404).json({ message: 'Simulation not found.' }); res.status(204).end(); });
app.use((error, _, res, __) => {
  console.error(error);
  const message = error instanceof Error ? error.message : 'Unexpected server error.';
  res.status(error.status || 500).json({ message });
});
const requiredEnvironment = ['MONGODB_URI', 'JWT_SECRET'];
const missingEnvironment = requiredEnvironment.filter(key => !process.env[key]);
if (missingEnvironment.length) { console.error(`Missing required environment variables: ${missingEnvironment.join(', ')}`); process.exit(1); }
mongoose.connect(process.env.MONGODB_URI).then(() => app.listen(process.env.PORT || 5000, '0.0.0.0', () => console.log('FutureSim API running'))).catch(error => { console.error('MongoDB connection failed:', error.message); process.exit(1); });
