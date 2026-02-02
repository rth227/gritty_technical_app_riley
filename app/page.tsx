// client component 
'use client';

import { useState } from 'react';

// creates message
// each message must have a role (user or assistant) and some content
type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

// chat page 
export default function ChatPage() {
  // storing messages 
  const [messages, setMessages] = useState<Message[]>([]);
  // storing what user is actively typing
  const [input, setInput] = useState('');
  // waiting for ai response 
  const [isLoading, setIsLoading] = useState(false);

  // user sent a message ... handles form submission
  const handleSubmit = async (e: React.FormEvent) => {
    // prevent page refresh 
    e.preventDefault();
    // only submit if input is full
    if (!input.trim() || isLoading) return;
    
    // store message
    const userMessage = input.trim();
    setInput(''); // clear input now
    
    // add user message to chat 
    const newUserMessage: Message = {
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newUserMessage]);
    
    // loading state ...
    setIsLoading(true);
    
    try {
      // call api route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });
      
      // parse json response to use
      const data = await response.json();
      
      // check for errors
      if (data.error) {
        throw new Error(data.error);
      }
      
      // add ai response to chat now
      const aiMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      
    } catch (error) {
      // show error if necessary 
      console.error('Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry! There seems to be an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      
    } finally {
      // turn off loading state 
      setIsLoading(false);
    }
  };

  return (
    <main 
      className="flex min-h-screen flex-col items-center justify-center p-4" 
      style={{ 
        backgroundColor: '#e3efff',
        backgroundImage: 'radial-gradient(circle, #9fabb3 1.5px, transparent 1.5px)',
        backgroundSize: '55px 55px'
      }}
    >     
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg flex flex-col h-[600px]">
        
        {/* header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">AI Chatbot</h1>
        </div>
        
        {/* message area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <p>Say hi!</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === 'user'
                    ? 'text-white'
                    : 'text-gray-800'
                }`}
                style={{
                  backgroundColor: message.role === 'user' ? '#9fabb3' : '#e3efff'
                }}
              >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  {/* timestamp */}
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </p>
                </div>
              </div>
            ))
          )}
          
        {/* loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2">
              <p className="flex items-center gap-1">
                Claude is typing
                <span className="flex gap-1">
                  <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
                </span>
              </p>
            </div>
          </div>
        )}
        </div>
        
        {/* input form */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
          <div className="flex gap-2 items-start">
            {/* LEFT */}
            <div className="flex-1 flex flex-col">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type something ... "
                disabled={isLoading}
                className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 disabled:bg-gray-100"
                style={{ borderColor: '#9fabb3', outlineColor: '#9fabb3' }}
                maxLength={1000}
              />
              
              {/* message */}
              <p className="text-xs text-gray-400 text-center mt-1">
                Type a message ...
              </p>
            </div>
            
            {/* RIGHT */}
            <div className="flex flex-col">
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="px-6 py-2 text-white rounded-lg hover:opacity-80 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors border-2 whitespace-nowrap"
                style={{ backgroundColor: '#9fabb3', borderColor: '#9fabb3' }}
              >
                Send
              </button>
              
              <p className="text-xs text-gray-400 text-center mt-1">
                {input.length}/1000 chars
              </p>
            </div>
          </div>
        </form>
        
      </div>
    </main>
  );
}