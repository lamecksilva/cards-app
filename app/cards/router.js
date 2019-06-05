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

/**
 *  @apiGroup Card
 *  @api {patch} api/cards/update/:id Atualizar card
 *  @apiParam {String} id ObjectId do card (Required)
 *  @apiParam {String} title Título do Card (Required)
 *  @apiParam {String} description Descrição do card (Optional)
 *  @apiParam {String} user ObjectId do Usuário autor do card
 *  @apiExample {request} Request Body (exemplo)
 *    /api/update/5cf2f1689118660149af9002
 *    {
 *      "title": "Title Update",
 *      "description": "Update description here"
 *    }
 *  @apiExample {response} Response (exemplo)
 *    {
 *      "success": true,
 *      "card": {
 *        "_id": "5cf2f1689118660149af9002",
 *        "title": "Title Update",
 *        "description": "Update description here",
 *        "user": "5cd40e2389eef5018f5aa8fe",
 *        "image": "images/1559425384954-5cd40e2389eef5018f5aa8fe.jpg",
 *        "__v": 0
 *      }
 *    }
 */
router.patch('/update/:id', controller.editCard);

/**
 *  @apiGroup Card
 *  @api {put} api/cards/update-image/:id Atualizar imagem de card
 *  @apiParam {String} id ObjectId do card (Required)
 *  @apiParam {File} image  Imagem do card (Required)
 *  @apiExample {request} Request Multipart Form Data (exemplo)
 *    /api/update-image/5cf2f1689118660149af9002
 *    {
 *      "image": "file here",
 *    }
 *  @apiExample {response} Response (exemplo)
 *    {
 *      "success": true,
 *      "card": {
 *        "_id": "5cf2f1689118660149af9002",
 *        "title": "Title Update",
 *        "description": "Update description here",
 *        "user": "5cd40e2389eef5018f5aa8fe",
 *        "image": "images/1559425384954-5cd40e2389eef5018f5aa8fe.jpg",
 *        "__v": 0
 *      }
 *    }
 */
router.put('/update-image/:id', upload.single('image'), controller.updateImage);

/**
 *  @apiGroup Card
 *  @api {delete} api/cards/:id Remover um card
 *  @apiParam {String} id ObjectId do card (Required)
 *  @apiExample {request} Request (exemplo)
 *    /api/cards/5cf71766d72e130011ecaab4
 *  @apiExample {response} Response (exemplo)
 *  {
 *   "success": true,
 *   "card": {
 *       "cards": [
 *           "5cf2fe31a872db00113ad620",
 *           "5cf2fec3f2c92b0032a5f044",
 *           "5cf529b4c190c900f864316f",
 *           "5cf52bb5c190c900f8643170",
 *           "5cf52dffc190c900f8643171",
 *           "5cf716e3d72e130011ecaab2",
 *           "5cf7171dd72e130011ecaab3"
 *       ],
 *       "_id": "5cf2fde9a872db00113ad61f",
 *       "name": "Lameck Sanders",
 *       "email": "lameck@lsdev.com",
 *       "password": "$2a$10$WGmmfxN1.DyJrAvkxhnhaeqZGdAZ3GwIufbaEBCxTtmStf5Pmj1su",
 *       "date": "2019-06-01T22:36:25.196Z",
 *       "__v": 9
 *   }
 * }
 */
router.delete('/:id', controller.deleteCard);

module.exports = router;
