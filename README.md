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

## Funcionalidades do Dashboard Mercado Livre

O dashboard possui as seguintes abas, todas integradas via access token manual:

1. **Meus Dados**: Exibe os dados do usuário autenticado.
2. **Produtos à venda**: Lista os produtos ativos do usuário.
3. **Vendas**: Lista as últimas vendas.
4. **Detalhes da venda**: Busca detalhes completos de uma venda pelo ID.
5. **Mensagens**: Busca e exibe mensagens de uma venda pelo ID.
6. **Etiquetas de envio**: Busca dados de envio e link para download da etiqueta pelo ID.
7. **Dados do Cliente**: Busca e exibe os dados do comprador de uma venda pelo ID da venda.
8. **Atualizar status do pedido**: Permite informar o ID da venda e escolher um novo status para atualizar o pedido (ex: pago, enviado, entregue, cancelado).
9. **Enviar mensagem ao comprador**: Permite informar o ID da venda e enviar uma mensagem ao comprador diretamente pelo painel.

### Como usar cada aba

- **Dados do Cliente**: Informe o ID da venda (orderId) e clique em "Buscar Cliente". Os dados do comprador serão exibidos em formato JSON.
- **Atualizar status do pedido**: Informe o ID da venda, selecione o novo status desejado e clique em "Atualizar Status". Uma mensagem de sucesso será exibida se a atualização for realizada.
- **Enviar mensagem ao comprador**: Informe o ID da venda, digite a mensagem e clique em "Enviar Mensagem". Uma mensagem de sucesso será exibida se o envio for realizado.

> **Observação:** O access token do Mercado Livre deve ser informado manualmente na tela inicial. Ele é salvo no localStorage e utilizado em todas as requisições.

### Exemplos de uso

- Para obter o ID da venda, utilize a aba "Vendas" ou "Detalhes da venda".
- Os status disponíveis para atualização são: Pago, Confirmado, Enviado, Entregue, Cancelado.
- As mensagens enviadas ao comprador ficam disponíveis na aba "Mensagens".

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