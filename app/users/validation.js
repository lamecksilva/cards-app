// Importando módulos necessários
// const Validator = require("validator");
const isEquals = require('validator/lib/equals');
const isLength = require('validator/lib/isLength');
const isEmail = require('validator/lib/isEmail');
const isEmpty = require('../../utils/is-empty');

exports.validateRegisterInput = (data) => {
  // Criando objeto para conter os errors
  const errors = {};

  // Caso não exista nada no req.body, gera um erro pois os valores são undefined,
  // Para resolver isso, usamos essas condicionais, para transformar os undefined em
  // strings vazias
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  // Se o nome está entre 2 e 30 caracteres
  if (!isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'O campo name deve conter um nome entre 2 e 30 caracteres';
  }

  // Se é um email válido
  if (!isEmail(data.email)) {
    errors.email = 'O campo email deve conter um email válido';
  }

  // Se a senha está entre 4 e 30 caracteres
  if (!isLength(data.password, { min: 4, max: 30 })) {
    errors.password = 'A senha deve conter entre 4 e 30 caracteres';
  }

  // Se as senhas são iguais
  if (!isEquals(data.password, data.password2)) {
    errors.password2 = 'As senhas devem ser iguais';
  }

  // Se o campo é vazio
  if (isEmpty(data.name)) {
    errors.name = 'Campo name não pode ser vazio';
  }

  // Se o campo é vazio
  if (isEmpty(data.email)) {
    errors.email = 'Campo email não pode ser vazio';
  }

  // Se o campo é vazio
  if (isEmpty(data.password)) {
    errors.password = 'Campo senha não pode ser vazio';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};