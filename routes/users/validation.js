// Importando módulos necessários
// const Validator = require("validator");
const isEmpty = require('validator/lib/isEmpty');
const isEquals = require('validator/lib/equals');
const isLength = require('validator/lib/isLength');
const isEmail = require('validator/lib/isEmail');

exports.validateRegisterInput = (data) => {
  // Criando objeto para conter os errors
  const errors = {};

  // Se o campo é vazio
  if (isEmpty(data.name)) {
    errors.name = 'Campo name não pode ser vazio';
  }

  // Se o nome está entre 2 e 30 caracteres
  if (!isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'O campo name deve conter um nome entre 2 e 30 caracteres';
  }

  // Se o campo é vazio
  if (isEmpty(data.email)) {
    errors.email = 'Campo email não pode ser vazio';
  }

  // Se é um email válido
  if (!isEmail(data.email)) {
    errors.email = 'O campo email deve conter um email válido';
  }

  // Se o campo é vazio
  if (isEmpty(data.password)) {
    errors.password = 'Campo senha não pode ser vazio';
  }

  // Se a senha está entre 4 e 30 caracteres
  if (!isLength(data.password, { min: 4, max: 30 })) {
    errors.password = 'A senha deve conter entre 4 e 30 caracteres';
  }

  // Se as senhas são iguais
  if (!isEquals(data.password, data.password2)) {
    errors.password2 = 'As senhas devem ser iguais';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
