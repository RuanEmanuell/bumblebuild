FROM node:22

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência e instala
COPY package.json package-lock.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta do servidor de dev (React: 3000, Angular: 4200, Vite: 5173 — ajuste se necessário)
EXPOSE 5173

# Comando para rodar o servidor de desenvolvimento
CMD ["npm", "run", "dev"]
