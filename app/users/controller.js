// Importando bcrypt
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Importando Model de user e validação de campos
const User = require('./model');
const validation = require('./validation');

const logger = require('../../utils/logger');
const config = require('../../config');

// =========================================================================================
// Função para retornar todos usuários cadastrados
exports.getUsers = (req, res) => {
  try {
    // "Querying" os usuários do banco de dados
    User.find({}, { password: 0, __v: 0 })
      .populate({ path: 'cards', select: '-__v' })
      .exec((err, users) => {
        // Se dê algum problema, cairá no catch
        if (err) throw err;

        logger.info('Retornando todos usuários');

        // Retornando todos usuários
        return res.status(200).json({ success: true, users });
      });
  } catch (err) {
    logger.error('Erro no getUsers do grupo Users');
    logger.error(err);

    return res.status(500).json({ success: false, errors: err });
  }
};

// =========================================================================================
// Função para cadastro de novo usuário no banco
exports.register = (req, res) => {
  const { errors, isValid } = validation.validateRegisterInput(req.body);

  if (!isValid) {
    // Caso os campos não sejam válidos, retorna uma bad request e os erros
    return res.status(400).json({ success: false, errors });
  }

  try {
    // Query para checar se o email é válido
    User.findOne({ email: req.body.email }, async (err, user) => {
      // Caso dê erro, cai no catch
      if (err) throw err;

      // Caso exista um usuário já cadastrado com o email enviado, retorna um erro
      if (user) {
        return res.status(400).json({ success: false, errors: { email: 'Email já cadastrado' } });
      }

      const newUser = { name: req.body.name, email: req.body.email };

      // Fazendo hash de senha
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;

        bcrypt.hash(req.body.password, salt, (error, hash) => {
          if (error) throw error;

          newUser.password = hash;
          // Salvando novo usuário no banco de dados
          new User(newUser)
            .save()
            .then((user) => {
              logger.info(`User ${user._doc._id} cadastrado`);
              res.status(201).json({ success: true, user });
            })
            .catch(e => res.status(500).json({ success: false, errors: e }));
        });
      });

      // Retornando "Created", com os dados do banco de dados
    });
  } catch (err) {
    logger.error('Erro no register do grupo Users');
    logger.error(err);
    // Retornando "internal server error"
    return res.status(500).json({ success: false, errors: err });
  }
};

// =========================================================================================
// Função para retornar dados de um usuário
exports.getUser = (req, res) => {
  const { id } = req.params;

  const { isValid, errors } = validation.validateObjectID(id);

  if (!isValid) {
    return res.status(400).json({ success: false, errors });
  }

  try {
    User.findOne({ _id: id }, { password: 0 }, async (err, user) => {
      if (err) throw err;

      if (!user) {
        return res
          .status(404)
          .json({ success: false, errors: { id: 'Sem usuários para este id' } });
      }

      logger.info(`Retornando usuário ${user._doc._id}`);
      return res.status(200).json({ success: true, user });
    });
  } catch (err) {
    logger.error('Erro no getUser do grupo Users');
    logger.error(err);

    return res.status(500).json({ success: false, errors: err });
  }
};

// =========================================================================================
// Função para atualizar dados de um usuário
exports.updateUser = (req, res) => {
  const { id } = req.params;

  const { isValid, errors } = validation.validateUpdateInput(id, req.body);

  if (!isValid) {
    return res.status(400).json({ success: false, errors });
  }

  try {
    User.findOneAndUpdate(
      { _id: id },
      {
        $set: req.body,
      },
      { new: true },
      (err, user) => {
        if (err) throw err;

        if (!user) {
          return res
            .status(404)
            .json({ success: false, errors: { id: 'Sem usuários para este id' } });
        }

        logger.info(`Atualizando dados do user ${user._doc._id}`);
        return res.status(200).json({ success: true, user });
      },
    );
  } catch (err) {
    logger.error("Erro no 'updateUser' do grupo Users");
    logger.error(err);

    return res.status(500).json({ success: false, errors: err });
  }
};

// =========================================================================================
// Função para troca de senha
exports.updatePassword = (req, res) => {
  const { id } = req.params;

  const { isValid, errors } = validation.validatePassword(id, req.body);

  if (!isValid) {
    return res.status(400).json({ success: false, errors });
  }

  try {
    User.findOne({ _id: id }, async (err, user) => {
      if (err) throw err;

      if (!user) {
        return res
          .status(404)
          .json({ success: false, errors: { id: 'Sem usuários para este id' } });
      }

      // Fazendo hash de senha
      await bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;

        bcrypt.hash(req.body.password, salt, async (error, hash) => {
          if (error) throw error;

          user.password = await hash;
          // Salvando novo usuário no banco de dados
          user
            .save()
            .then((userUpdated) => {
              logger.info(`Senha do usuário ${userUpdated._doc._id} alterada`);
              res.status(201).json({ success: true, user: userUpdated });
            })
            .catch(e => res.status(500).json({ success: false, errors: e }));
        });
      });
    });
  } catch (err) {
    logger.error("Erro no 'updatePassword' do grupo users");
    logger.error(err);

    return res.status(500).json({ success: false, errors: err });
  }
};

// =========================================================================================
// Função para deletar um usuário do banco de dados
exports.deleteUser = (req, res) => {
  const { id } = req.params;

  const { isValid, errors } = validation.validateObjectID(id);

  if (!isValid) {
    return res.status(400).json({ success: false, errors });
  }

  try {
    User.findByIdAndDelete({ _id: id }, async (err, user) => {
      if (err) throw err;

      if (!user) {
        return res
          .status(404)
          .json({ success: false, errors: { id: 'Sem usuários para este id' } });
      }

      logger.info(`Usuário ${user._doc._id} deletado`);
      return res.status(200).json({ success: true, user });
    });
  } catch (err) {
    logger.error("Erro no 'deleteUser' do grupo users");
    logger.error(err);

    return res.status(500).json({ success: false, errors: err });
  }
};

// =========================================================================================
// Função para logar um usuário
exports.loginUser = (req, res) => {
  const { errors, isValid } = validation.validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json({ success: false, errors });
  }

  try {
    User.findOne({ email: req.body.email }, async (err, user) => {
      if (err) throw err;

      if (!user) {
        errors.email = 'Usuário não encontrado';

        return res.status(404).json({ success: false, errors });
      }

      bcrypt.compare(req.body.password, user.password, (error, isMatch) => {
        if (error) throw error;

        if (isMatch) {
          const payload = {
            _id: user._id,
            name: user.name,
            email: user.email,
          };

          jwt.sign(payload, config.secret, (e, token) => {
            if (e) throw e;

            logger.info(`Usuário ${user._doc._id} logado`);
            return res.status(200).json({ success: true, token: `Bearer ${token}` });
          });
        } else {
          errors.password = 'Senha incorreta';
          return res.status(400).json({ success: false, errors });
        }
      });
    });
  } catch (e) {
    logger.error("Erro no 'loginUser' do grupo Users");
    logger.error(e);

    return res.status(500).json({ success: false, errors: e });
  }
};
