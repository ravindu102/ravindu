
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { generateText } from '../services/geminiService';
import { ChatMessage } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';

const AiBuddyTab: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const systemInstruction = "You are a friendly and knowledgeable university study buddy. Explain complex topics simply, provide helpful examples, and always encourage the student. Keep your responses concise and well-formatted.";
    const responseText = await generateText(input, systemInstruction);

    const modelMessage: ChatMessage = { role: 'model', text: responseText };
    setMessages(prev => [...prev, modelMessage]);
    setIsLoading(false);
  }, [input, isLoading]);

  return (
    <div className="bg-slate-800 rounded-xl shadow-2xl p-4 sm:p-6 flex flex-col h-[75vh] animate-fade-in">
      <h2 className="text-3xl font-bold mb-4 text-sky-400 flex items-center gap-2">
        <SparklesIcon /> AI Study Buddy
      </h2>
      
      <div className="flex-grow overflow-y-auto pr-4 space-y-4 mb-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-md lg:max-w-xl px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-sky-600 text-white rounded-br-none' : 'bg-slate-700 text-slate-200 rounded-bl-none'}`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="max-w-md lg:max-w-xl px-4 py-3 rounded-2xl bg-slate-700 text-slate-200 rounded-bl-none">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse"></div>
                </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about anything... e.g., 'Explain recursion'"
          className="flex-grow bg-slate-700 border border-slate-600 rounded-full py-3 px-5 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-sky-600 text-white font-bold p-3 rounded-full hover:bg-sky-700 transition duration-200 shadow-lg disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" /></svg>
        </button>
      </form>
    </div>
  );
};

export default AiBuddyTab;
