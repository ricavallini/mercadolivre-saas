"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) {
      setError("Cole seu access token do Mercado Livre.");
      return;
    }
    localStorage.setItem("ml_access_token", token.trim());
    setError("");
    router.push("/dashboard");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center max-w-4xl">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Micro-SaaS Mercado Livre
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Cole seu <b>Access Token</b> do Mercado Livre para acessar o dashboard.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mb-8">
          <input
            type="text"
            className="w-full max-w-md px-4 py-2 border rounded mb-2"
            placeholder="Cole aqui seu access token..."
            value={token}
            onChange={e => setToken(e.target.value)}
            autoFocus
          />
          <br />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded mt-2"
          >
            Acessar Dashboard
          </button>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </form>
        <div className="text-sm text-gray-500">
          <p>Para obter seu access token, acesse o Mercado Livre e gere um token manualmente.</p>
        </div>
      </div>
    </main>
  );
}
