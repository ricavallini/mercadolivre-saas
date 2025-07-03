"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const TABS = [
  { key: "me", label: "Meus Dados" },
  { key: "products", label: "Produtos à Venda" },
  { key: "orders", label: "Vendas" },
  { key: "orderDetails", label: "Detalhes da Venda" },
  { key: "messages", label: "Mensagens" },
  { key: "shipping", label: "Etiquetas de Envio" },
  { key: "buyer", label: "Dados do Cliente" },
  { key: "updateOrder", label: "Atualizar Status" },
  { key: "sendMessage", label: "Enviar Mensagem" },
];

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("me");
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

  function renderTab() {
    switch (activeTab) {
      case "me":
        return (
          <div>
            <button
              className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-6 rounded mb-4"
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
        );
      case "products":
        return <ProductsTab />;
      case "orders":
        return <OrdersTab />;
      case "orderDetails":
        return <OrderDetailsTab />;
      case "messages":
        return <MessagesTab />;
      case "shipping":
        return <ShippingTab />;
      case "buyer":
        return <BuyerTab />;
      case "updateOrder":
        return <UpdateOrderTab />;
      case "sendMessage":
        return <SendMessageTab />;
      default:
        return null;
    }
  }

  function ProductsTab() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [total, setTotal] = useState(0);

    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      setProducts([]);
      try {
        const token = localStorage.getItem("ml_access_token");
        const res = await fetch("/api/ml/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Erro ao buscar produtos");
        } else {
          setProducts(data.products || []);
          setTotal(data.total || 0);
        }
      } catch (err) {
        setError("Erro de conexão");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div>
        <button
          className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-6 rounded mb-4"
          onClick={fetchProducts}
          disabled={loading}
        >
          {loading ? "Buscando produtos..." : "Listar Produtos à Venda"}
        </button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        {total > 0 && (
          <div className="mb-2 text-gray-700">Total de produtos ativos: {total}</div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((p: any, i: number) => (
            <div key={p.id || i} className="bg-white p-4 rounded shadow border text-left">
              <div className="font-bold text-blue-700 mb-1">{p.body?.title || p.title}</div>
              <div className="text-sm text-gray-600 mb-1">ID: {p.body?.id || p.id}</div>
              <div className="text-sm text-gray-600 mb-1">Preço: R$ {p.body?.price || p.price}</div>
              <div className="text-sm text-gray-600 mb-1">Estoque: {p.body?.available_quantity || p.available_quantity}</div>
              {p.body?.thumbnail || p.thumbnail ? (
                <img src={p.body?.thumbnail || p.thumbnail} alt="thumb" className="w-24 h-24 object-contain mt-2" />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    );
  }

  function OrdersTab() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [total, setTotal] = useState(0);

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
          setTotal(data.total || 0);
        }
      } catch (err) {
        setError("Erro de conexão");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div>
        <button
          className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-6 rounded mb-4"
          onClick={fetchOrders}
          disabled={loading}
        >
          {loading ? "Buscando vendas..." : "Listar Vendas"}
        </button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        {total > 0 && (
          <div className="mb-2 text-gray-700">Total de vendas: {total}</div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {orders.map((o: any, i: number) => (
            <div key={o.id || i} className="bg-white p-4 rounded shadow border text-left">
              <div className="font-bold text-blue-700 mb-1">Venda #{o.id}</div>
              <div className="text-sm text-gray-600 mb-1">Status: {o.status}</div>
              <div className="text-sm text-gray-600 mb-1">Data: {o.date_created?.slice(0, 10)}</div>
              <div className="text-sm text-gray-600 mb-1">Comprador: {o.buyer?.nickname}</div>
              <div className="text-sm text-gray-600 mb-1">Total: R$ {o.total_amount}</div>
              <div className="text-sm text-gray-600 mb-1">Itens: {o.order_items?.map((it: any) => it.item.title).join(", ")}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function OrderDetailsTab() {
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
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            fetchOrder();
          }}
          className="mb-4"
        >
          <input
            type="text"
            className="px-3 py-2 border rounded mr-2"
            placeholder="ID da venda (orderId)"
            value={orderId}
            onChange={e => setOrderId(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-6 rounded"
            disabled={loading}
          >
            {loading ? "Buscando..." : "Buscar Detalhes"}
          </button>
        </form>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        {order && (
          <div className="bg-white mt-4 p-4 rounded shadow text-left max-w-xl mx-auto overflow-x-auto">
            <pre className="text-xs whitespace-pre-wrap break-all">{JSON.stringify(order, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  }

  function MessagesTab() {
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
          setMessages(data.results || []);
        }
      } catch (err) {
        setError("Erro de conexão");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            fetchMessages();
          }}
          className="mb-4"
        >
          <input
            type="text"
            className="px-3 py-2 border rounded mr-2"
            placeholder="ID da venda (orderId)"
            value={orderId}
            onChange={e => setOrderId(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-6 rounded"
            disabled={loading}
          >
            {loading ? "Buscando..." : "Buscar Mensagens"}
          </button>
        </form>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        {messages.length > 0 && (
          <div className="bg-white mt-4 p-4 rounded shadow text-left max-w-xl mx-auto overflow-x-auto">
            <div className="font-bold mb-2">Mensagens:</div>
            <ul className="text-xs">
              {messages.map((msg: any, i: number) => (
                <li key={msg.id || i} className="mb-2 border-b pb-2">
                  <div><b>De:</b> {msg.sender?.user_id || msg.sender?.id}</div>
                  <div><b>Para:</b> {msg.recipients?.map((r: any) => r.user_id || r.id).join(", ")}</div>
                  <div><b>Mensagem:</b> {msg.text?.plain || msg.text}</div>
                  <div className="text-gray-500">{msg.date_created?.replace("T", " ").slice(0, 16)}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  function ShippingTab() {
    const [orderId, setOrderId] = useState("");
    const [shipping, setShipping] = useState<any>(null);
    const [labelUrl, setLabelUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchShipping = async () => {
      setLoading(true);
      setError("");
      setShipping(null);
      setLabelUrl(null);
      try {
        const token = localStorage.getItem("ml_access_token");
        const res = await fetch(`/api/ml/shipping?orderId=${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Erro ao buscar etiqueta");
        } else {
          setShipping(data.shipping);
          setLabelUrl(data.labelUrl);
        }
      } catch (err) {
        setError("Erro de conexão");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            fetchShipping();
          }}
          className="mb-4"
        >
          <input
            type="text"
            className="px-3 py-2 border rounded mr-2"
            placeholder="ID da venda (orderId)"
            value={orderId}
            onChange={e => setOrderId(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-6 rounded"
            disabled={loading}
          >
            {loading ? "Buscando..." : "Buscar Etiqueta"}
          </button>
        </form>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        {shipping && (
          <div className="bg-white mt-4 p-4 rounded shadow text-left max-w-xl mx-auto overflow-x-auto">
            <div className="font-bold mb-2">Dados de Envio:</div>
            <pre className="text-xs whitespace-pre-wrap break-all">{JSON.stringify(shipping, null, 2)}</pre>
          </div>
        )}
        {labelUrl && (
          <div className="mt-4">
            <a
              href={labelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded"
            >
              Baixar Etiqueta de Envio
            </a>
          </div>
        )}
      </div>
    );
  }

  function BuyerTab() {
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
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            fetchBuyer();
          }}
          className="mb-4"
        >
          <input
            type="text"
            className="px-3 py-2 border rounded mr-2"
            placeholder="ID da venda (orderId)"
            value={orderId}
            onChange={e => setOrderId(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-6 rounded"
            disabled={loading}
          >
            {loading ? "Buscando..." : "Buscar Cliente"}
          </button>
        </form>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        {buyer && (
          <div className="bg-white mt-4 p-4 rounded shadow text-left max-w-xl mx-auto overflow-x-auto">
            <div className="font-bold mb-2">Dados do Cliente:</div>
            <pre className="text-xs whitespace-pre-wrap break-all">{JSON.stringify(buyer, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  }

  function UpdateOrderTab() {
    const [orderId, setOrderId] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState("");

    // Status possíveis (exemplo: "paid", "cancelled", "confirmed", "shipped", "delivered")
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
      <div>
        <form onSubmit={handleUpdate} className="mb-4">
          <input
            type="text"
            className="px-3 py-2 border rounded mr-2"
            placeholder="ID da venda (orderId)"
            value={orderId}
            onChange={e => setOrderId(e.target.value)}
            required
          />
          <select
            className="px-3 py-2 border rounded mr-2"
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
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded"
            disabled={loading}
          >
            {loading ? "Atualizando..." : "Atualizar Status"}
          </button>
        </form>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        {result && <div className="text-green-600 mt-2">{result}</div>}
      </div>
    );
  }

  function SendMessageTab() {
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
      <div>
        <form onSubmit={handleSend} className="mb-4">
          <input
            type="text"
            className="px-3 py-2 border rounded mr-2"
            placeholder="ID da venda (orderId)"
            value={orderId}
            onChange={e => setOrderId(e.target.value)}
            required
          />
          <textarea
            className="px-3 py-2 border rounded mr-2 w-64 align-top"
            placeholder="Mensagem ao comprador"
            value={text}
            onChange={e => setText(e.target.value)}
            required
            rows={3}
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-6 rounded"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar Mensagem"}
          </button>
        </form>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        {result && <div className="text-green-600 mt-2">{result}</div>}
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="text-center max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-4">Dashboard - Micro-SaaS Mercado Livre</h1>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={`px-4 py-2 rounded font-bold border ${activeTab === tab.key ? "bg-blue-600 text-white" : "bg-white text-blue-600 border-blue-600"}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-8 min-h-[200px]">
          {renderTab()}
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
