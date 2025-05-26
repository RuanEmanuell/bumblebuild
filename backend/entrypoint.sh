#!/bin/sh

echo "Aguardando o banco de dados..."

until nc -z $DB_HOST $DB_PORT; do
  echo "Aguardando o banco de dados..."
  sleep 2
done

echo "Executando migrações..."
npx prisma migrate deploy

echo "Iniciando a aplicação..."
npm run start
