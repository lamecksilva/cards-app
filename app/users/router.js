// Importando router
const router = require('express').Router();

// Importando controller das rotas de usuário
const controller = require('./controller');

// Use o apidoc para gerar a documentação das rotas da API
// gere documentação com: apidoc -i app/ -o apidoc/

/**
 *    @apiGroup User
 *    @api {post} /register Adicionar usuário para o db
 *    @apiParam {String} name Nome do perfil (Required)
 *    @apiParam {String} email Email do novo usuário (Required)
 *    @apiParam {String} password Senha da conta (Required)
 *    @apiParam {String} password2 Confirmação da senha (Required)
 *    @apiExample {response} Exemplo de response:
 *      {
 *        "success": true,
 *        "user": {
 *          "cards": [],
 *          "_id": "5cd46b53e44376002f7957cf",
 *          "name": "Example",
 *          "email": "example3@example.com",
 *          "password": "123456",
 *          "date": "2019-05-09T18:02:59.560Z",
 *          "__v": 0
 *        }
 *      }
 *
 */
router.post('/register', controller.register);

// Exportando rotas
module.exports = router;
