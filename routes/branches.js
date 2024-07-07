const express = require('express');
const router = express.Router();
const Branch = require('../models/Branch');
const Bank = require('../models/Bank');

// Get branches with optional filters and pagination
router.get('/', async (req, res) => {
  try {
    const { ifsc, bank_id, branch, address, city, district, state, page = 1, per_page = 10 } = req.query;
    const where = {};

    if (ifsc) where.ifsc = ifsc;
    if (bank_id) where.bankId = bank_id;
    if (branch) where.branch = branch;
    if (address) where.address = address;
    if (city) where.city = city;
    if (district) where.district = district;
    if (state) where.state = state;

    const { count, rows: branches } = await Branch.findAndCountAll({
      where,
      limit: per_page,
      offset: (page - 1) * per_page,
      include: Bank,
    });

    const totalPages = Math.ceil(count / per_page);

    res.json({
      total_count: count,
      num_pages: totalPages,
      current_page: parseInt(page),
      next: page < totalPages ? parseInt(page) + 1 : null,
      previous: page > 1 ? parseInt(page) - 1 : null,
      results: branches,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new branch
router.post('/', async (req, res) => {
  try {
    const { ifsc, bank_id, branch, address, city, district, state } = req.body;

    if (!ifsc || !bank_id || !branch || !address || !city || !district || !state) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const bank = await Bank.findByPk(bank_id);

    if (!bank) {
      return res.status(404).json({ error: 'Bank with the given id does not exist' });
    }

    const [newBranch, created] = await Branch.findOrCreate({
      where: { ifsc },
      defaults: {
        branch,
        address,
        city,
        district,
        state,
        bankId: bank.id,
      },
    });

    res.status(201).json({ message: 'Branch created successfully', branchId: newBranch.ifsc });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
