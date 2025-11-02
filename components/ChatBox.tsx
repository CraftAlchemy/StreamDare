import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage, Streamer, User } from '../types';

interface ChatBoxProps {
  streamer: Streamer;
  viewer: User;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
}

const ChatMessageItem: React.FC<{ message: ChatMessage }> = ({ message }) => {
    const getUsernameColor = (name: string) => {
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        const color = `hsl(${hash % 360}, 70%, 70%)`;
        return color;
    };

    if (message.isSystem) {
        return (
            <div className="px-4 py-2 text-sm text-center text-brand-gray-400 bg-brand-gray-800 rounded-md my-1">{message.text}</div>
        );
    }
    
    if (message.isGift) {
        return (
             <div className="px-4 py-2 text-sm text-center text-yellow-300 bg-yellow-900 bg-opacity-50 rounded-md my-1 font-semibold">{message.text}</div>
        );
    }

    if (message.isDare) {
         return (
             <div className="px-4 py-3 text-sm text-center text-brand-cyan bg-brand-purple bg-opacity-30 border border-brand-cyan rounded-md my-1 font-bold animate-fade-in">{message.text}</div>
        );
    }

    return (
        <div className="py-1 px-4 text-sm leading-6">
            <span className="text-brand-gray-500 text-xs mr-2 align-middle">{message.timestamp}</span>
            <span
                style={{ color: getUsernameColor(message.user.name) }}
                className="font-bold mr-2"
            >
                {message.user.name}:
            </span>
            <span className="text-brand-gray-200 break-words">{message.text}</span>
        </div>
    );
}

const ChatBox: React.FC<ChatBoxProps> = ({ streamer, viewer, messages, onSendMessage }) => {
  const [chatInput, setChatInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim()) {
      onSendMessage(chatInput.trim());
      setChatInput('');
    }
  };

  return (
    <aside className="w-full md:w-80 bg-brand-gray-900 flex flex-col h-full">
      <div className="h-12 flex items-center justify-center border-b border-brand-gray-700">
        <h2 className="text-lg font-semibold text-white">Stream Chat</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {messages.map((msg) => (
          <ChatMessageItem key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-brand-gray-700">
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Send a message"
            className="w-full bg-brand-gray-700 text-white placeholder-brand-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-purple"
          />
        </form>
      </div>
    </aside>
  );
};

export default ChatBox;