export function DashboardHome() {
  // Exemplo de dados estáticos, substitua por dados reais/IA depois
  const vendasHoje = 12;
  const vendasOntem = 9;
  const produtosAtivos = 24;
  const estoqueBaixo = 2;

  return (
    <div>
      <div className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-200">
        Bem-vindo ao seu Dashboard!
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 transition-all duration-300">
          <div className="text-gray-500 dark:text-gray-300 text-sm mb-2">Vendas hoje</div>
          <div className="text-3xl font-bold text-blue-700 dark:text-blue-200">{vendasHoje}</div>
          <div className="text-xs text-gray-400 mt-2">{vendasHoje - vendasOntem >= 0 ? "+" : ""}{vendasHoje - vendasOntem} vs ontem</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 transition-all duration-300">
          <div className="text-gray-500 dark:text-gray-300 text-sm mb-2">Produtos ativos</div>
          <div className="text-3xl font-bold text-blue-700 dark:text-blue-200">{produtosAtivos}</div>
          <div className="text-xs text-gray-400 mt-2">Atualizado agora</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 transition-all duration-300">
          <div className="text-gray-500 dark:text-gray-300 text-sm mb-2">Alertas de estoque baixo</div>
          <div className="text-3xl font-bold text-blue-700 dark:text-blue-200">{estoqueBaixo}</div>
          <div className="text-xs text-gray-400 mt-2">Verifique seus produtos</div>
        </div>
      </div>
    </div>
  );
} 