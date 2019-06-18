// Importando as rotas de usuário
const userRouter = require('./users/router');
const cardRouter = require('./cards/router');

module.exports = (app) => {
  // "Aplicando" os middlewares das rotas ao endpoint /api/users
  app.use('/api/users', userRouter);
  app.use('/api/cards', cardRouter);
};
