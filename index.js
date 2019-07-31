const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

const config = require('./config');
const logger = require('./utils/logger');

// Instanciando o objeto express
const app = express();

app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(bodyParser.json());
app.use('/api/images', express.static('images'));
app.use('/log', express.static('log'));
app.use(passport.initialize());

// Conectando o mongodb a nossa aplicacao
setTimeout(
  () => mongoose
    .connect(config.mongoURI, { useNewUrlParser: true })
    .then(() => logger.info('MongoDB Connected'))
    .catch(err => logger.error(err)),
  2000,
);

// Aplicando middlewares do passport para autenticacao de rotas
require('./utils/passport')(passport);

// Aplicando middleware para rotas, controllers e etc.
require('./app')(app);

app.use(express.static('client/dist'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

// Declarando porta
const PORT = config.port || 9000;

// "Listening" o servidor na porta
app.listen(PORT, () => logger.info(`Server Running on port: ${PORT}`));
