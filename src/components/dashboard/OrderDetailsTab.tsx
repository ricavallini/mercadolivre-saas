import { useState } from "react";
import { CheckCircleIcon, ExclamationCircleIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

export function OrderDetailsTab({ darkMode }: { darkMode: boolean }) {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrder = async () => {
    setLoading(true);
    setError("");
    setOrder(null);
    try {
      const token = localStorage.getItem("ml_access_token");
      const res = await fetch(`/api/ml/order-details?orderId=${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erro ao buscar detalhes da venda");
      } else {
        setOrder(data);
      }
    } catch (err) {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[300px] w-full">
      <form
        onSubmit={e => {
          e.preventDefault();
          fetchOrder();
        }}
        className="mb-4 flex flex-col sm:flex-row gap-2 w-full max-w-xl"
      >
        <input
          type="text"
          className="px-3 py-2 border rounded w-full"
          placeholder="ID da venda (orderId)"
          value={orderId}
          onChange={e => setOrderId(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded shadow transition"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2"><ArrowPathIcon className="w-5 h-5 animate-spin" />Buscando...</span>
          ) : (
            <span>Buscar Detalhes</span>
          )}
        </button>
      </form>
      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded p-3 mb-2">
          <ExclamationCircleIcon className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}
      {order && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 w-full max-w-lg text-left transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircleIcon className="w-6 h-6 text-green-500" />
            <span className="font-bold text-lg">Detalhes da Venda</span>
          </div>
          <div className="text-gray-700 dark:text-gray-200 text-sm mb-2">ID: <span className="font-mono">{order.id}</span></div>
          <div className="text-gray-700 dark:text-gray-200 text-sm mb-2">Status: <span className="font-semibold">{order.status}</span></div>
          <div className="text-gray-700 dark:text-gray-200 text-sm mb-2">Valor: <span className="font-semibold">R$ {order.total_amount?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span></div>
          <div className="text-gray-700 dark:text-gray-200 text-sm mb-2">Comprador: <span className="font-semibold">{order.buyer?.nickname || order.buyer?.first_name}</span></div>
          <div className="text-gray-700 dark:text-gray-200 text-sm mb-2">Data: <span className="font-mono">{order.date_created && new Date(order.date_created).toLocaleString()}</span></div>
          <div className="text-gray-700 dark:text-gray-200 text-sm mb-2">Pagamento: <span className="font-semibold">{order.payments?.[0]?.status || '-'}</span></div>
          <div className="text-gray-700 dark:text-gray-200 text-sm mb-2">Entrega: <span className="font-semibold">{order.fulfillment?.shipment?.status || order.shipping?.status || '-'}</span></div>
          <div className="text-gray-700 dark:text-gray-200 text-sm mb-2">Itens:</div>
          <ul className="list-disc ml-6 text-gray-700 dark:text-gray-200 text-sm">
            {order.order_items?.map((it: any) => (
              <li key={it.item.id}>
                {it.item.title} <span className="text-gray-400">(SKU: {it.item.seller_sku})</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {!order && !loading && !error && (
        <div className="text-gray-400 mt-4">Digite o ID da venda e clique em &quot;Buscar Detalhes&quot;.</div>
      )}
    </div>
  );
} 