const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('../app/users/model');
const { secret } = require('../config');

const opts = {};

// Extrai o jwt do Bearer token, contido no header "Authorization"
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

// Chave secreta de autenticação
opts.secretOrKey = secret;

module.exports = (passport) => {
  // Middleware para checar se o usuário existe no banco de dados
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      // Procurando o usuário pelo _id
      User.findById(jwt_payload._id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err)); // catch err
    }),
  );
};

console.log(require('../config'));
