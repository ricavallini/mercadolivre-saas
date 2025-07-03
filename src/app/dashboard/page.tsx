export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Dashboard - Micro-SaaS</h1>
        <p className="text-lg mb-8">Sua conta do Mercado Livre foi conectada com sucesso!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Status da Conexão</h2>
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-green-600 font-medium">Conectado</span>
            </div>
            <p className="text-gray-600 text-sm">Token de acesso ativo</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Próximos Passos</h2>
            <ul className="text-left text-gray-600 space-y-2">
              <li>• Sincronizar vendas do Mercado Livre</li>
              <li>• Gerar etiquetas de envio</li>
              <li>• Extrair telefones dos clientes</li>
              <li>• Configurar notificações</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold mb-3 text-blue-800">Funcionalidades Disponíveis</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 font-bold">📦</span>
              </div>
              <p className="font-medium">Gerenciar Vendas</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 font-bold">🏷️</span>
              </div>
              <p className="font-medium">Etiquetas de Envio</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 font-bold">📱</span>
              </div>
              <p className="font-medium">Extração de Telefones</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <a href="/" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-4">
            Voltar ao Início
          </a>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sincronizar Dados
          </button>
        </div>
      </div>
    </main>
  );
}
