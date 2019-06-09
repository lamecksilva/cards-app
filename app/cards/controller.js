const path = require('path');
const fs = require('fs');
const Card = require('./model');
const User = require('../users/model');

const validation = require('./validation');
const logger = require('../../utils/logger');

// =========================================================================================
// Função para cadastrar um novo card
exports.registerCard = (req, res) => {
  // Validando campos do body
  console.log(req.file)
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

        logger.info(`Salvando imagem ${filename}`);

        // Criando novo card
        new Card({
          title: req.body.title,
          description: req.body.description,
          user: user._doc._id,
          image: filename,
        })
          .save()
          .then((card) => {
            logger.info(`Salvando card ${card._doc._id}`);

            user.cards.push(card);
            user
              .save()
              .then(u => res.status(201).json({ success: true, card }))
              .catch(e => res.status(500).json({ success: false, error: e }));
          })
          .catch(err => res.status(500).json({ success: false, errors: err }));
      });
    });
  } catch (e) {
    logger.error("Erro no 'registerCard' do grupo Cards");
    logger.error(e);

    return res.status(500).json({ success: false, errors: e });
  }
};

// =========================================================================================
// Função para retornar os cards do banco de dados
exports.getCards = (req, res) => {
  try {
    Card.find({}, { __v: 0 })
      .populate({ path: 'user', select: '-password -__v -cards -date' })
      .exec((err, cards) => {
        if (err) throw err;

        logger.info('Retornarndo todos cards');
        return res.status(200).json({ success: true, cards });
      });
  } catch (e) {
    logger.error("Erro no 'getCards' do grupo Cards");
    logger.error(e);

    return res.status(500).json({ success: false, errors: e });
  }
};

// =========================================================================================
// Função para retornar um card
exports.getCard = (req, res) => {
  const { id } = req.params;

  const { isValid, errors } = validation.validateObjectID(id);

  if (!isValid) {
    return res.status(400).json({ success: false, errors });
  }

  try {
    Card.findOne({ _id: id }, { __v: 0 })
      .populate({ path: 'user', select: '-password -__v -cards -date' })
      .exec((err, card) => {
        if (err) throw err;

        logger.info(`Retornando card id: ${card._doc._id}`);

        return res.status(200).json({ success: true, card });
      });
  } catch (e) {
    logger.error("Erro no 'getCard' do grupo Cards");
    logger.error(e);

    return res.status(500).json({ success: false, errors: e });
  }
};

// =========================================================================================
// Função para editar os cards
exports.editCard = (req, res) => {
  const { id } = req.params;

  const { isValid, errors } = validation.validateUpdateInput(req.body);

  if (!isValid) {
    return res.status(400).json({ success: false, errors });
  }

  try {
    // Procurando pelo registro do id e setando os novos dados
    Card.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true }, (err, card) => {
      if (err) throw err;

      if (!card) {
        return res.status(404).json({ success: false, errors: { id: 'Sem cards para este ID' } });
      }

      logger.info(`Atualizando card ${card._doc._id}`);

      return res.status(200).json({ success: true, card });
    });
  } catch (e) {
    logger.error("Erro no 'editCard' do grupo Cards");
    logger.error(e);

    return res.status(500).json({ success: false, errors: e });
  }
};

// =========================================================================================
// Função para atualizar imagem de um card
exports.updateImage = (req, res) => {
  const { id } = req.params;

  const { isValid, errors } = validation.validateImageInput(req.file.mimetype);

  if (!isValid) {
    return res.status(400).json({ success: false, errors });
  }

  try {
    // Procurando um documento com o id passado
    Card.findOne({ _id: id }, (err, card) => {
      if (err) throw err;

      if (!card) {
        return res.status(404).json({ success: false, errors: { id: 'Sem cards para este ID' } });
      }

      // Criando novo nome do arquivo
      const filename = `images/${Date.now()}-${card._doc.user}${path.extname(
        req.file.originalname,
      )}`;

      // Função assincrona para remover arquivo
      fs.unlink(card.image, (err) => {
        if (err) throw err;

        // Criando novo arquivo
        fs.writeFile(filename, req.file.buffer, (error) => {
          if (error) throw error;

          logger.info(`Atualizando imagem ${filename}`);

          // Setando o novo filename
          card.image = filename;

          // Salvando o documento
          card
            .save()
            .then(c => res.status(200).json({ success: true, c }))
            .catch(error => res.status(500).json({ success: false, errors: error }));
        });
      });
    });
  } catch (e) {
    logger.error("Erro no 'editCard' do grupo Cards");
    logger.error(e);

    return res.status(500).json({ success: false, errors: e });
  }
};

// =========================================================================================
// Função para excluir um card
exports.deleteCard = (req, res) => {
  const { id } = req.params;

  const { errors, isValid } = validation.validateObjectID(id);

  if (!isValid) {
    return res.status(400).json({ success: false, errors });
  }

  try {
    Card.findOneAndDelete({ _id: id }, (err, card) => {
      if (err) throw err;

      if (!card) {
        return res.status(404).json({ success: false, errors: { id: 'Sem cards para este ID' } });
      }

      User.findOne({ _id: card.user }, (e, user) => {
        if (e) throw e;

        const index = user.cards.indexOf(card._doc._id);

        index !== 1 && user.cards.splice(index, 1);

        user
          .save()
          .then(c => res.status(200).json({ success: true, card }))
          .catch(error => res.status(400).json({ success: false, errors: error }));
      });
    });
  } catch (e) {
    logger.error("Erro no 'deleteCard' do grupo Cards");
    logger.error(e);

    return res.status(500).json({ success: false, errors: e });
  }
};
