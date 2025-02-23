# Usa a imagem oficial do Node.js
FROM node:22

# Define o diretório de trabalho no contêiner
WORKDIR /app

# Copia os arquivos do projeto para o contêiner
COPY package.json package-lock.json tsconfig.json ./
RUN npm install

# Copia todo o código-fonte
COPY . .

# Porta
EXPOSE 3000

# Comando para rodar o backend
CMD ["npm", "run", "dev"]
