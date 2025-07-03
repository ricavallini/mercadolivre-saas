import { useState } from "react";
import { CheckCircleIcon, ExclamationCircleIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

export function SendMessageTab({ darkMode }: { darkMode: boolean }) {
  const [orderId, setOrderId] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError("");
    try {
      const token = localStorage.getItem("ml_access_token");
      const res = await fetch("/api/ml/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderId, text }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erro ao enviar mensagem");
      } else {
        setResult("Mensagem enviada com sucesso!");
        setText("");
      }
    } catch (err) {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[300px] w-full">
      <form onSubmit={handleSend} className="mb-4 flex flex-col sm:flex-row gap-2 w-full max-w-xl">
        <input
          type="text"
          className="px-3 py-2 border rounded w-full"
          placeholder="ID da venda (orderId)"
          value={orderId}
          onChange={e => setOrderId(e.target.value)}
          required
        />
        <textarea
          className="px-3 py-2 border rounded w-full sm:w-64 align-top"
          placeholder="Mensagem ao comprador"
          value={text}
          onChange={e => setText(e.target.value)}
          required
          rows={3}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded shadow transition"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2"><ArrowPathIcon className="w-5 h-5 animate-spin" />Enviando...</span>
          ) : (
            <span>Enviar Mensagem</span>
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
        <div className="text-gray-400 mt-4">Digite o ID da venda, escreva a mensagem e clique em &quot;Enviar Mensagem&quot;.</div>
      )}
    </div>
  );
} 