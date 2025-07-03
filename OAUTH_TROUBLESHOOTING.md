# Solução de Problemas - OAuth Mercado Livre

## Erro: "Desculpe, não foi possível conectar o aplicativo à sua conta"

### Possíveis Causas e Soluções:

#### 1. **URL de Redirecionamento Incorreta**
**Problema:** A URL de callback não está configurada corretamente no portal do Mercado Livre.

**Solução:**
1. Acesse: https://developers.mercadolivre.com.br/
2. Edite sua aplicação
3. Em "URLs de Redirecionamento", adicione:
   ```
   http://localhost:3000/api/auth/mercadolivre/callback
   ```
4. **IMPORTANTE:** Certifique-se de que não há espaços extras ou caracteres especiais

#### 2. **Credenciais Incorretas**
**Problema:** Client ID ou Client Secret incorretos.

**Solução:**
1. Verifique o arquivo `.env`:
   ```env
   MERCADOLIVRE_CLIENT_ID=1067202503703835
   MERCADOLIVRE_CLIENT_SECRET=1eYHkO1Pd1iZ3orlPBqpH1XbPlDMSTiS
   ```
2. Confirme no portal do Mercado Livre se essas são as credenciais corretas

#### 3. **Aplicação Não Autorizada**
**Problema:** A aplicação não está autorizada para uso.

**Solução:**
1. No portal do Mercado Livre, verifique se a aplicação está "Ativa"
2. Certifique-se de que não está em modo de desenvolvimento restrito

#### 4. **Permissões Insuficientes**
**Problema:** A aplicação não tem as permissões necessárias.

**Solução:**
1. No portal do Mercado Livre, configure as permissões:
   - `read` - Para ler informações da conta
   - `write` - Para criar etiquetas de envio
   - `offline_access` - Para renovar tokens automaticamente

#### 5. **Problema de CORS**
**Problema:** Erro de CORS durante a requisição.

**Solução:**
1. Verifique se está usando `http://localhost:3000` (não HTTPS)
2. Certifique-se de que a URL no portal do Mercado Livre está exatamente igual

### Verificação Passo a Passo:

#### Passo 1: Verificar Configuração Local
```bash
# Verificar se a aplicação está rodando
npm run dev

# Verificar arquivo .env
type .env
```

#### Passo 2: Verificar Portal do Mercado Livre
1. **App ID**: `1067202503703835`
2. **Secret**: `1eYHkO1Pd1iZ3orlPBqpH1XbPlDMSTiS`
3. **URL de Redirecionamento**: `http://localhost:3000/api/auth/mercadolivre/callback`

#### Passo 3: Testar Fluxo OAuth
1. Acesse: http://localhost:3000
2. Clique em "Conectar com o Mercado Livre"
3. Verifique se a URL de autorização está correta
4. Autorize a aplicação
5. Verifique se o redirecionamento funciona

### URLs de Teste:

#### Desenvolvimento Local:
- **Aplicação**: http://localhost:3000
- **Callback**: http://localhost:3000/api/auth/mercadolivre/callback

#### Produção (Netlify/Vercel):
- **Aplicação**: https://your-app.netlify.app
- **Callback**: https://your-app.netlify.app/api/auth/mercadolivre/callback

### Logs de Debug:

Para ver logs detalhados, adicione no arquivo `.env`:
```env
DEBUG=*
```

### Contato com Suporte:

Se o problema persistir:
1. Verifique os logs do console do navegador
2. Verifique os logs do servidor Next.js
3. Entre em contato com o suporte do Mercado Livre

### Checklist de Verificação:

- [ ] Aplicação rodando em http://localhost:3000
- [ ] Arquivo .env configurado corretamente
- [ ] URL de callback configurada no portal do Mercado Livre
- [ ] Credenciais corretas no portal
- [ ] Aplicação ativa no portal
- [ ] Permissões configuradas
- [ ] Sem espaços extras nas URLs 