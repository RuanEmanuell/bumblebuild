#!/bin/sh

echo "Aguardando o banco de dados..."

npx prisma generate

until npx prisma migrate dev --name init; do 
  echo "Falha ao aplicar as migrações. Tentando novamente em 5 segundos..."
  sleep 5
done

echo "Iniciando a aplicação..."
npm run dev
