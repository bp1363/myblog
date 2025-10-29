const express = require('express');
const cors = require('cors');
require('dotenv').config();

const blogRoutes = require('./routes/blog');
const quotesRoutes = require('./routes/quotes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
const cors = require('cors');

app.use(cors({
  origin: '*' // allow all domains
}));


// Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/quotes', quotesRoutes);

// Health check
app.get('/', (req, res) => res.send('Backend is running 🚀'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
