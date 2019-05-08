const mongoose = require('mongoose');

const { Schema } = mongoose;

// Criando Schema de usuário
// Schemas são objetos que "mapeiam" uma collection e define a "forma" dos documentos
// em uma collections
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // Setando o nome da collection em que o mongodb irá se conectar
    collection: 'users',
  },
);

// Models são construtores compilados de definições de Schema,
// uma instância de um Model é um documento,
// Models são responsáveis por criar, e ler documentos em um banco de dados MongoDB
module.exports = User = mongoose.model('user', UserSchema);
