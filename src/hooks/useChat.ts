import { useState } from 'react';
import { useConfig } from '../context/ChatProvider';

export interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
}

export const useChat = () => {
  const { baseUrl, botId } = useConfig();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text: string) => {
    // Optimistic UI update
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch(`${baseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, botId })
      });
      
      const data = await res.json();
      
      const botMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'bot', 
        content: data.answer || "Sorry, I didn't understand that."
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      setMessages(prev => [...prev, { id: 'err', role: 'bot', content: "Error connecting to server." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, messages, isLoading };
};