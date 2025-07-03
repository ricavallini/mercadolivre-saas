#!/bin/bash

# Script de build para Netlify
echo "🚀 Iniciando build no Netlify..."

# Limpar cache do Prisma
echo "🧹 Limpando cache do Prisma..."
rm -rf node_modules/.prisma
rm -rf node_modules/@prisma

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Gerar cliente Prisma
echo "🔧 Gerando cliente Prisma..."
npx prisma generate

# Build do Next.js
echo "🏗️ Fazendo build do Next.js..."
npm run build

echo "✅ Build concluído com sucesso!" 