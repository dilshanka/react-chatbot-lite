import React, { createContext, useContext } from 'react';

interface ChatConfig {
  baseUrl: string;
  botId?: string;
  themeColor?: string;
}

const ChatContext = createContext<ChatConfig | null>(null);

export const ChatProvider = ({ config, children }: { config: ChatConfig, children: React.ReactNode }) => {
  return (
    <ChatContext.Provider value={config}>
      {children}
    </ChatContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useConfig must be used within a ChatProvider");
  return context;
};