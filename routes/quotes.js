// routes/quotes.js
const express = require('express');
const router = express.Router();
const getConnection = require('../db');

// Get all quotes
router.get('/', async (req, res) => {
  try {
    const db = await getConnection();
    const [rows] = await db.query('SELECT * FROM quotes');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error', error: err });
  }
});

// Add new quote
router.post('/', async (req, res) => {
  const { text, author } = req.body;
  if (!text || !author) return res.status(400).json({ message: 'Missing text or author' });

  try {
    const db = await getConnection();
    const [result] = await db.query('INSERT INTO quotes (text, author) VALUES (?, ?)', [text, author]);
    res.status(201).json({ id: result.insertId, text, author });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database insert error', error: err });
  }
});

module.exports = router;
