FROM  node:20.15-alpine3.19

# Diretório de trabalho no contêiner
WORKDIR /usr/src

# Copiar o arquivo de configuração
COPY package*.json ./

# Instalar as dependencias 
RUN npm install

# Instalar o ts-node
RUN npm i -g ts-node  

# Copiar os arquivos para o container
COPY src/main.ts ./src/main.ts

# Definir as variáveis de ambiente
ENV webhookUrl=xxxxxx
ENV QueueUrl=xxxxxx
ENV AWS_ACCESS_KEY_ID=xxxxxx
ENV AWS_SECRET_ACCESS_KEY=xxxxxx

# Comando executado ao rodar o container
CMD ["npm", "start"]