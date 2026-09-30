import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../store/AuthContext';

export default function Chatbot() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{sender: 'bot' | 'user', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const toggleChat = () => {
    if (!isOpen && messages.length === 0) {
      setMessages([{
        sender: 'bot',
        text: `Hi ${user?.username || "there"}! I'm your Shopluxe AI Assistant. How can I help you today?`
      }]);
    }
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    let reply = 'I understand. I am currently a prototype AI, but I can help you with orders, pricing, shipping, products, or your account!';
    const lowerMsg = userMsg.toLowerCase();
    
    try {
      const res = await axios.get('http://localhost:8080/api/products');
      const products = res.data.data;
      
      if (lowerMsg.includes('hi') || lowerMsg.includes('hello') || lowerMsg.includes('hey')) {
        reply = 'Hello! Welcome to Shopluxe. How can I assist you today?';
      } else if (lowerMsg.includes('order') || lowerMsg.includes('track')) {
        reply = 'You can track all your recent orders in the My Orders tab on your dashboard. If you are an Admin, check the Fulfillment center.';
      } else if (lowerMsg.includes('price') || lowerMsg.includes('discount') || lowerMsg.includes('sale')) {
        reply = 'We run exclusive Flash Sales! Look out for our real-time Ting notifications when an Admin drops a discount.';
      } else if (lowerMsg.includes('shipping') || lowerMsg.includes('delivery')) {
        reply = 'We offer free premium shipping! Standard delivery takes 2-4 business days across all categories.';
      } else {
        const matched = products.find((p: any) => lowerMsg.includes(p.name.split(' ')[0].toLowerCase()) || (p.category?.name && lowerMsg.includes(p.category.name.toLowerCase())));
        if (matched) {
           reply = 'Yes! We have the ' + matched.name + ' available for Rs. ' + matched.sellingPrice.toLocaleString() + '. Check our ' + (matched.category?.name || 'catalog') + ' section!';
        } else if (lowerMsg.includes('product') || lowerMsg.includes('buy') || lowerMsg.includes('shop')) {
           reply = 'We have a massive catalog across Electronics, Fashion, Beauty, Home Decor, and Sports. Head to the Browse by Category section to start shopping!';
        }
      }
    } catch (err) {
       reply = 'I am having trouble connecting to the catalog right now. Please try again later.';
    }

    setIsTyping(false);
    setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={toggleChat}
        className="fixed bottom-6 right-6 h-14 w-14 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform z-[100]"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-[100] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-slate-900 p-4 text-white flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-full">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Shopluxe AI</h3>
              <p className="text-[10px] text-slate-300 font-medium">Always online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 h-96 overflow-y-auto bg-slate-50 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={"flex " + (msg.sender === "user" ? "justify-end" : "justify-start")}>
                <div className={"max-w-[80%] rounded-2xl p-3 text-sm shadow-sm " + (msg.sender === "user" ? "bg-slate-900 text-white rounded-tr-sm" : "bg-white border border-slate-200 text-slate-800 rounded-tl-sm")}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-4 flex space-x-1 shadow-sm">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-slate-100 flex items-center">
            <input 
              type="text" 
              placeholder="Type your message..." 
              className="flex-1 bg-slate-100 border-none rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim()}
              className="ml-2 h-10 w-10 bg-slate-900 text-white rounded-full flex items-center justify-center disabled:opacity-50 hover:bg-black transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}




