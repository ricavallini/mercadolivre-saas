@echo off
echo Configurando projeto para GitHub...
echo.

echo 1. Verificando se o Git esta instalado...
git --version >nul 2>&1
if errorlevel 1 (
    echo Git nao encontrado. Instalando Git...
    winget install --id Git.Git -e --source winget
    echo.
    echo Git instalado! Reinicie o terminal e execute este script novamente.
    pause
    exit /b 1
) else (
    echo Git ja esta instalado!
)
echo.

echo 2. Inicializando repositorio Git...
git init
echo.

echo 3. Adicionando arquivos ao repositorio...
git add .
echo.

echo 4. Fazendo primeiro commit...
git commit -m "Initial commit: Micro-SaaS Mercado Livre Integration"
echo.

echo 5. Configurando repositorio remoto...
echo.
echo IMPORTANTE: 
echo 1. Vá para https://github.com/new
echo 2. Crie um novo repositório (ex: mercadolivre-saas)
echo 3. NÃO inicialize com README, .gitignore ou license
echo 4. Copie a URL do repositório
echo 5. Execute: git remote add origin https://github.com/seu-usuario/mercadolivre-saas.git
echo 6. Execute: git push -u origin main
echo.

echo 6. Configurando branch principal...
git branch -M main
echo.

echo Repositorio local configurado!
echo Agora crie o repositorio no GitHub e conecte com:
echo git remote add origin https://github.com/seu-usuario/nome-do-repo.git
echo git push -u origin main
echo.
pause 