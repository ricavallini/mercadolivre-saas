import { Bars3Icon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { sidebarTabs } from "./tabs";
import { classNames } from "./utils";

type SidebarTab = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
};

export function Sidebar({
  selectedIndex,
  setSelectedIndex,
  darkMode,
  setDarkMode,
  sidebarOpen,
  setSidebarOpen
}: {
  selectedIndex: number;
  setSelectedIndex: (idx: number) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (val: boolean) => void;
}) {
  return (
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
        {sidebarTabs.map((tab: SidebarTab, idx: number) => (
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
  );
} 