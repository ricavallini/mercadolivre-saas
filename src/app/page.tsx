export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center max-w-4xl">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Micro-SaaS Mercado Livre
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Automatize suas vendas e envios do Mercado Livre
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <div className="text-3xl mb-3">📦</div>
            <h3 className="text-lg font-semibold mb-2">Gerenciamento de Vendas</h3>
            <p className="text-gray-600 text-sm">
              Sincronize e gerencie todas as suas vendas do Mercado Livre em um só lugar
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <div className="text-3xl mb-3">🏷️</div>
            <h3 className="text-lg font-semibold mb-2">Etiquetas de Envio</h3>
            <p className="text-gray-600 text-sm">
              Gere etiquetas de envio automaticamente para suas vendas
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <div className="text-3xl mb-3">📱</div>
            <h3 className="text-lg font-semibold mb-2">Extração de Telefones</h3>
            <p className="text-gray-600 text-sm">
              Extraia telefones dos clientes das etiquetas de envio
            </p>
          </div>
        </div>
        
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-200 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Comece Agora</h2>
          <p className="text-gray-700 mb-6">
            Conecte sua conta do Mercado Livre para começar a automatizar seus processos de venda e envio.
          </p>
          <a href="/api/auth/mercadolivre">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200">
              🔗 Conectar com o Mercado Livre
            </button>
          </a>
        </div>
        
        <div className="text-sm text-gray-500">
          <p>✅ Integração segura com OAuth 2.0</p>
          <p>✅ Dados armazenados localmente</p>
          <p>✅ Sem taxas mensais</p>
        </div>
      </div>
    </main>
  );
}
