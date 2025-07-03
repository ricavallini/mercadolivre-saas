"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [mlUser, setMlUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("ml_access_token");
      if (!token) {
        router.replace("/");
      }
    }
  }, [router]);

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
        setMlUser(data);
      }
    } catch (err) {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Dashboard - Micro-SaaS</h1>
        <p className="text-lg mb-8">Seu access token do Mercado Livre está salvo localmente!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Status da Conexão</h2>
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-green-600 font-medium">Token presente</span>
            </div>
            <p className="text-gray-600 text-sm">O access token está salvo no navegador.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Próximos Passos</h2>
            <ul className="text-left text-gray-600 space-y-2">
              <li>• Sincronizar vendas do Mercado Livre</li>
              <li>• Gerar etiquetas de envio</li>
              <li>• Extrair telefones dos clientes</li>
              <li>• Configurar notificações</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-8">
          <h3 className="text-lg font-semibold mb-3 text-blue-800">Funcionalidades Disponíveis</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 font-bold">📦</span>
              </div>
              <p className="font-medium">Gerenciar Vendas</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 font-bold">🏷️</span>
              </div>
              <p className="font-medium">Etiquetas de Envio</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 font-bold">📱</span>
              </div>
              <p className="font-medium">Extração de Telefones</p>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <button
            className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-6 rounded"
            onClick={fetchMLUser}
            disabled={loading}
          >
            {loading ? "Buscando dados..." : "Ver dados do Mercado Livre"}
          </button>
          {error && <div className="text-red-500 mt-2">{error}</div>}
          {mlUser && (
            <div className="bg-white mt-4 p-4 rounded shadow text-left max-w-xl mx-auto overflow-x-auto">
              <pre className="text-xs whitespace-pre-wrap break-all">{JSON.stringify(mlUser, null, 2)}</pre>
            </div>
          )}
        </div>
        
        <div className="mt-8">
          <a href="/" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-4">
            Voltar ao Início
          </a>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              localStorage.removeItem("ml_access_token");
              router.replace("/");
            }}
          >
            Sair
          </button>
        </div>
      </div>
    </main>
  );
}
