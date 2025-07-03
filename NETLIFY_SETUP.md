# Configuração do Projeto no Netlify

## Problema Resolvido

O erro do Prisma no Netlify foi resolvido com as seguintes configurações:

### 1. Arquivos de Configuração Criados

- `netlify.toml` - Configuração principal do Netlify
- `scripts/netlify-build.sh` - Script de build personalizado
- `prisma/netlify.toml` - Configuração específica do Prisma

### 2. Configurações Aplicadas

#### package.json
```json
{
  "scripts": {
    "build": "prisma generate && next build",
    "build:netlify": "prisma generate && next build",
    "postinstall": "prisma generate"
  }
}
```

#### netlify.toml
```toml
[build]
  command = "bash scripts/netlify-build.sh"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "9"
  PRISMA_GENERATE_DATAPROXY = "true"
  PRISMA_CLIENT_ENGINE_TYPE = "library"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### 3. Deploy no Netlify

1. **Acesse**: https://app.netlify.com/
2. **Faça login** com GitHub
3. **Clique em "New site from Git"**
4. **Selecione o repositório**: `ricavallini/mercadolivre-saas`
5. **Configure as variáveis de ambiente**:
   - `MERCADOLIVRE_CLIENT_ID`
   - `MERCADOLIVRE_CLIENT_SECRET`
   - `NEXT_PUBLIC_APP_URL` = `https://your-app-name.netlify.app`
6. **Deploy!**

### 4. Configuração no Portal do Mercado Livre

Adicione a URL de callback:
```
https://your-app-name.netlify.app/api/auth/mercadolivre/callback
```

### 5. Variáveis de Ambiente no Netlify

No painel do Netlify, vá em:
- **Site settings** > **Environment variables**
- Adicione:
  ```
  MERCADOLIVRE_CLIENT_ID=seu_client_id
  MERCADOLIVRE_CLIENT_SECRET=seu_client_secret
  NEXT_PUBLIC_APP_URL=https://your-app-name.netlify.app
  DATABASE_URL=file:./prisma/prod.db
  ```

### 6. Deploy Automático

Após conectar o GitHub, cada push para a branch `main` fará um deploy automático.

## Solução do Problema do Prisma

O erro era causado pelo cache do Netlify CI. A solução inclui:

1. **Script de build personalizado** que limpa o cache do Prisma
2. **Geração do cliente Prisma** antes do build
3. **Configuração de ambiente** específica para o Prisma
4. **Plugin Next.js** do Netlify

## URLs de Exemplo

- **Aplicação**: https://mercadolivre-saas.netlify.app
- **Callback OAuth**: https://mercadolivre-saas.netlify.app/api/auth/mercadolivre/callback

## Próximos Passos

1. Faça push das alterações para o GitHub
2. Configure o deploy no Netlify
3. Configure as variáveis de ambiente
4. Teste a integração OAuth 