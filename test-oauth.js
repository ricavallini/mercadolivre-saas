// Script para testar configuração OAuth do Mercado Livre
const clientId = '1067202503703835';
const clientSecret = '1eYHkO1Pd1iZ3orlPBqpH1XbPlDMSTiS';
const redirectUri = 'http://localhost:3000/api/auth/mercadolivre/callback';

console.log('🔍 Testando configuração OAuth do Mercado Livre...\n');

console.log('📋 Configurações atuais:');
console.log(`Client ID: ${clientId}`);
console.log(`Client Secret: ${clientSecret}`);
console.log(`Redirect URI: ${redirectUri}\n`);

console.log('🌐 URL de autorização:');
const authUrl = `https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}`;
console.log(authUrl);
console.log('\n');

console.log('✅ Checklist de verificação:');
console.log('1. Acesse: https://developers.mercadolivre.com.br/');
console.log('2. Edite sua aplicação');
console.log('3. Verifique se o Client ID e Secret estão corretos');
console.log('4. Em "URLs de Redirecionamento", adicione:');
console.log(`   ${redirectUri}`);
console.log('5. Certifique-se de que a aplicação está "Ativa"');
console.log('6. Configure as permissões: read, write, offline_access');
console.log('\n');

console.log('🚀 Para testar:');
console.log('1. Acesse: http://localhost:3000');
console.log('2. Clique em "Conectar com o Mercado Livre"');
console.log('3. Verifique se a URL de autorização está correta');
console.log('4. Autorize a aplicação');
console.log('5. Verifique se o redirecionamento funciona'); 