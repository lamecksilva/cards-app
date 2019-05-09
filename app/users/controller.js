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

      // Salvando novo usuário no banco de dados
      const savedUser = await new User(req.body).save();
      console.log(savedUser);

      // Retornando "Created", com os dados do banco de dados
      return res.status(201).json({ success: true, user: savedUser });
    });
  } catch (err) {
    // Retornando "internal server error"
    return res.status(500).json({ success: false, errors: err });
  }
};
