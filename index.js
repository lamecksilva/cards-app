const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

// Instanciando o objeto express
const app = express();

// Middleware para 'parsing' do body
app.use(bodyParser.json());

const config = require('./config');

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

// Aplicando middlewares do passport
app.use(passport.initialize());
require('./utils/passport')(passport);

// Aplicando middleware para rotas, controllers e etc.
require('./app')(app);

// Declarando a porta
const PORT = config.PORT || 9000;

// "Listening" o servidor na porta
app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`));
