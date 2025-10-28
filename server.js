const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const blogRoutes = require('./routes/blog');
const quotesRoutes = require('./routes/quotes');

const app = express();

// Middleware
app.use(cors()); // Allow all origins (for testing)
app.use(express.json()); // Parse JSON requests

// Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/quotes', quotesRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
