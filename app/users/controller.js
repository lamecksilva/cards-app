// Importando bcrypt
const bcrypt = require('bcryptjs');

// Importando Model de user e validação de campos
const User = require('./model');
const validation = require('./validation');

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
          if (error) throw err;

          newUser.password = hash;
          // Salvando novo usuário no banco de dados
          const savedUser = new User(newUser)
            .save()
            .then(user => res.status(201).json({ success: true, user }));
          console.log(savedUser);
        });
      });

      // Retornando "Created", com os dados do banco de dados
    });
  } catch (err) {
    // Retornando "internal server error"
    return res.status(500).json({ success: false, errors: err });
  }
};
