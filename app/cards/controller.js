const path = require('path');
const fs = require('fs');
const Card = require('./model');
const User = require('../users/model');

const validation = require('./validation');

exports.registerCard = (req, res) => {
  // Validando campos do body
  const { isValid, errors } = validation.validateRegisterInput(req.body, req.file.mimetype);

  if (!isValid) {
    return res.status(400).json({ success: false, errors });
  }

  try {
    // Buscando usuário pelo id
    User.findOne({ _id: req.body.user }, (err, user) => {
      // Criando nome do novo arquivo com base no timestamp e na extensão original do arquivo
      const filename = `images/${Date.now()}-${user._doc._id}${path.extname(
        req.file.originalname,
      )}`;

      if (err) throw err;

      if (!user) {
        return res.status(404).json({ success: false, errors: { user: 'Usuário não encontrado' } });
      }

      // Criando o arquivo no file system
      fs.writeFile(filename, req.file.buffer, (error) => {
        if (error) throw error;

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
  } catch (e) {
    return res.status(500).json({ success: false, errors: e });
  }
};

// Função para retornar os cards do banco de dados
exports.getCards = (req, res) => {
  try {
    Card.find({}, (err, cards) => {
      if (err) throw err;

      return res.status(200).json({ success: true, cards });
    });
  } catch (e) {
    return res.status(500).json({ success: false, errors: e });
  }
};

// Função para editar os cards
exports.editCard = (req, res) => {
  const { id } = req.params;

  const { isValid, errors } = validation.validateUpdateInput(req.body);

  if (!isValid) {
    return res.status(400).json({ success: false, errors });
  }

  try {
    Card.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true }, (err, card) => {
      if (err) throw err;

      if (!card) {
        return res.status(404).json({ success: false, errors: { id: 'Sem cards para este ID' } });
      }

      return res.status(200).json({ success: true, card });
    });
  } catch (e) {
    return res.status(500).json({ success: false, errors: e });
  }
};

exports.updateImage = (req, res) => {
  const { id } = req.params;

  const { isValid, errors } = validation.validateImageInput(req.file.mimetype);

  if (!isValid) {
    return res.status(400).json({ success: false, errors });
  }

  try {
    Card.findOne({ _id: id }, (err, card) => {
      if (err) throw err;

      if (!card) {
        return res.status(404).json({ success: false, errors: { id: 'Sem cards para este ID' } });
      }

      const filename = `images/${Date.now()}-${card._doc.user}${path.extname(
        req.file.originalname,
      )}`;

      fs.unlink(card.image, (err) => {
        if (err) throw err;

        fs.writeFile(filename, req.file.buffer, (error) => {
          if (error) throw error;

          card.image = filename;

          card
            .save()
            .then(c => res.status(200).json({ success: true, c }))
            .catch(error => res.status(500).json({ success: false, errors: error }));
        });
      });
    });
  } catch (e) {
    return res.status(500).json({ success: false, errors: e });
  }
};
