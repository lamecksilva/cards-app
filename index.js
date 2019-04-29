const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Instanciando o objeto express
const app = express();

// Middleware para 'parsing' do body
app.use(bodyParser.json());

// Endpoint "/" do servidor
app.get('/', (req, res) => {
  res.json({ msg: 'Success' });
});

// Conectando o mongodb a nossa aplicacao
mongoose
  .connect('mongodb://db:27017/cards-app', { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Declarando a porta
const PORT = process.env.PORT || 9000;

// "Listening" o servidor na porta
app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`));
