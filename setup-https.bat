@echo off
echo Configurando HTTPS para desenvolvimento local...
echo.

echo 1. Instalando mkcert para certificados locais...
winget install FiloSottile.mkcert
echo.

echo 2. Gerando certificado local...
mkcert -install
mkcert localhost 127.0.0.1 ::1
echo.

echo 3. Configurando Next.js para HTTPS...
echo Certificados gerados! Agora execute: npm run dev
echo.

echo 4. Para usar HTTPS, execute:
echo npm run dev -- --experimental-https
echo.

pause 