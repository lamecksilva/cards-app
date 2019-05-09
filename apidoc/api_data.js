define({ "api": [
  {
    "group": "User",
    "type": "post",
    "url": "/register",
    "title": "Adicionar usuário para o db",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nome do perfil (Required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email do novo usuário (Required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Senha da conta (Required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password2",
            "description": "<p>Confirmação da senha (Required)</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Exemplo de response:",
        "content": "{\n  \"success\": true,\n  \"user\": {\n    \"cards\": [],\n    \"_id\": \"5cd46b53e44376002f7957cf\",\n    \"name\": \"Example\",\n    \"email\": \"example3@example.com\",\n    \"password\": \"123456\",\n    \"date\": \"2019-05-09T18:02:59.560Z\",\n    \"__v\": 0\n  }\n}",
        "type": "response"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"success\": false,\n  \"errors\": {\n    \"email\": \"Email já cadastrado\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/users/router.js",
    "groupTitle": "User",
    "name": "PostRegister"
  }
] });
