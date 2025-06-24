#!/bin/sh

echo "Aguardando o banco de dados..."

npx prisma generate

<<<<<<< HEAD
until npx prisma migrate deploy; do
    echo "Falha ao aplicar as migrações. Tentando novamente em 5 segundos..."
    sleep 5
done

echo "Iniciando a aplicação..."

node dist/server.js

