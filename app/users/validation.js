// Importando módulos necessários
// const Validator = require("validator");
const isEquals = require('validator/lib/equals');
const isLength = require('validator/lib/isLength');
const isEmail = require('validator/lib/isEmail');
const isEmpty = require('../../utils/is-empty');

const { ObjectId } = require('mongoose').Types;

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

  // Se o campo é vazio
  if (isEmpty(data.password2)) {
    errors.password2 = 'Campo senha não pode ser vazio';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

// Validando se é um Object ID ou não
exports.validateObjectID = (id) => {
  const errors = {};

  // Se o id for vazio, ele é igualado a uma string vazia, para evitar erros com "undefined"
  id = !isEmpty(id) ? id : '';

  if (!ObjectId.isValid(id)) {
    errors.id = 'Não é um ObjectID válido';
  }

  // Se o id é vazio
  if (isEmpty(id)) {
    errors.id = 'O ID não pode ser vazio';
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

// Validando dados de update
exports.validateUpdateInput = (id, data) => {
  const errors = {};

  // Validar Id
  if (!ObjectId.isValid(id)) {
    errors.id = 'Não é um ObjectID válido';
  }
  if (isEmpty(id)) {
    errors.id = 'O ID não pode ser vazio';
  }

  // Se o campo name tem algum valor, checar se está no tamanho correto
  if (!isEmpty(data.name)) {
    if (!isLength(data.name, { min: 2, max: 30 })) {
      errors.name = 'O campo name deve conter um nome entre 2 e 30 caracteres';
    }
  }

  // Se o campo email não for vazio, checar se é email
  if (!isEmpty(data.email)) {
    if (!isEmail(data.email)) {
      errors.email = 'O campo email deve conter um email válido';
    }
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

// Validando senha
exports.validatePassword = (id, data) => {
  const errors = {};

  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  // Validar Id
  if (!ObjectId.isValid(id)) {
    errors.id = 'Não é um ObjectID válido';
  }
  if (isEmpty(id)) {
    errors.id = 'O ID não pode ser vazio';
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
  if (isEmpty(data.password)) {
    errors.password = 'Campo senha não pode ser vazio';
  }

  // Se o campo é vazio
  if (isEmpty(data.password2)) {
    errors.password2 = 'Campo senha não pode ser vazio';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
