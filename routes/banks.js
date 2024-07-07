const express = require('express');
const router = express.Router();
const Bank = require('../models/Bank');

// Get all banks
router.get('/', async (req, res) => {
  try {
    const banks = await Bank.findAll();
    res.json(banks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new bank
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const [bank, created] = await Bank.findOrCreate({ where: { name } });
    res.status(201).json({ message: 'Bank created successfully', bankId: bank.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
