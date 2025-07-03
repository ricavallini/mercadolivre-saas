import { useState } from "react";
import { CheckCircleIcon, ExclamationCircleIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

export function BuyerTab({ darkMode }: { darkMode: boolean }) {
  const [orderId, setOrderId] = useState("");
  const [buyer, setBuyer] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBuyer = async () => {
    setLoading(true);
    setError("");
    setBuyer(null);
    try {
      const token = localStorage.getItem("ml_access_token");
      const res = await fetch(`/api/ml/buyer?orderId=${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erro ao buscar dados do cliente");
      } else {
        setBuyer(data);
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
          fetchBuyer();
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
            <span>Buscar Cliente</span>
          )}
        </button>
      </form>
      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded p-3 mb-2">
          <ExclamationCircleIcon className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}
      {buyer && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 w-full max-w-lg text-left transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircleIcon className="w-6 h-6 text-green-500" />
            <span className="font-bold text-lg">Dados do Cliente</span>
          </div>
          <div className="text-gray-700 dark:text-gray-200 text-sm mb-2">ID: <span className="font-mono">{buyer.id}</span></div>
          <div className="text-gray-700 dark:text-gray-200 text-sm mb-2">Nome: <span className="font-semibold">{buyer.nickname || buyer.first_name + ' ' + buyer.last_name}</span></div>
          <div className="text-gray-700 dark:text-gray-200 text-sm mb-2">E-mail: <span className="font-mono">{buyer.email}</span></div>
          <div className="text-gray-700 dark:text-gray-200 text-sm mb-2">Tipo: <span className="font-semibold">{buyer.user_type}</span></div>
          <div className="text-gray-700 dark:text-gray-200 text-sm">Conta criada em: <span className="font-mono">{buyer.registration_date && new Date(buyer.registration_date).toLocaleDateString()}</span></div>
        </div>
      )}
      {!buyer && !loading && !error && (
        <div className="text-gray-400 mt-4">Digite o ID da venda e clique em &quot;Buscar Cliente&quot;.</div>
      )}
    </div>
  );
} 