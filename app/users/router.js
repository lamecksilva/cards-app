// Importando router
const router = require('express').Router();

// Importando controller das rotas de usuário
const controller = require('./controller');

// Use o apidoc para gerar a documentação das rotas da API
// gere documentação com: apidoc -i app/ -o apidoc/

/**
 *    @apiGroup User
 *    @api {get} api/users Retornar usuários
 *    @apiExample {response} Response (exemplo):
 *      {
 *        "success": true,
 *        "users": [
 *          {
 *            "cards": [],
 *            "_id": "5cdb681d6863130046c90669",
 *            "name": "Lameck Sandro",
 *            "email": "lameck@lsdev.com",
 *            "date": "2019-05-15T01:15:09.473Z",
 *            "__v": 0
 *          },
 *          {
 *            "cards": [],
 *            "_id": "5cdb687707624a005318e921",
 *            "name": "Lameck Sanders",
 *            "email": "lamecksanders@lsdev.com",
 *            "date": "2019-05-15T01:16:39.060Z",
 *            "__v": 0
 *          }
 *        ]
 *      }
 *
 */
router.get('/', controller.getUsers);

/**
 *    @apiGroup User
 *    @api {post} api/users/register Adicionar usuário
 *    @apiParam {String} name Nome do perfil (Required)
 *    @apiParam {String} email Email do novo usuário (Required)
 *    @apiParam {String} password Senha da conta (Required)
 *    @apiParam {String} password2 Confirmação da senha (Required)
 *    @apiExample {request} Request Body (exemplo):
 *      {
 *        "name": "John Doe",
 *        "email": "johndoe@lsdev.com",
 *        "password": "123456",
 *        "password2": "123456"
 *      }
 *    @apiExample {response} Response (exemplo):
 *      {
 *        "success": true,
 *        "user": {
 *          "cards": [],
 *          "_id": "5ce9e7708c507e001f926ab9",
 *          "name": "John Doe",
 *          "email": "johndoe@lsdev.com",
 *          "password": "$2a$10$CUd0fZv68NsoezxI6IBSU.8voeDBGnab0JFZb4qbmCsuz1f9cHxA.",
 *          "date": "2019-05-26T01:10:08.065Z",
 *          "__v": 0
 *        }
 *      }
 *
 */
router.post('/register', controller.register);

/**
 *  @apiGroup User
 *  @api {get} api/users/:id Retornar um usuário
 *  @apiParam {String} ID do usuário
 *  @apiExample {request} Request URL (exemplo):
 *    /api/users/5cd41cd3f56d1f04647d66b7
 *  @apiExample {response} Response (exemplo):
 *    {
 *      "success": true,
 *      "user": {
 *        "cards": [],
 *        "_id": "5cd41cd3f56d1f04647d66b7",
 *        "name": "Example",
 *        "email": "example2@example.com",
 *        "password": "123456",
 *        "date": "2019-05-09T12:28:03.286Z",
 *        "__v": 0
 *      }
 *    }
 *
 */
router.get('/:id', controller.getUser);

/**
 *  @apiGroup User
 *  @api {delete} api/users/:id Remover um usuário
 *  @apiParam {String} ID do usuário
 *  @apiExample {request} Request URL (exemplo):
 *    /api/users/5cdb681d6863130046c90669
 *  @apiExample {response} Response (exemplo):
 *  {
 *    "success": true,
 *    "user": {
 *      "cards": [],
 *      "_id": "5cdb681d6863130046c90669",
 *      "name": "Lameck Sandro",
 *      "email": "lameck@lsdev.com",
 *      "password": "$2a$17$5Ng3XxA3oRbEqeNXWIniluSwYst871lPs7AqiXI9ongOSeGG8gIvC",
 *      "date": "2019-05-15T01:15:09.473Z",
 *      "__v": 0
 *    }
 *  }
 */
router.delete('/:id', controller.deleteUser);

// Exportando rotas
module.exports = router;
