const userRouter = require('./users/router');

module.exports = (app) => {
  app.use('/api/users', userRouter);
};
