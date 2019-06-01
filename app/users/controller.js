// Importando bcrypt
const bcrypt = require('bcryptjs');

// Importando Model de user e validação de campos
const User = require('./model');
const validation = require('./validation');

// =========================================================================================
// Função para retornar todos usuários cadastrados
exports.getUsers = (req, res) => {
  try {
    // "Querying" os usuários do banco de dados
    User.find({}, { password: 0 })
      .populate('card')
      .exec((err, users) => {
        // Se dê algum problema, cairá no catch
        if (err) throw err;

        // Retornando todos usuários
        return res.status(200).json({ success: true, users });
      });
  } catch (err) {
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
          new User(newUser).save().then(user => res.status(201).json({ success: true, user }));
        });
      });

      // Retornando "Created", com os dados do banco de dados
    });
  } catch (err) {
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

      return res.status(200).json({ success: true, user });
    });
  } catch (err) {
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

        return res.status(200).json({ success: true, user });
      },
    );
  } catch (err) {
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
            .then(userUpdated => res.status(201).json({ success: true, user: userUpdated }));
        });
      });
    });
  } catch (err) {
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

      return res.status(200).json({ success: true, user });
    });
  } catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
};
