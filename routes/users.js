const express = require('express');
// const mongoose = require("mongoose");

const validateCadastroInput = require('../validation/cadastro');

// Instanciando o objeto Router
const router = express.Router();

// @Route   GET api/users/test
// @desc    Rota para testar endpoint "users"
// @access  Public
router.get('/test', (req, res) => {
  res.send('Hello from /api/users/test');
});

// @Route   POST api/users/cadastro
// @desc    Rota para cadastrar novos usuários no banco de dados
// @access  Public
router.post('/cadastro', (req, res) => {
  const { errors, isValid } = validateCadastroInput(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  }
});

module.exports = router;
