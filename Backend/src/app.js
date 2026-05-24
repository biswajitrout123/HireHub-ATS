import express from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/auth.routes.js';
import jobRoutes from './modules/jobs/job.routes.js';
import applicationRoutes from './modules/applications/application.routes.js';

const app = express();

// 🌟 NEW: Strict CORS Configuration for Production
app.use(cors({
  origin: [
    'http://localhost:5173', // Allows you to keep testing locally
    'https://hire-hub-ats.vercel.app' // Allows your live Vercel site
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Smart Job Portal API is running smoothly! 🚀' });
});

export default app;