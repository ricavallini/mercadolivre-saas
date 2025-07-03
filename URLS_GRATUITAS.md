# URLs Gratuitas para Teste - Mercado Livre OAuth

## Opções Gratuitas Disponíveis

### 1. **Vercel (Recomendado)**
- **URL**: https://your-app-name.vercel.app
- **Vantagens**: 
  - Deploy automático do GitHub
  - HTTPS gratuito
  - Domínio personalizado
  - Muito estável

### 2. **Netlify**
- **URL**: https://your-app-name.netlify.app
- **Vantagens**:
  - Deploy automático
  - HTTPS gratuito
  - Interface simples

### 3. **Railway**
- **URL**: https://your-app-name.railway.app
- **Vantagens**:
  - Deploy rápido
  - HTTPS automático
  - Bom para Node.js

### 4. **Render**
- **URL**: https://your-app-name.onrender.com
- **Vantagens**:
  - Deploy simples
  - HTTPS gratuito
  - Suporte a Next.js

### 5. **Heroku (Plano Gratuito Limitado)**
- **URL**: https://your-app-name.herokuapp.com
- **Vantagens**:
  - Muito conhecido
  - HTTPS gratuito
  - Boa documentação

## Configuração Rápida - Vercel

### Passo 1: Preparar o Projeto
```bash
# No diretório do projeto
npm run build
```

### Passo 2: Deploy no Vercel
1. Acesse: https://vercel.com
2. Faça login com GitHub
3. Clique em "New Project"
4. Importe seu repositório
5. Configure as variáveis de ambiente:
   - `MERCADOLIVRE_CLIENT_ID`
   - `MERCADOLIVRE_CLIENT_SECRET`
   - `NEXT_PUBLIC_APP_URL` = https://your-app-name.vercel.app
6. Deploy!

### Passo 3: Configurar no Mercado Livre
No portal de desenvolvedores, adicione:
```
https://your-app-name.vercel.app/api/auth/mercadolivre/callback
```

## Configuração Rápida - Netlify

### Passo 1: Preparar o Projeto
```bash
# Criar arquivo netlify.toml
echo '[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200' > netlify.toml
```

### Passo 2: Deploy
1. Acesse: https://netlify.com
2. Arraste a pasta `out` (após build) para o Netlify
3. Configure as variáveis de ambiente
4. Deploy!

## URLs de Exemplo para Teste

### Vercel
```
https://mercadolivre-saas.vercel.app/api/auth/mercadolivre/callback
```

### Netlify
```
https://mercadolivre-saas.netlify.app/api/auth/mercadolivre/callback
```

### Railway
```
https://mercadolivre-saas.railway.app/api/auth/mercadolivre/callback
```

## Configuração das Variáveis de Ambiente

### Para Vercel:
```env
MERCADOLIVRE_CLIENT_ID=seu_client_id
MERCADOLIVRE_CLIENT_SECRET=seu_client_secret
NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
DATABASE_URL=file:./prisma/prod.db
```

### Para Netlify:
```env
MERCADOLIVRE_CLIENT_ID=seu_client_id
MERCADOLIVRE_CLIENT_SECRET=seu_client_secret
NEXT_PUBLIC_APP_URL=https://your-app-name.netlify.app
DATABASE_URL=file:./prisma/prod.db
```

## Dicas Importantes

1. **Sempre use HTTPS** - O Mercado Livre requer HTTPS
2. **Configure as variáveis de ambiente** no serviço de deploy
3. **Teste a URL de callback** antes de usar em produção
4. **Use um nome único** para evitar conflitos
5. **Mantenha as credenciais seguras** - nunca commite no GitHub

## Deploy Rápido com Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configurar variáveis
vercel env add MERCADOLIVRE_CLIENT_ID
vercel env add MERCADOLIVRE_CLIENT_SECRET
vercel env add NEXT_PUBLIC_APP_URL
``` 