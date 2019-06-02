const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const config = require('./config');

// Instanciando o objeto express
const app = express();

// Conectando o mongodb a nossa aplicacao
setTimeout(
  () => mongoose
    .connect(config.mongoURI, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err)),
  2000,
);

app.use(bodyParser.json());
app.use('/images', express.static('images'));
app.use(passport.initialize());

// Aplicando middlewares do passport para autenticacao de rotas
require('./utils/passport')(passport);

// Aplicando middleware para rotas, controllers e etc.
require('./app')(app);

// Declarando porta
const PORT = config.port || 9000;

// "Listening" o servidor na porta
app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`));
