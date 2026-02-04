
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { getFinancialInsights } from '../services/geminiService';
import { Transaction, ChatMessage } from '../types';

interface AIAssistantProps {
  transactions: Transaction[];
  onAIAction?: (args: any) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ transactions, onAIAction }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Greeting, I am Nova. I can help you analyze spending or prepare payments. Just say "Pay $20 to mom@upi".' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    const response = await getFinancialInsights(transactions, userMessage, onAIAction);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] glass rounded-[2.5rem] overflow-hidden border border-white/10">
      <header className="px-8 py-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center neon-glow-cyan"><Bot className="text-black" /></div>
          <h2 className="text-xl font-bold text-white tracking-tight">Nova Assistant</h2>
        </div>
      </header>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] flex items-start space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${msg.role === 'assistant' ? 'bg-cyan-500 text-black' : 'bg-white/10 text-white'}`}>
                {msg.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className={`p-4 rounded-2xl ${msg.role === 'assistant' ? 'bg-white/5 text-slate-200 border border-white/10' : 'bg-cyan-500 text-black font-medium'}`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          </div>
        ))}
        {isTyping && <Loader2 size={16} className="animate-spin text-cyan-400 mx-auto" />}
      </div>
      <form onSubmit={handleSend} className="p-6 bg-white/5 border-t border-white/5">
        <div className="relative">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask Nova..." className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-white focus:border-cyan-500 outline-none" />
          <button type="submit" className="absolute right-2 top-2 bottom-2 w-10 bg-cyan-500 text-black rounded-xl flex items-center justify-center"><Send size={18} /></button>
        </div>
      </form>
    </div>
  );
};

export default AIAssistant;
