# Configuração das Credenciais do Mercado Livre

## Passo a Passo para Obter as Credenciais

### 1. Acesse o Portal de Desenvolvedores
- Vá para: https://developers.mercadolivre.com.br/
- Faça login com sua conta do Mercado Livre

### 2. Criar uma Nova Aplicação
- Clique em "Criar Aplicação"
- Preencha os dados:
  - **Nome da Aplicação**: Micro-SaaS (ou qualquer nome)
  - **Descrição**: Aplicação para gerenciar vendas e envios
  - **Categoria**: Vendas
  - **Tipo de Aplicação**: Web App

### 3. Configurar URLs de Redirecionamento
- Na seção "URLs de Redirecionamento", adicione:
  ```
  https://localhost:3000/api/auth/mercadolivre/callback
  ```
  
  **Para produção**, adicione também:
  ```
  https://your-domain.com/api/auth/mercadolivre/callback
  ```

### 4. Obter as Credenciais
- Após criar a aplicação, você verá:
  - **App ID** (Client ID)
  - **Secret** (Client Secret)

### 5. Configurar no Projeto
- Copie o arquivo `env.example` para `.env`
- Substitua os valores:
  ```
  MERCADOLIVRE_CLIENT_ID=seu_app_id_aqui
  MERCADOLIVRE_CLIENT_SECRET=seu_secret_aqui
  ```

## Permissões Necessárias

A aplicação solicitará as seguintes permissões:
- **read**: Para ler informações da conta
- **write**: Para criar etiquetas de envio
- **offline_access**: Para renovar tokens automaticamente

## Testando a Integração

1. Execute o projeto: `npm run dev`
2. Acesse: http://localhost:3000
3. Clique em "Conectar com o Mercado Livre"
4. Autorize a aplicação
5. Você será redirecionado para o dashboard

## Solução de Problemas

### Erro de URL de Redirecionamento
- Certifique-se de que a URL no portal do Mercado Livre está exatamente igual à configurada no `.env`

### Erro de Credenciais
- Verifique se o Client ID e Client Secret estão corretos
- Certifique-se de que não há espaços extras

### Erro de CORS
- Para desenvolvimento local, use `http://localhost:3000`
- Para produção, configure a URL correta no portal do Mercado Livre 