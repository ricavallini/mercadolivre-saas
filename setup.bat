@echo off
echo Configurando o projeto Micro-SaaS Mercado Livre...
echo.

echo 1. Copiando arquivo de configuração...
copy ..\env.example .env
echo Arquivo .env criado com sucesso!
echo.

echo 2. Instalando dependencias...
npm install
echo Dependencias instaladas!
echo.

echo 3. Gerando cliente Prisma...
npx prisma generate
echo Cliente Prisma gerado!
echo.

echo 4. Configurando banco de dados...
npx prisma db push
echo Banco de dados configurado!
echo.

echo 5. Iniciando servidor de desenvolvimento...
echo O projeto estara disponivel em: http://localhost:3000
echo.
npm run dev 