
import React from 'react';
import { Home, CreditCard, PieChart, MessageSquare, Settings, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', icon: <Home size={20} />, label: 'Home' },
    { id: 'cards', icon: <CreditCard size={20} />, label: 'Wallet' },
    { id: 'stats', icon: <PieChart size={20} />, label: 'Analytics' },
    { id: 'ai', icon: <MessageSquare size={20} />, label: 'Nova AI' },
  ];

  return (
    <div className="flex h-screen bg-[#050505] text-slate-200 overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 glass border-r border-white/5 p-6 space-y-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center neon-glow-cyan">
            <CreditCard className="text-black" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white neon-text-cyan">NOVAPAY</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeTab === item.id 
                  ? 'bg-white/10 text-cyan-400 border border-white/10 shadow-lg' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-white/5">
          <button className="w-full flex items-center space-x-4 px-4 py-3 text-slate-400 hover:text-white transition-colors">
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </button>
          <div className="mt-4 flex items-center space-x-3 p-3 bg-white/5 rounded-2xl border border-white/10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 p-[2px]">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate">Alex Rivera</p>
              <p className="text-xs text-slate-500 truncate">Premium Member</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative p-4 md:p-8">
        <div className="max-w-6xl mx-auto pb-24 md:pb-0">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-white/10 px-6 py-4 flex justify-between items-center z-50">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center space-y-1 ${
              activeTab === item.id ? 'text-cyan-400' : 'text-slate-500'
            }`}
          >
            {item.icon}
            <span className="text-[10px] uppercase tracking-widest font-bold">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
