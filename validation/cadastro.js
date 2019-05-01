const isEmail = require('validator/lib/isEmail');

const isEmpty = require('./is-empty');

// Módulo para "validar" os dados para cadastro de usuario
const validateCadastroInput = (data) => {
  const errors = {};

  if (isEmpty(data.name)) {
    errors.name = 'O campo name não pode ser vazio';
  }

  if (data.name.length < 2 || data.name.length > 30) {
    errors.name = 'O campo name deve conter um valor entre 2 e 30 caracteres';
  }

  if (!isEmail(data.email)) {
    errors.email = 'O campo email deve conter um email válido';
  }

  if (isEmpty(data.password)) {
    errors.password = 'O campo password não pode ser vazio';
  }

  if (data.password.length < 2 || data.password.length > 30) {
    errors.password = 'O campo senha deve conter entre 2 e 30 caracteres';
  }

  if (data.password !== data.password2) {
    errors.password2 = 'As senhas devem ser iguais';
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

module.exports = validateCadastroInput;
