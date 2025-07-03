import { useState } from "react";
import { ExclamationCircleIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

export function MessagesTab({ darkMode }: { darkMode: boolean }) {
  const [orderId, setOrderId] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMessages = async () => {
    setLoading(true);
    setError("");
    setMessages([]);
    try {
      const token = localStorage.getItem("ml_access_token");
      const res = await fetch(`/api/ml/messages?orderId=${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erro ao buscar mensagens");
      } else {
        setMessages(data.results || data.messages || []);
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
          fetchMessages();
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
            <span>Buscar Mensagens</span>
          )}
        </button>
      </form>
      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded p-3 mb-2">
          <ExclamationCircleIcon className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}
      {messages.length > 0 && (
        <div className="flex flex-col gap-4 w-full max-w-2xl">
          {messages.map((msg: any, idx: number) => (
            <div key={msg.id || idx} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 transition-all duration-300">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-blue-700 dark:text-blue-200 text-sm">{msg.from?.user_id ? `Remetente: ${msg.from.user_id}` : "Mensagem"}</span>
                <span className="text-gray-400 text-xs ml-auto">{msg.date_created && new Date(msg.date_created).toLocaleString()}</span>
              </div>
              <div className="text-gray-700 dark:text-gray-200 text-sm whitespace-pre-line">{msg.text?.plain || msg.text}</div>
            </div>
          ))}
        </div>
      )}
      {messages.length === 0 && !loading && !error && (
        <div className="text-gray-400 mt-4">Digite o ID da venda e clique em &quot;Buscar Mensagens&quot;.</div>
      )}
    </div>
  );
} 