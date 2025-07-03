import { useState } from "react";
import { CheckCircleIcon, ExclamationCircleIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

export function ShippingTab({ darkMode }: { darkMode: boolean }) {
  const [orderId, setOrderId] = useState("");
  const [shipping, setShipping] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchShipping = async () => {
    setLoading(true);
    setError("");
    setShipping(null);
    try {
      const token = localStorage.getItem("ml_access_token");
      const res = await fetch(`/api/ml/shipping?orderId=${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erro ao buscar dados de envio");
      } else {
        setShipping(data);
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
          fetchShipping();
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
            <span>Buscar Etiqueta</span>
          )}
        </button>
      </form>
      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded p-3 mb-2">
          <ExclamationCircleIcon className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}
      {shipping && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 w-full max-w-lg text-left transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircleIcon className="w-6 h-6 text-green-500" />
            <span className="font-bold text-lg">Dados de Envio</span>
          </div>
          <div className="text-gray-700 dark:text-gray-200 text-sm mb-2">ID do Envio: <span className="font-mono">{shipping.id}</span></div>
          <div className="text-gray-700 dark:text-gray-200 text-sm mb-2">Status: <span className="font-semibold">{shipping.status}</span></div>
          <div className="text-gray-700 dark:text-gray-200 text-sm mb-2">Endereço: <span className="font-semibold">{shipping.receiver_address?.address_line}, {shipping.receiver_address?.city?.name} - {shipping.receiver_address?.state?.name}</span></div>
          <div className="text-gray-700 dark:text-gray-200 text-sm mb-2">Tipo: <span className="font-semibold">{shipping.shipping_mode}</span></div>
          {shipping.labelUrl && (
            <a
              href={shipping.labelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-6 rounded shadow transition"
            >
              Baixar Etiqueta
            </a>
          )}
        </div>
      )}
      {!shipping && !loading && !error && (
        <div className="text-gray-400 mt-4">Digite o ID da venda e clique em &quot;Buscar Etiqueta&quot;.</div>
      )}
    </div>
  );
} 