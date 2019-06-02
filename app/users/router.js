// Importando router
const router = require('express').Router();

const passport = require('passport');

// Importando controller das rotas de usuário
const controller = require('./controller');

// Use o apidoc para gerar a documentação das rotas da API
// gere documentação com: apidoc -i app/ -o apidoc/

/**
 *    @apiGroup User
 *    @api {get} api/users Retornar usuários
 *    @apiExample {response} Response (exemplo)
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
 *    @apiExample {request} Request Body (exemplo)
 *      {
 *        "name": "John Doe",
 *        "email": "johndoe@lsdev.com",
 *        "password": "123456",
 *        "password2": "123456"
 *      }
 *    @apiExample {response} Response (exemplo)
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
 *  @apiParam {String} id ID do usuário
 *  @apiExample {request} Request URL (exemplo)
 *    /api/users/5cd41cd3f56d1f04647d66b7
 *  @apiExample {response} Response (exemplo)
 *    {
 *      "success": true,
 *      "user": {
 *        "cards": [],
 *        "_id": "5cd41cd3f56d1f04647d66b7",
 *        "name": "Example",
 *        "email": "example2@example.com",
 *        "password": "$2a$10$CUd0fZv68NsoezxI6IBSU.8voeDBGnab0JFZb4qbmCsuz1f9cHxA.",
 *        "date": "2019-05-09T12:28:03.286Z",
 *        "__v": 0
 *      }
 *    }
 *
 */
router.get('/:id', controller.getUser);

/**
 *  @apiGroup User
 *  @api {patch} api/users/:id Atualizar dados
 *  @apiParam {String} id ID do usuário
 *  @apiExample {request} Request Body (exemplo)
 *    /api/users/5ce9e7708c507e001f926ab9
 *
 *    {
 *      "name": "Example update"
 *    }
 *  @apiExample {response} Response (exemplo)
 *    {
 *      "success": true,
 *      "user": {
 *        "cards": [],
 *        "_id": "5ce9e7708c507e001f926ab9",
 *        "name": "Example update",
 *        "email": "johndoe@lsdev.com",
 *        "password": "$2a$10$CUd0fZv68NsoezxI6IBSU.8voeDBGnab0JFZb4qbmCsuz1f9cHxA.",
 *        "date": "2019-05-26T01:10:08.065Z",
 *        "__v": 0
 *      }
 *    }
 *
 */
router.patch('/:id', controller.updateUser);

/**
 *  @apiGroup User
 *  @api {patch} api/users/change-password/:id Atualizar senha
 *  @apiParam {String} id ID do usuário
 *  @apiParam {String} password Nova senha
 *  @apiParam {String} password2 Confirmação de senha
 *  @apiExample {request} Request Body (exemplo)
 *    /api/users/change-password/5ce755c37951f8001121add1
 *
 *    {
 *      "password": "123456",
 *      "password2": "123456"
 *    }
 *  @apiExample {response} Response (exemplo)
 *    {
 *      "success": true,
 *      "user": {
 *        "cards": [],
 *        "_id": "5ce755c37951f8001121add1",
 *        "name": "Fábio Rabin",
 *        "email": "fabio@lsdev.com",
 *        "password": "$2a$10$ZK5K.TGYjokfwOXJ.OcxMuQza0DO8DyDbNbFzebsb6IWhc0J/ASAS",
 *        "date": "2019-05-24T02:24:03.674Z",
 *        "__v": 0
 *      }
 *    }
 *
 */
router.patch('/change-password/:id', controller.updatePassword);

/**
 *  @apiGroup User
 *  @api {delete} api/users/:id Remover um usuário
 *  @apiParam {String} id ID do usuário
 *  @apiExample {request} Request URL (exemplo)
 *    /api/users/5cdb681d6863130046c90669
 *  @apiExample {response} Response (exemplo)
 *  {
 *    "success": true,
 *    "user": {
 *      "cards": [],
 *      "_id": "5cdb681d6863130046c90669",
 *      "name": "Lameck Sandro",
 *      "email": "lameck@lsdev.com",
 *      "password": "$2a$10$CUd0fZv68NsoezxI6IBSU.8voeDBGnab0JFZb4qbmCsuz1f9cHxA.",
 *      "date": "2019-05-15T01:15:09.473Z",
 *      "__v": 0
 *    }
 *  }
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.deleteUser);

/**
 *  @apiGroup User
 *  @api {post} api/users/login Efetuar login
 *  @apiParam {String} email Email do usuário
 *  @apiParam {String} password Senha do usuário
 *  @apiExample {request} Request Body (exemplo)
 *    {
 *      "email": "lameck@lsdev.com",
 *      "password": "123456"
 *    }
 *  @apiExample {response} Response (exemplo)
 *    {
 *      "success": true,
 *      "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2YzZjgwODBiODVmODAwMTJiZGRjMTAiLCJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEBsc2Rldi5jb20iLCJpYXQiOjE1NTk0OTI2OTJ9.2k1-60HqbcG7KRTVUkw3Mh3eCd70ZhgMTap1p9zpgLU"
 *    }
 *
 */
router.post('/login', controller.loginUser);

// Exportando rotas
module.exports = router;
