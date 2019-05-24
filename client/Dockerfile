# "Declarando" a imagem a ser "copiada" para o container
FROM node:11-stretch-slim

# Declarando a "pasta" em que os arquivos serão adicionados dentro 
# do container
WORKDIR /web-app

# Copiando o package.json para o nosso WORKDIR, para instalar as
# dependências do projeto
COPY package.json .

# Rodando o comando para instalar dependências
RUN npm install

# Copiando todos os arquivos para o WORKDIR
COPY . . 

# "Declarando" a porta em que o container poderá ser acessado de "fora"
EXPOSE 3000

# Iniciando o servidor111
CMD npm start