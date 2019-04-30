const express = require('express');
// const mongoose = require("mongoose");

// Instanciando o objeto Router
const router = express.Router();

// @Route   GET api/users/test
// @desc    Rota para testar endpoint "users"
// @access  Public
router.get('/test', (req, res) => {
  res.send('Hello from /api/users/test');
});

module.exports = router;
