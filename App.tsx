
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import AIAssistant from './components/AIAssistant';
import Modal from './components/Modal';
import UPIRequestModal from './components/UPIRequestModal';
import { INITIAL_WALLET, INITIAL_TRANSACTIONS, CATEGORIES } from './constants';
import { Transaction, UserWallet } from './types';
import { DollarSign, User, AtSign, ShieldCheck, Loader2, CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [wallet, setWallet] = useState<UserWallet>(() => {
    const saved = localStorage.getItem('novapay_wallet');
    return saved ? JSON.parse(saved) : INITIAL_WALLET;
  });
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('novapay_txs');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });
  
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [processingState, setProcessingState] = useState<'idle' | 'verifying' | 'transferring' | 'success'>('idle');
  
  const [sendForm, setSendForm] = useState({
    recipient: '',
    amount: '',
    category: 'Shopping',
    note: '',
    isUPI: false
  });

  const [requestForm, setRequestForm] = useState({
    amount: '',
    upiId: 'alex.rivera@novabank'
  });

  // Persist data
  useEffect(() => {
    localStorage.setItem('novapay_wallet', JSON.stringify(wallet));
    localStorage.setItem('novapay_txs', JSON.stringify(transactions));
  }, [wallet, transactions]);

  const handleSendMoney = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(sendForm.amount);
    if (!sendForm.recipient || isNaN(amount) || amount <= 0) return;
    if (amount > wallet.balance) {
      alert("Insufficient funds in your neural link wallet.");
      return;
    }

    // Start Simulation
    setProcessingState('verifying');
    await new Promise(r => setTimeout(r, 1500)); // Simulating biometric auth
    
    setProcessingState('transferring');
    await new Promise(r => setTimeout(r, 2000)); // Simulating ledger update

    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'outgoing',
      amount,
      recipient: sendForm.recipient,
      category: sendForm.category,
      date: new Date().toISOString(),
      note: sendForm.note
    };

    setTransactions([newTransaction, ...transactions]);
    setWallet(prev => ({ ...prev, balance: prev.balance - amount }));
    setProcessingState('success');
    
    setTimeout(() => {
      setProcessingState('idle');
      setIsSendModalOpen(false);
      setSendForm({ recipient: '', amount: '', category: 'Shopping', note: '', isUPI: false });
    }, 2000);
  };

  const handleAIAction = (args: any) => {
    setSendForm({
      recipient: args.recipient || '',
      amount: args.amount?.toString() || '',
      category: args.category || 'Shopping',
      note: 'Requested via Nova AI',
      isUPI: args.recipient?.includes('@') || false
    });
    setIsSendModalOpen(true);
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'dashboard' && (
        <Dashboard 
          wallet={wallet} 
          transactions={transactions} 
          onSendMoney={() => setIsSendModalOpen(true)} 
          onRequestUPI={() => setIsRequestModalOpen(true)}
        />
      )}
      {activeTab === 'ai' && <AIAssistant transactions={transactions} onAIAction={handleAIAction} />}
      {activeTab === 'cards' && (
        <div className="space-y-8 animate-in fade-in">
           <h2 className="text-3xl font-bold text-white tracking-tight">Your Digital Wallet</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-[1.58/1] glass rounded-[2.5rem] p-8 border border-white/10 relative overflow-hidden bg-gradient-to-br from-cyan-500/10 to-purple-500/10">
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-8 bg-white/20 rounded-md backdrop-blur-xl"></div>
                    <ShieldCheck className="text-cyan-400" />
                  </div>
                  <p className="text-2xl font-bold tracking-[0.2em]">•••• •••• •••• {wallet.cardLastFour}</p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-bold">Holder</p>
                      <p className="font-bold">{wallet.owner}</p>
                    </div>
                    <p className="font-mono text-sm">12/28</p>
                  </div>
                </div>
              </div>
              <div className="glass p-8 rounded-[2.5rem] border border-white/10 flex flex-col justify-center space-y-4">
                <h3 className="font-bold text-lg">Active Identifiers</h3>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center">
                  <span className="text-sm font-mono text-cyan-400">alex.rivera@novabank</span>
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded-full font-bold">UPI</span>
                </div>
              </div>
           </div>
        </div>
      )}
      {activeTab === 'stats' && <div className="p-8 glass rounded-[2.5rem] text-center">Analytics Module Online. Processing Data...</div>}

      {/* Send Modal with Processing States */}
      <Modal isOpen={isSendModalOpen} onClose={() => processingState === 'idle' && setIsSendModalOpen(false)} title="Neural Transfer">
        {processingState === 'idle' ? (
          <form onSubmit={handleSendMoney} className="space-y-6">
            <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
              <button type="button" onClick={() => setSendForm({ ...sendForm, isUPI: false })} className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${!sendForm.isUPI ? 'bg-cyan-500 text-black' : 'text-slate-400'}`}>Wallet</button>
              <button type="button" onClick={() => setSendForm({ ...sendForm, isUPI: true })} className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${sendForm.isUPI ? 'bg-cyan-500 text-black' : 'text-slate-400'}`}>UPI</button>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input required type="text" value={sendForm.recipient} onChange={e => setSendForm({ ...sendForm, recipient: e.target.value })} placeholder={sendForm.isUPI ? "user@bank" : "Nova ID"} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-cyan-500 outline-none" />
              </div>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input required type="number" step="0.01" value={sendForm.amount} onChange={e => setSendForm({ ...sendForm, amount: e.target.value })} placeholder="0.00" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-xl font-bold outline-none focus:border-cyan-500" />
              </div>
            </div>
            <button type="submit" className="w-full py-5 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-lg rounded-[2rem] shadow-xl shadow-cyan-500/20 transition-all active:scale-95">Initiate Neural Link</button>
          </form>
        ) : (
          <div className="flex flex-col items-center py-12 space-y-6">
            {processingState === 'verifying' && (
              <>
                <Loader2 className="animate-spin text-cyan-400" size={48} />
                <div className="text-center">
                  <p className="text-xl font-bold text-white">Verifying Biometrics</p>
                  <p className="text-slate-500 text-sm">Securing neural tunnel...</p>
                </div>
              </>
            )}
            {processingState === 'transferring' && (
              <>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 animate-[shimmer_2s_infinite]" style={{ width: '60%' }}></div>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-white">Updating Ledger</p>
                  <p className="text-slate-500 text-sm">Broadcasting to network...</p>
                </div>
              </>
            )}
            {processingState === 'success' && (
              <>
                <CheckCircle2 className="text-emerald-400" size={64} />
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">Transfer Complete</p>
                  <p className="text-slate-500 text-sm">Funds have been dispatched.</p>
                </div>
              </>
            )}
          </div>
        )}
      </Modal>

      <Modal isOpen={isRequestModalOpen} onClose={() => setIsRequestModalOpen(false)} title="Request Funds">
        <form onSubmit={(e) => { e.preventDefault(); setIsRequestModalOpen(false); setIsQRModalOpen(true); }} className="space-y-6">
          <div className="relative">
            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input required type="number" value={requestForm.amount} onChange={e => setRequestForm({ ...requestForm, amount: e.target.value })} placeholder="Enter amount" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-bold outline-none" />
          </div>
          <button type="submit" className="w-full py-5 bg-white text-black font-extrabold text-lg rounded-[2rem] active:scale-95 transition-all">Generate QR</button>
        </form>
      </Modal>

      <Modal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} title="Scan to Pay">
        <UPIRequestModal amount={requestForm.amount} upiId={requestForm.upiId} name={wallet.owner} />
      </Modal>
    </Layout>
  );
};

export default App;
