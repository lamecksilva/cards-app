const multer = require('multer');
const path = require('path');

const upload = multer();
const router = require('express').Router();

const controller = require('./controller');

/**
 *  @apiGroup Card
 *  @api  {get} api/cards Retorna cards
 *  @apiExample {response} Response (exemplo)
 *    {
 *      "success": true,
 *      "users": [
 *        {
 *          "cards": [],
 *          "_id": "5cd40e2389eef5018f5aa8fe",
 *          "name": "Example",
 *          "email": "example@example.com",
 *          "date": "2019-05-09T11:25:23.347Z",
 *          "__v": 0
 *        },
 *      ]
 *    }
 *
 */
router.get('/', controller.getCards);

/**
 *  @apiGroup Card
 *  @api  {post} api/cards/register Adicionar Card
 *  @apiParam {String} title Título do Card (Required)
 *  @apiParam {String} description Descrição do card (Optional)
 *  @apiParam {String} user ObjectId do Usuário autor do card
 *  @apiParam {File} image Imagem do card
 *  @apiExample {request} Request Multipart Form Data (exemplo)
 *    {
 *      "image": "file here",
 *      "title": "Title Example",
 *      "description": "Description for example to this card",
 *      "user": "5cd40e2389eef5018f5aa8fe"
 *    }
 *  @apiExample {response} Response (exemplo)
 *    {
 *      "success": true,
 *      "card": {
 *        "_id": "5cf2f1689118660149af9002",
 *        "title": "Title Example",
 *        "description": "Description for example to this card",
 *        "user": "5cd40e2389eef5018f5aa8fe",
 *        "image": "images/1559425384954-5cd40e2389eef5018f5aa8fe.jpg",
 *        "__v": 0
 *      }
 *    }
 */
router.post('/register', upload.single('image'), controller.registerCard);

router.patch('/update/:id', controller.editCard);

router.put('/update-image/:id', upload.single('image'), controller.updateImage);

module.exports = router;
