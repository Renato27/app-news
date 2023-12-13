#!/bin/bash

# Função para tratar erros
handle_error() {
  echo "Erro na execução do script."
  exit 1
}

# Trap para chamar a função handle_error em caso de erro
trap 'handle_error' ERR

# Corrigir permissões no frontend
echo "Corrigindo permissões no Frontend..."
chown -R $(whoami) ./frontend

# Executar npm install no frontend
echo "Instalando dependências do Frontend..."
(cd ./frontend && npm install)

echo "Instalando dependências do Backend..."
(cd ./backend && composer install)

echo "Copiando .env.example para .env no Frontend..."
cp ./frontend/.env.example ./frontend/.env

echo "Copiando .env.example para .env no Backend..."
cp ./backend/.env.example ./backend/.env

echo "Construindo e iniciando contêineres com Docker Compose..."
docker compose up --build -d

echo "Script concluído com sucesso."
