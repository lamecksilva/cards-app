const path = require('path');
const fs = require('fs');
const Card = require('./model');
const User = require('../users/model');

const validation = require('./validation');

exports.registerCard = (req, res) => {
  // Validando campos do body
  const { isValid, errors } = validation.validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json({ success: false, errors });
  }

  try {
    // Buscando usuário pelo id
    User.findOne({ _id: req.body.user }, (err, user) => {
      // Criando nome do novo arquivo com base no timestamp e na extensão original do arquivo
      const filename = `images/${Date.now()}${path.extname(req.file.originalname)}`;

      if (err) throw err;

      if (!user) {
        return res.status(404).json({ success: false, errors: { user: 'Usuário não encontrado' } });
      }

      // Criando o arquivo no file system
      fs.writeFile(filename, req.file.buffer, (error) => {
        if (error) {
          throw error;
        }

        // Criando novo card
        new Card({
          title: req.body.title,
          description: req.body.description,
          user: user._doc._id,
          image: filename,
        })
          .save()
          .then(card => res.status(201).json({ success: true, card }))
          .catch(err => res.status(500).json({ success: false, errors: err }));
      });
    });
  } catch (err) {
    return res.status(500).json({ success: false, errors: err });
  }
};
