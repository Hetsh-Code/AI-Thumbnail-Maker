
import React, { useState, useRef, useEffect } from 'react';
import { startPerformanceChat } from '../services/geminiService';
import { ChatMessage } from '../types';

const PerformanceChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chatRef.current) {
      chatRef.current = startPerformanceChat([]);
    }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = { role: 'user' as const, text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: input });
      setMessages(prev => [...prev, { role: 'model', text: response.text }]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="view-animate flex flex-col h-[calc(100vh-140px)] py-8 max-w-4xl mx-auto">
      <div className="bg-red-600/10 border border-red-600/20 rounded-3xl p-6 mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
          Channel Performance Analyst
        </h2>
        <p className="text-sm text-white/50 mt-1">Ask me about your CTR, niche trends, or content strategy.</p>
      </div>

      <div ref={scrollRef} className="flex-1 bg-white/5 border border-white/10 rounded-[2rem] p-6 overflow-y-auto space-y-4 mb-4">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
            <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <p>Start a conversation to improve your channel.</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl ${m.role === 'user' ? 'bg-red-600 text-white' : 'bg-white/10 text-white/80'}`}>
              <p className="text-sm leading-relaxed">{m.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/5 p-4 rounded-2xl animate-pulse text-white/30 text-xs font-bold uppercase tracking-widest">
              AI Thinking...
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="e.g. How can I improve CTR for gaming videos?"
          className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 pr-16 outline-none focus:ring-2 focus:ring-red-600 transition-all"
        />
        <button 
          onClick={handleSend}
          className="absolute right-3 top-3 bottom-3 aspect-square bg-red-600 hover:bg-red-700 rounded-xl flex items-center justify-center transition-colors shadow-lg shadow-red-600/20"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PerformanceChat;
