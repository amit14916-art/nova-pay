
import React from 'react';
import { QrCode, Copy, Share2, Check, ExternalLink } from 'lucide-react';

interface UPIRequestModalProps {
  amount: string;
  upiId: string;
  name: string;
}

const UPIRequestModal: React.FC<UPIRequestModalProps> = ({ amount, upiId, name }) => {
  const [copied, setCopied] = React.useState(false);
  
  // Real standard UPI payment URI
  const upiUri = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=USD&tn=NovaPayTransfer`;
  // Using an external QR API with clean colors
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiUri)}&color=06b6d4&bgcolor=00000000`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(upiUri);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center space-y-6 py-4">
      <a href={upiUri} target="_blank" rel="noopener noreferrer" className="relative group cursor-pointer transition-transform hover:scale-105 active:scale-95">
        <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
        <div className="relative bg-black p-8 rounded-[2.5rem] border border-white/10 flex flex-col items-center">
          <img src={qrUrl} alt="UPI QR" className="w-52 h-52 rounded-2xl" />
          <div className="mt-4 flex items-center space-x-2 text-cyan-400">
            <ExternalLink size={14} />
            <span className="text-[10px] uppercase font-bold tracking-widest">Click to open in App</span>
          </div>
        </div>
      </a>

      <div className="w-full space-y-4">
        <div className="text-center">
          <p className="text-4xl font-black text-white tracking-tighter">${parseFloat(amount || '0').toFixed(2)}</p>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Direct Network Request</p>
        </div>

        <div className="bg-white/5 rounded-2xl p-4 border border-white/10 group cursor-pointer hover:bg-white/10 transition-all" onClick={copyToClipboard}>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Copy UPI / VPA</p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-mono text-cyan-400">{upiId}</span>
            {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} className="text-slate-500" />}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="py-4 glass hover:bg-white/10 rounded-2xl border border-white/10 flex items-center justify-center space-x-2 text-white font-bold transition-all">
            <Share2 size={18} />
            <span>Share</span>
          </button>
          <a href={upiUri} className="py-4 bg-cyan-500 hover:bg-cyan-400 rounded-2xl flex items-center justify-center space-x-2 text-black font-bold transition-all">
             <QrCode size={18} />
             <span>Pay Now</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default UPIRequestModal;
