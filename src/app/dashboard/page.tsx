"use client";
import { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { Tab, Dialog } from "@headlessui/react";
import { CheckCircleIcon, ExclamationCircleIcon, ArrowPathIcon, MoonIcon, SunIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";
import { MeTab } from "@/components/dashboard/MeTab";
import { ProductsTab } from "@/components/dashboard/ProductsTab";
import { OrdersTab } from "@/components/dashboard/OrdersTab";
import { OrderDetailsTab } from "@/components/dashboard/OrderDetailsTab";
import { MessagesTab } from "@/components/dashboard/MessagesTab";
import { ShippingTab } from "@/components/dashboard/ShippingTab";
import { BuyerTab } from "@/components/dashboard/BuyerTab";
import { UpdateOrderTab } from "@/components/dashboard/UpdateOrderTab";
import { SendMessageTab } from "@/components/dashboard/SendMessageTab";

function classNames(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const sidebarTabs = [
  { name: "Dashboard", icon: CheckCircleIcon },
  { name: "Meus Dados", icon: SunIcon },
  { name: "Produtos", icon: ArrowPathIcon },
  { name: "Vendas", icon: ArrowPathIcon },
  { name: "Detalhes", icon: ArrowPathIcon },
  { name: "Mensagens", icon: ArrowPathIcon },
  { name: "Etiquetas", icon: ArrowPathIcon },
  { name: "Cliente", icon: ArrowPathIcon },
  { name: "Status", icon: ArrowPathIcon },
  { name: "Mensagem", icon: ArrowPathIcon },
];

export default function Dashboard() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("ml_access_token");
      if (!token) {
        router.replace("/");
      }
    }
  }, [router]);

  useEffect(() => {
    const saved = localStorage.getItem("ml_dark_mode");
    if (saved === "true") setDarkMode(true);
    if (!localStorage.getItem("ml_onboarding_done")) setShowOnboarding(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("ml_dark_mode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("ml_dark_mode", "false");
    }
  }, [darkMode]);

  return (
    <div className={classNames(
      "min-h-screen flex transition-colors duration-300",
      darkMode ? "bg-gradient-to-br from-gray-900 to-blue-950" : "bg-gradient-to-br from-gray-50 to-blue-100"
    )}>
      {/* Sidebar */}
      <aside className={classNames(
        "fixed z-40 left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-transform duration-300",
        sidebarOpen ? "translate-x-0" : "-translate-x-64",
        "md:translate-x-0 md:static md:w-64"
      )}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <span className="text-xl font-bold text-blue-700 dark:text-blue-200">Mercado Livre</span>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <Bars3Icon className="w-7 h-7 text-blue-700 dark:text-blue-200" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          {sidebarTabs.map((tab, idx) => (
            <button
              key={tab.name}
              className={classNames(
                "flex items-center w-full px-6 py-3 text-left gap-3 font-semibold text-blue-700 dark:text-blue-200 hover:bg-blue-50 dark:hover:bg-gray-800 transition",
                selectedIndex === idx && "bg-blue-100 dark:bg-blue-800/40"
              )}
              onClick={() => { setSelectedIndex(idx); setSidebarOpen(false); }}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <button
            className="p-2 rounded-full border border-blue-200 dark:border-gray-700 bg-blue-50 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 transition"
            title={darkMode ? "Modo claro" : "Modo escuro"}
            onClick={() => setDarkMode(d => !d)}
          >
            {darkMode ? <SunIcon className="w-6 h-6 text-yellow-300" /> : <MoonIcon className="w-6 h-6 text-blue-700" />}
          </button>
        </div>
      </aside>
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      {/* Main content */}
      <main className="flex-1 ml-0 md:ml-64 min-h-screen transition-all duration-300">
        <div className="md:hidden flex items-center justify-between px-4 py-2">
          <button onClick={() => setSidebarOpen(true)}>
            <Bars3Icon className="w-7 h-7 text-blue-700 dark:text-blue-200" />
          </button>
          <span className="text-lg font-bold text-blue-700 dark:text-blue-200">Menu</span>
        </div>
        <div className="p-4 md:p-8">
          {selectedIndex === 0 && (
            <div>
              {/* Dashboard principal (mini paineis inteligentes) */}
              <div className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-200">
                Bem-vindo ao seu Dashboard!
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Exemplo de mini painel */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 transition-all duration-300">
                  <div className="text-gray-500 dark:text-gray-300 text-sm mb-2">
                    Vendas hoje
                  </div>
                  <div className="text-3xl font-bold text-blue-700 dark:text-blue-200">
                    {/* Aqui pode entrar um insight de IA */}
                    12
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    +3 vs ontem
                  </div>
                </div>
                {/* Adicione outros cards inteligentes aqui */}
              </div>
            </div>
          )}
          {selectedIndex === 1 && <MeTab darkMode={darkMode} />}
          {selectedIndex === 2 && <ProductsTab darkMode={darkMode} />}
          {selectedIndex === 3 && <OrdersTab darkMode={darkMode} />}
          {selectedIndex === 4 && <OrderDetailsTab darkMode={darkMode} />}
          {selectedIndex === 5 && <MessagesTab darkMode={darkMode} />}
          {selectedIndex === 6 && <ShippingTab darkMode={darkMode} />}
          {selectedIndex === 7 && <BuyerTab darkMode={darkMode} />}
          {selectedIndex === 8 && <UpdateOrderTab darkMode={darkMode} />}
          {selectedIndex === 9 && <SendMessageTab darkMode={darkMode} />}
        </div>
      </main>
    </div>
  );
}
