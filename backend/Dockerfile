# Usa a imagem oficial do Node.js versão 22
FROM node:22

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos essenciais primeiro (melhor pro cache)
COPY package*.json ./

# Instala as dependências aqui dentro do container
RUN npm install

# Agora copia o restante do projeto
COPY . .

RUN chmod +x ./entrypoint.sh

# Expõe a porta que a aplicação vai usar dentro do container
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["./entrypoint.sh"]
