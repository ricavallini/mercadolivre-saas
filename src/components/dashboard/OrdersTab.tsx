import { useState } from "react";
import { ExclamationCircleIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

export function OrdersTab({ darkMode }: { darkMode: boolean }) {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    setOrders([]);
    try {
      const token = localStorage.getItem("ml_access_token");
      const res = await fetch("/api/ml/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erro ao buscar vendas");
      } else {
        setOrders(data.orders || []);
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
        onClick={fetchOrders}
        className="mb-4 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded shadow transition"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center gap-2"><ArrowPathIcon className="w-5 h-5 animate-spin" />Buscando...</span>
        ) : (
          <span>Atualizar Vendas</span>
        )}
      </button>
      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded p-3 mb-2">
          <ExclamationCircleIcon className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}
      {orders.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
          {orders.map((order: any) => (
            <div key={order.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-blue-700 dark:text-blue-200 text-lg truncate" title={order.title}>{order.title || order.order_items?.[0]?.item?.title || 'Venda'}</span>
                <span className={
                  order.status === 'paid' ? 'bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs ml-auto' :
                  order.status === 'cancelled' ? 'bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs ml-auto' :
                  'bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs ml-auto'
                }>{order.status}</span>
              </div>
              <div className="text-gray-700 dark:text-gray-200 text-sm mb-1">ID: <span className="font-mono">{order.id}</span></div>
              <div className="text-gray-700 dark:text-gray-200 text-sm mb-1">Valor: <span className="font-semibold">R$ {order.total_amount?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span></div>
              <div className="text-gray-700 dark:text-gray-200 text-sm mb-1">Comprador: <span className="font-semibold">{order.buyer?.nickname || order.buyer?.first_name}</span></div>
              <div className="text-gray-700 dark:text-gray-200 text-sm mb-1">Data: <span className="font-mono">{order.date_created && new Date(order.date_created).toLocaleString()}</span></div>
              <div className="text-gray-700 dark:text-gray-200 text-sm mb-1">Pagamento: <span className="font-semibold">{order.payments?.[0]?.status || '-'}</span></div>
              <div className="text-gray-700 dark:text-gray-200 text-sm mb-1">Entrega: <span className="font-semibold">{order.fulfillment?.shipment?.status || order.shipping?.status || '-'}</span></div>
            </div>
          ))}
        </div>
      )}
      {orders.length === 0 && !loading && !error && (
        <div className="text-gray-400 mt-4">Clique em &quot;Atualizar Vendas&quot; para exibir suas últimas vendas.</div>
      )}
    </div>
  );
} 