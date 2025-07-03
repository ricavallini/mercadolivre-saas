import { useState } from "react";
import { CheckCircleIcon, ExclamationCircleIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

export function MeTab({ darkMode }: { darkMode: boolean }) {
  const [mlUser, setMlUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMLUser = async () => {
    setLoading(true);
    setError("");
    setMlUser(null);
    try {
      const token = localStorage.getItem("ml_access_token");
      const res = await fetch("/api/ml/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erro ao buscar dados do Mercado Livre");
      } else {
        setMlUser(data.data || data);
      }
    } catch (err) {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <button
        onClick={fetchMLUser}
        className="mb-4 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded shadow transition"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center gap-2"><ArrowPathIcon className="w-5 h-5 animate-spin" />Buscando...</span>
        ) : (
          <span>Atualizar Meus Dados</span>
        )}
      </button>
      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded p-3 mb-2">
          <ExclamationCircleIcon className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}
      {mlUser && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 w-full max-w-lg text-left transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircleIcon className="w-6 h-6 text-green-500" />
            <span className="font-bold text-lg">Dados do Usuário</span>
          </div>
          <div className="text-gray-700 dark:text-gray-200 text-sm mb-2">ID: <span className="font-mono">{mlUser.id}</span></div>
          <div className="text-gray-700 dark:text-gray-200 text-sm mb-2">Nome: <span className="font-semibold">{mlUser.nickname || mlUser.first_name + ' ' + mlUser.last_name}</span></div>
          <div className="text-gray-700 dark:text-gray-200 text-sm mb-2">E-mail: <span className="font-mono">{mlUser.email}</span></div>
          <div className="text-gray-700 dark:text-gray-200 text-sm mb-2">Tipo: <span className="font-semibold">{mlUser.user_type}</span></div>
          <div className="text-gray-700 dark:text-gray-200 text-sm">Conta criada em: <span className="font-mono">{mlUser.registration_date && new Date(mlUser.registration_date).toLocaleDateString()}</span></div>
        </div>
      )}
      {!mlUser && !loading && !error && (
        <div className="text-gray-400 mt-4">Clique em &quot;Atualizar Meus Dados&quot; para exibir suas informações.</div>
      )}
    </div>
  );
} 