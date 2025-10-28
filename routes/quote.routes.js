const express = require('express');
const router = express.Router();
const getConnection = require('../db'); // Import shared DB connection

// Get all quotes
router.get('/', async (req, res) => {
  try {
    const db = await getConnection();
    const [rows] = await db.query('SELECT * FROM quotes ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add a new quote
router.post('/', async (req, res) => {
  const { text, author } = req.body;
  if (!text || !author) return res.status(400).json({ message: 'Text and author required' });

  try {
    const db = await getConnection();
    const [result] = await db.query('INSERT INTO quotes (text, author) VALUES (?, ?)', [text, author]);
    res.json({ id: result.insertId, text, author });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a quote
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const db = await getConnection();
    const [result] = await db.query('DELETE FROM quotes WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Quote not found' });
    res.json({ message: 'Quote deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
