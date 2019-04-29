# "Declarando" a imagem a ser "copiada" para o container
FROM node:11-alpine

# Declarando a "pasta" em que os arquivos serão adicionados dentro 
# do container
WORKDIR /node-app

# Copiando o package.json para o nosso WORKDIR, para instalar as
# dependências do projeto
COPY package.json .

# Rodando o comando para instalar dependências
RUN npm install

# O nodemon é instalado aqui para corrigir um bug do docker, para
# duvidas me contate ou crie uma issue
RUN npm install nodemon -g

# Copiando todos os arquivos para o WORKDIR
COPY . .

# "Declarando" a porta em que o container poderá ser acessado de "fora"
EXPOSE 9000

# Iniciando o servidor usando o nodemon (Modo de desenvolvimento)
CMD nodemon -L --watch . index.js