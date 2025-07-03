# Configuração do Projeto no GitHub

## Passo a Passo para Subir o Projeto

### 1. Instalar Git (se não estiver instalado)
```bash
# Execute o script de configuração
.\setup-github.bat
```

### 2. Criar Repositório no GitHub
1. Acesse: https://github.com/new
2. Nome do repositório: `mercadolivre-saas` (ou outro nome)
3. **IMPORTANTE**: NÃO inicialize com README, .gitignore ou license
4. Clique em "Create repository"

### 3. Conectar Repositório Local ao GitHub
```bash
# Adicionar repositório remoto (substitua pela sua URL)
git remote add origin https://github.com/seu-usuario/mercadolivre-saas.git

# Fazer push do código
git push -u origin main
```

### 4. Configurar Deploy Automático no Vercel
1. Acesse: https://vercel.com
2. Faça login com GitHub
3. Clique em "New Project"
4. Importe o repositório `mercadolivre-saas`
5. Configure as variáveis de ambiente:
   - `MERCADOLIVRE_CLIENT_ID`
   - `MERCADOLIVRE_CLIENT_SECRET`
   - `NEXT_PUBLIC_APP_URL` (será configurado automaticamente)
6. Deploy!

### 5. Configurar no Portal do Mercado Livre
1. Acesse: https://developers.mercadolivre.com.br/
2. Edite sua aplicação
3. Adicione a URL de callback:
   ```
   https://mercadolivre-saas.vercel.app/api/auth/mercadolivre/callback
   ```

## Estrutura do Projeto

```
mercadolivre-saas/
├── src/
│   └── app/
│       ├── api/auth/mercadolivre/
│       │   ├── route.ts
│       │   └── callback/route.ts
│       ├── dashboard/
│       │   └── page.tsx
│       ├── layout.tsx
│       ├── page.tsx
│       └── globals.css
├── prisma/
│   └── schema.prisma
├── package.json
├── next.config.mjs
├── vercel.json
└── README.md
```

## Funcionalidades

- ✅ Autenticação OAuth com Mercado Livre
- ✅ Dashboard para visualizar conexões
- ✅ Gerenciamento de vendas
- ✅ Geração de etiquetas de envio
- ✅ Extração de telefones dos clientes

## Deploy Automático

Após conectar o GitHub ao Vercel, cada push para a branch `main` fará um deploy automático.

## URLs de Exemplo

- **Aplicação**: https://mercadolivre-saas.vercel.app
- **Callback OAuth**: https://mercadolivre-saas.vercel.app/api/auth/mercadolivre/callback

## Próximos Passos

1. Configure as credenciais do Mercado Livre
2. Teste a integração OAuth
3. Personalize o dashboard
4. Adicione mais funcionalidades 