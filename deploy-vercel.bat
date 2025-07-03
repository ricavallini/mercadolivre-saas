@echo off
echo Deployando projeto no Vercel...
echo.

echo 1. Verificando se o Vercel CLI esta instalado...
vercel --version >nul 2>&1
if errorlevel 1 (
    echo Instalando Vercel CLI...
    npm install -g vercel
) else (
    echo Vercel CLI ja esta instalado!
)
echo.

echo 2. Fazendo build do projeto...
npm run build
if errorlevel 1 (
    echo Erro no build! Verifique os erros acima.
    pause
    exit /b 1
)
echo Build concluido com sucesso!
echo.

echo 3. Iniciando deploy no Vercel...
echo.
echo IMPORTANTE: Configure as seguintes variaveis de ambiente:
echo - MERCADOLIVRE_CLIENT_ID
echo - MERCADOLIVRE_CLIENT_SECRET  
echo - NEXT_PUBLIC_APP_URL (sera configurado automaticamente)
echo.
echo Pressione qualquer tecla para continuar...
pause >nul

vercel --prod

echo.
echo Deploy concluido! 
echo Configure a URL de callback no portal do Mercado Livre:
echo https://[seu-app-name].vercel.app/api/auth/mercadolivre/callback
echo.
pause 