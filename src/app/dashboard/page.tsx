"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Tab } from "@headlessui/react";
import { CheckCircleIcon, ExclamationCircleIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const tabs = [
  { name: "Meus Dados" },
  { name: "Produtos à venda" },
  { name: "Vendas" },
  { name: "Detalhes da venda" },
  { name: "Mensagens" },
  { name: "Etiquetas de envio" },
  { name: "Dados do Cliente" },
  { name: "Atualizar status do pedido" },
  { name: "Enviar mensagem ao comprador" },
];

export default function Dashboard() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);
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
        setMlUser(data.data || data);
      }
    } catch (err) {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 flex flex-col items-center py-8 px-2">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-3xl font-bold text-blue-800 mb-2 text-center">Dashboard Mercado Livre</h1>
        <p className="text-gray-500 mb-6 text-center">Gerencie sua conta Mercado Livre de forma simples, rápida e segura.</p>
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-50 p-1 mb-6 overflow-x-auto">
            {tabs.map((tab, idx) => (
              <Tab
                key={tab.name}
                className={({ selected }: { selected: boolean }) =>
                  classNames(
                    "w-full py-2.5 px-4 text-sm leading-5 font-semibold rounded-lg",
                    selected
                      ? "bg-blue-600 text-white shadow"
                      : "text-blue-700 hover:bg-blue-100 hover:text-blue-900"
                  )
                }
              >
                {tab.name}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel><MeTab /></Tab.Panel>
            <Tab.Panel><ProductsTab /></Tab.Panel>
            <Tab.Panel><OrdersTab /></Tab.Panel>
            <Tab.Panel><OrderDetailsTab /></Tab.Panel>
            <Tab.Panel><MessagesTab /></Tab.Panel>
            <Tab.Panel><ShippingTab /></Tab.Panel>
            <Tab.Panel><BuyerTab /></Tab.Panel>
            <Tab.Panel><UpdateOrderTab /></Tab.Panel>
            <Tab.Panel><SendMessageTab /></Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}

function MeTab() {
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
        <div className="bg-white rounded-xl shadow p-6 w-full max-w-lg text-left">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircleIcon className="w-6 h-6 text-green-500" />
            <span className="font-bold text-lg">Dados do Usuário</span>
          </div>
          <div className="text-gray-700 text-sm mb-2">ID: <span className="font-mono">{mlUser.id}</span></div>
          <div className="text-gray-700 text-sm mb-2">Nome: <span className="font-semibold">{mlUser.nickname || mlUser.first_name + ' ' + mlUser.last_name}</span></div>
          <div className="text-gray-700 text-sm mb-2">E-mail: <span className="font-mono">{mlUser.email}</span></div>
          <div className="text-gray-700 text-sm mb-2">Tipo: <span className="font-semibold">{mlUser.user_type}</span></div>
          <div className="text-gray-700 text-sm">Conta criada em: <span className="font-mono">{mlUser.registration_date && new Date(mlUser.registration_date).toLocaleDateString()}</span></div>
        </div>
      )}
      {!mlUser && !loading && !error && (
        <div className="text-gray-400 mt-4">Clique em "Atualizar Meus Dados" para exibir suas informações.</div>
      )}
    </div>
  );
}

function ProductsTab() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      }
    } catch (err) {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[300px]">
      <button
        onClick={fetchProducts}
        className="mb-4 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded shadow transition"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center gap-2"><ArrowPathIcon className="w-5 h-5 animate-spin" />Buscando...</span>
        ) : (
          <span>Atualizar Produtos</span>
        )}
      </button>
      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded p-3 mb-2">
          <ExclamationCircleIcon className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}
      {products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
          {products.map((prod: any) => (
            <div key={prod.id} className="bg-white rounded-xl shadow p-4 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-blue-700 text-lg truncate" title={prod.title}>{prod.title}</span>
              </div>
              <div className="text-gray-700 text-sm mb-1">ID: <span className="font-mono">{prod.id}</span></div>
              <div className="text-gray-700 text-sm mb-1">Preço: <span className="font-semibold">R$ {prod.price?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span></div>
              <div className="text-gray-700 text-sm mb-1">Estoque: <span className="font-semibold">{prod.available_quantity}</span></div>
              <div className="text-gray-700 text-sm mb-1">Status: <span className="font-semibold">{prod.status}</span></div>
              {prod.thumbnail && (
                <img src={prod.thumbnail} alt={prod.title} className="w-24 h-24 object-contain mt-2 self-center rounded" />
              )}
            </div>
          ))}
        </div>
      )}
      {products.length === 0 && !loading && !error && (
        <div className="text-gray-400 mt-4">Clique em "Atualizar Produtos" para exibir seus produtos ativos.</div>
      )}
    </div>
  );
}

function OrdersTab() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      }
    } catch (err) {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[300px]">
      <button
        onClick={fetchOrders}
        className="mb-4 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded shadow transition"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center gap-2"><ArrowPathIcon className="w-5 h-5 animate-spin" />Buscando...</span>
        ) : (
          <span>Atualizar Vendas</span>
        )}
      </button>
      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded p-3 mb-2">
          <ExclamationCircleIcon className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}
      {orders.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
          {orders.map((order: any) => (
            <div key={order.id} className="bg-white rounded-xl shadow p-4 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-blue-700 text-lg truncate" title={order.title}>{order.title || order.order_items?.[0]?.item?.title || 'Venda'}</span>
                <span className={
                  order.status === 'paid' ? 'bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs ml-auto' :
                  order.status === 'cancelled' ? 'bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs ml-auto' :
                  'bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs ml-auto'
                }>{order.status}</span>
              </div>
              <div className="text-gray-700 text-sm mb-1">ID: <span className="font-mono">{order.id}</span></div>
              <div className="text-gray-700 text-sm mb-1">Valor: <span className="font-semibold">R$ {order.total_amount?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span></div>
              <div className="text-gray-700 text-sm mb-1">Comprador: <span className="font-semibold">{order.buyer?.nickname || order.buyer?.first_name}</span></div>
              <div className="text-gray-700 text-sm mb-1">Data: <span className="font-mono">{order.date_created && new Date(order.date_created).toLocaleString()}</span></div>
              <div className="text-gray-700 text-sm mb-1">Pagamento: <span className="font-semibold">{order.payments?.[0]?.status || '-'}</span></div>
              <div className="text-gray-700 text-sm mb-1">Entrega: <span className="font-semibold">{order.fulfillment?.shipment?.status || order.shipping?.status || '-'}</span></div>
            </div>
          ))}
        </div>
      )}
      {orders.length === 0 && !loading && !error && (
        <div className="text-gray-400 mt-4">Clique em "Atualizar Vendas" para exibir suas últimas vendas.</div>
      )}
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
        <div className="bg-white rounded-xl shadow p-6 w-full max-w-lg text-left">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircleIcon className="w-6 h-6 text-green-500" />
            <span className="font-bold text-lg">Detalhes da Venda</span>
          </div>
          <div className="text-gray-700 text-sm mb-2">ID: <span className="font-mono">{order.id}</span></div>
          <div className="text-gray-700 text-sm mb-2">Status: <span className="font-semibold">{order.status}</span></div>
          <div className="text-gray-700 text-sm mb-2">Valor: <span className="font-semibold">R$ {order.total_amount?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span></div>
          <div className="text-gray-700 text-sm mb-2">Comprador: <span className="font-semibold">{order.buyer?.nickname || order.buyer?.first_name}</span></div>
          <div className="text-gray-700 text-sm mb-2">Data: <span className="font-mono">{order.date_created && new Date(order.date_created).toLocaleString()}</span></div>
          <div className="text-gray-700 text-sm mb-2">Pagamento: <span className="font-semibold">{order.payments?.[0]?.status || '-'}</span></div>
          <div className="text-gray-700 text-sm mb-2">Entrega: <span className="font-semibold">{order.fulfillment?.shipment?.status || order.shipping?.status || '-'}</span></div>
          <div className="text-gray-700 text-sm mb-2">Itens:</div>
          <ul className="list-disc ml-6 text-gray-700 text-sm">
            {order.order_items?.map((it: any) => (
              <li key={it.item.id}>
                {it.item.title} <span className="text-gray-400">(SKU: {it.item.seller_sku})</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {!order && !loading && !error && (
        <div className="text-gray-400 mt-4">Digite o ID da venda e clique em "Buscar Detalhes".</div>
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
            <div key={msg.id || idx} className="bg-white rounded-xl shadow p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-blue-700 text-sm">{msg.from?.user_id ? `Remetente: ${msg.from.user_id}` : "Mensagem"}</span>
                <span className="text-gray-400 text-xs ml-auto">{msg.date_created && new Date(msg.date_created).toLocaleString()}</span>
              </div>
              <div className="text-gray-700 text-sm whitespace-pre-line">{msg.text?.plain || msg.text}</div>
            </div>
          ))}
        </div>
      )}
      {messages.length === 0 && !loading && !error && (
        <div className="text-gray-400 mt-4">Digite o ID da venda e clique em "Buscar Mensagens".</div>
      )}
    </div>
  );
}

function ShippingTab() {
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
        <div className="bg-white rounded-xl shadow p-6 w-full max-w-lg text-left">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircleIcon className="w-6 h-6 text-green-500" />
            <span className="font-bold text-lg">Dados de Envio</span>
          </div>
          <div className="text-gray-700 text-sm mb-2">ID do Envio: <span className="font-mono">{shipping.id}</span></div>
          <div className="text-gray-700 text-sm mb-2">Status: <span className="font-semibold">{shipping.status}</span></div>
          <div className="text-gray-700 text-sm mb-2">Endereço: <span className="font-semibold">{shipping.receiver_address?.address_line}, {shipping.receiver_address?.city?.name} - {shipping.receiver_address?.state?.name}</span></div>
          <div className="text-gray-700 text-sm mb-2">Tipo: <span className="font-semibold">{shipping.shipping_mode}</span></div>
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
        <div className="text-gray-400 mt-4">Digite o ID da venda e clique em "Buscar Etiqueta".</div>
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
        <div className="bg-white rounded-xl shadow p-6 w-full max-w-lg text-left">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircleIcon className="w-6 h-6 text-green-500" />
            <span className="font-bold text-lg">Dados do Cliente</span>
          </div>
          <div className="text-gray-700 text-sm mb-2">ID: <span className="font-mono">{buyer.id}</span></div>
          <div className="text-gray-700 text-sm mb-2">Nome: <span className="font-semibold">{buyer.nickname || buyer.first_name + ' ' + buyer.last_name}</span></div>
          <div className="text-gray-700 text-sm mb-2">E-mail: <span className="font-mono">{buyer.email}</span></div>
          <div className="text-gray-700 text-sm mb-2">Tipo: <span className="font-semibold">{buyer.user_type}</span></div>
          <div className="text-gray-700 text-sm">Conta criada em: <span className="font-mono">{buyer.registration_date && new Date(buyer.registration_date).toLocaleDateString()}</span></div>
        </div>
      )}
      {!buyer && !loading && !error && (
        <div className="text-gray-400 mt-4">Digite o ID da venda e clique em "Buscar Cliente".</div>
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
        <div className="text-gray-400 mt-4">Digite o ID da venda, selecione o status e clique em "Atualizar Status".</div>
      )}
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
        <div className="text-gray-400 mt-4">Digite o ID da venda, escreva a mensagem e clique em "Enviar Mensagem".</div>
      )}
    </div>
  );
}
