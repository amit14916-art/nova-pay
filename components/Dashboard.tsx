
import React from 'react';
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';
import { Transaction, UserWallet } from '../types';
import { ArrowUpRight, ArrowDownLeft, Plus, Send, ScanLine, Wallet, QrCode } from 'lucide-react';

interface DashboardProps {
  wallet: UserWallet;
  transactions: Transaction[];
  onSendMoney: () => void;
  onRequestUPI: () => void;
}

const data = [
  { name: 'Mon', value: 2400 },
  { name: 'Tue', value: 1398 },
  { name: 'Wed', value: 9800 },
  { name: 'Thu', value: 3908 },
  { name: 'Fri', value: 4800 },
  { name: 'Sat', value: 3800 },
  { name: 'Sun', value: 4300 },
];

const Dashboard: React.FC<DashboardProps> = ({ wallet, transactions, onSendMoney, onRequestUPI }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">System Status: <span className="text-cyan-400">Optimal</span></h1>
          <p className="text-slate-400 mt-1">Welcome back, {wallet.owner}. Your portfolio is growing.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={onSendMoney} className="px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-2xl transition-all flex items-center space-x-2 shadow-lg shadow-cyan-500/20 active:scale-95">
            <Send size={18} />
            <span>Send Funds</span>
          </button>
          <button onClick={onRequestUPI} className="px-5 py-3 glass hover:bg-white/10 text-white font-bold rounded-2xl transition-all flex items-center space-x-2 border border-white/10 active:scale-95">
            <QrCode size={18} className="text-cyan-400" />
            <span>UPI Request</span>
          </button>
          <button className="p-3 glass hover:bg-white/10 rounded-2xl border border-white/10 transition-all text-white hidden sm:block">
            <ScanLine size={20} />
          </button>
        </div>
      </header>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 glass p-8 rounded-[2.5rem] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 font-medium uppercase tracking-widest text-xs">Total Balance</span>
              <Wallet className="text-cyan-500" size={20} />
            </div>
            <div className="flex items-baseline space-x-2">
              <h2 className="text-5xl font-extrabold text-white tracking-tighter">${wallet.balance.toLocaleString()}</h2>
              <span className="text-slate-500 font-semibold">{wallet.currency}</span>
            </div>
            <div className="mt-4 flex items-center space-x-2 text-emerald-400 text-sm font-medium">
              <div className="bg-emerald-400/10 px-2 py-0.5 rounded-lg flex items-center">
                <ArrowUpRight size={14} className="mr-1" />
                +12.4%
              </div>
              <span className="text-slate-500">vs last month</span>
            </div>
          </div>
          
          <div className="mt-8 h-48 w-full">
             <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                  itemStyle={{ color: '#22d3ee' }}
                />
                <Area type="monotone" dataKey="value" stroke="#06b6d4" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass p-6 rounded-[2.5rem] bg-gradient-to-br from-purple-500/10 to-transparent">
             <div className="flex items-center justify-between mb-4">
               <div className="p-3 bg-purple-500/20 rounded-2xl">
                 <ArrowDownLeft className="text-purple-400" size={20} />
               </div>
               <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Spent Today</span>
             </div>
             <p className="text-3xl font-bold text-white">$452.12</p>
             <div className="mt-2 text-xs text-slate-400">
               Across <span className="text-white">4 transactions</span>
             </div>
          </div>
          <div className="glass p-6 rounded-[2.5rem] bg-gradient-to-br from-cyan-500/10 to-transparent">
             <div className="flex items-center justify-between mb-4">
               <div className="p-3 bg-cyan-500/20 rounded-2xl">
                 <Plus className="text-cyan-400" size={20} />
               </div>
               <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Savings Goal</span>
             </div>
             <div className="flex items-end justify-between mb-2">
               <p className="text-3xl font-bold text-white">72%</p>
               <p className="text-xs text-slate-400">$3,500 / $5,000</p>
             </div>
             <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
               <div className="h-full bg-cyan-500 neon-glow-cyan" style={{ width: '72%' }}></div>
             </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white tracking-tight">Recent Activity</h3>
          <button className="text-cyan-400 text-sm font-semibold hover:underline">View All</button>
        </div>
        <div className="space-y-3">
          {transactions.map((t) => (
            <div key={t.id} className="glass flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all group">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  t.type === 'incoming' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                }`}>
                  {t.type === 'incoming' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                </div>
                <div>
                  <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">{t.recipient}</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">{t.category} • {new Date(t.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${t.type === 'incoming' ? 'text-emerald-400' : 'text-white'}`}>
                  {t.type === 'incoming' ? '+' : '-'}${t.amount.toFixed(2)}
                </p>
                <p className="text-[10px] text-slate-500 uppercase font-bold">Confirmed</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
