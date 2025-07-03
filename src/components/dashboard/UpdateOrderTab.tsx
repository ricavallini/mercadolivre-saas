import { useState } from "react";
import { CheckCircleIcon, ExclamationCircleIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

export function UpdateOrderTab({ darkMode }: { darkMode: boolean }) {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState("");

  const statusOptions = [
    { value: "paid", label: "Pago" },
    { value: "confirmed", label: "Confirmado" },
    { value: "shipped", label: "Enviado" },
    { value: "delivered", label: "Entregue" },
    { value: "cancelled", label: "Cancelado" },
  ];

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError("");
    try {
      const token = localStorage.getItem("ml_access_token");
      const res = await fetch("/api/ml/update-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderId, status }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erro ao atualizar status");
      } else {
        setResult("Status atualizado com sucesso!");
      }
    } catch (err) {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[300px] w-full">
      <form onSubmit={handleUpdate} className="mb-4 flex flex-col sm:flex-row gap-2 w-full max-w-xl">
        <input
          type="text"
          className="px-3 py-2 border rounded w-full"
          placeholder="ID da venda (orderId)"
          value={orderId}
          onChange={e => setOrderId(e.target.value)}
          required
        />
        <select
          className="px-3 py-2 border rounded w-full sm:w-auto"
          value={status}
          onChange={e => setStatus(e.target.value)}
          required
        >
          <option value="">Selecione o novo status</option>
          {statusOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded shadow transition"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2"><ArrowPathIcon className="w-5 h-5 animate-spin" />Atualizando...</span>
          ) : (
            <span>Atualizar Status</span>
          )}
        </button>
      </form>
      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded p-3 mb-2">
          <ExclamationCircleIcon className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}
      {result && (
        <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded p-3 mb-2">
          <CheckCircleIcon className="w-5 h-5" />
          <span>{result}</span>
        </div>
      )}
      {!result && !loading && !error && (
        <div className="text-gray-400 mt-4">Digite o ID da venda, selecione o status e clique em &quot;Atualizar Status&quot;.</div>
      )}
    </div>
  );
} 