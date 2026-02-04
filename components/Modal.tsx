
import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="glass w-full max-w-lg rounded-[2.5rem] relative z-10 border border-white/10 shadow-2xl animate-in zoom-in-95 duration-200">
        <header className="p-8 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-slate-400 transition-colors">
            <X size={24} />
          </button>
        </header>
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
