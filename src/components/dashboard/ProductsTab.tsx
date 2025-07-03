import { useState } from "react";
import { ExclamationCircleIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

export function ProductsTab({ darkMode }: { darkMode: boolean }) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    setProducts([]);
    try {
      const token = localStorage.getItem("ml_access_token");
      const res = await fetch("/api/ml/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erro ao buscar produtos");
      } else {
        setProducts(data.products || []);
      }
    } catch (err) {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[300px]">
      <button
        onClick={fetchProducts}
        className="mb-4 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded shadow transition"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center gap-2"><ArrowPathIcon className="w-5 h-5 animate-spin" />Buscando...</span>
        ) : (
          <span>Atualizar Produtos</span>
        )}
      </button>
      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded p-3 mb-2">
          <ExclamationCircleIcon className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}
      {products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
          {products.map((prod: any) => (
            <div key={prod.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-blue-700 dark:text-blue-200 text-lg truncate" title={prod.title}>{prod.title}</span>
              </div>
              <div className="text-gray-700 dark:text-gray-200 text-sm mb-1">ID: <span className="font-mono">{prod.id}</span></div>
              <div className="text-gray-700 dark:text-gray-200 text-sm mb-1">Preço: <span className="font-semibold">R$ {prod.price?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span></div>
              <div className="text-gray-700 dark:text-gray-200 text-sm mb-1">Estoque: <span className="font-semibold">{prod.available_quantity}</span></div>
              <div className="text-gray-700 dark:text-gray-200 text-sm mb-1">Status: <span className="font-semibold">{prod.status}</span></div>
              {prod.thumbnail && (
                <img src={prod.thumbnail} alt={prod.title} className="w-24 h-24 object-contain mt-2 self-center rounded" />
              )}
            </div>
          ))}
        </div>
      )}
      {products.length === 0 && !loading && !error && (
        <div className="text-gray-400 mt-4">Clique em &quot;Atualizar Produtos&quot; para exibir seus produtos ativos.</div>
      )}
    </div>
  );
} 