// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const blogRoutes = require('./routes/blog');
const quotesRoutes = require('./routes/quotes');

const app = express();

// === CORS middleware ===
// Must be **before routes**
app.use(cors({
  origin: 'https://blog-web-seven-kappa.vercel.app', // your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON bodies
app.use(express.json());

// === Routes ===
app.use('/api/blogs', blogRoutes);
app.use('/api/quotes', quotesRoutes);

// Health check
app.get('/', (req, res) => res.send('Backend is running 🚀'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
