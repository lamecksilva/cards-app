const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Instanciando o objeto express
const app = express();

// Middleware para 'parsing' do body
app.use(bodyParser.json());

const config = require('./config');

// Importando middlewares para o endpoint users
// const users = require('./routes/users');

// Aplicando middleware para rotas, controllers e etc.
require('./app')(app);

// Endpoint "/" do servidor
app.get('/', (req, res) => {
  res.json({ msg: 'Success' });
});

// Servindo arquivos estáticos
app.use('/images', express.static('images'));

// Conectando o mongodb a nossa aplicacao
setTimeout(
  () => mongoose
    .connect(config.mongoURI, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err)),
  2000,
);

// Declarando a porta
const PORT = config.PORT || 9000;

// "Listening" o servidor na porta
app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`));
