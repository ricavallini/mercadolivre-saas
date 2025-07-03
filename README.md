# Micro-SaaS Mercado Livre Integration

Este é um projeto de Micro-SaaS que integra com a API do Mercado Livre para gerenciar vendas e etiquetas de envio.

## Configuração

### 1. Variáveis de Ambiente

Copie o arquivo `env.example` para `.env` e configure suas credenciais:

```bash
cp env.example .env
```

Configure as seguintes variáveis no arquivo `.env`:
- `MERCADOLIVRE_CLIENT_ID`: Seu Client ID do Mercado Livre
- `MERCADOLIVRE_CLIENT_SECRET`: Seu Client Secret do Mercado Livre
- `NEXT_PUBLIC_APP_URL`: URL da aplicação (http://localhost:3000 para desenvolvimento)

### 2. Instalação de Dependências

```bash
npm install
```

### 3. Configuração do Banco de Dados

```bash
# Gerar o cliente Prisma
npx prisma generate

# Criar as tabelas no banco de dados
npx prisma db push
```

### 4. Executar o Projeto

```bash
npm run dev
```

O projeto estará disponível em: http://localhost:3000

## Funcionalidades

- **Autenticação OAuth** com Mercado Livre
- **Dashboard** para visualizar conexões
- **Gerenciamento de Vendas** do Mercado Livre
- **Geração de Etiquetas de Envio**
- **Extração de Telefones** das etiquetas

## Estrutura do Projeto

- `/src/app/api/auth/mercadolivre/` - Rotas de autenticação OAuth
- `/src/app/dashboard/` - Dashboard principal
- `/prisma/schema.prisma` - Schema do banco de dados
- `/prisma/dev.db` - Banco de dados SQLite

## Próximos Passos

1. Configure suas credenciais do Mercado Livre
2. Execute os comandos de configuração
3. Acesse http://localhost:3000
4. Clique em "Conectar com o Mercado Livre"
5. Autorize a aplicação no Mercado Livre
6. Acesse o dashboard para ver a integração funcionando 