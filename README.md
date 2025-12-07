# React Chatbot Lite 🤖  
A lightweight, high-performance **RAG chatbot widget** for React applications. Designed to be **headless-capable** but ships with a **beautiful modern UI** out of the box. Connects easily to **Gemini**, **OpenAI**, or **any custom backend** via a simple, standardized API contract.

---

## ✨ Features

- 🚀 **Modern UI** — Gradients, glassmorphism, smooth animations  
- 🎨 **Fully Themeable** — Customize every color, size, and text without CSS  
- 🧠 **RAG Ready** — Citations, sources, markdown rendering  
- 🔌 **Backend Agnostic** — Works with Node, Python (FastAPI), or any HTTP API  
- 📱 **Responsive** — Mobile and desktop optimized  
- 💨 **Fast** — Built with Vite + Rollup, zero runtime overhead  

---

## 📦 Installation

```bash
npm install react-chatbot-lite
# or
yarn add react-chatbot-lite
# or
pnpm add react-chatbot-lite
```

---

## 🚀 Quick Start

### **1. Import Styles**

Add this to your root file (`main.tsx`, `App.tsx`, or `_app.tsx`):

```ts
import 'react-chatbot-lite/dist/style.css';
```

### **2. Wrap Your App**

```tsx
import { ChatProvider, ChatWindow } from 'react-chatbot-lite';

function App() {
  return (
    <ChatProvider 
      config={{ 
        baseUrl: "https://your-backend-api.com", // Your RAG server endpoint
        botId: "user_123_abc" // Optional: For multi-tenant apps
      }}
    >
      {/* Your App Content */}
      <HomePage />

      {/* Chat Widget */}
      <ChatWindow />
    </ChatProvider>
  );
}
```

---

## 🎨 Theming & Customization

Pass a theme object to override the entire UI—no CSS required.

```tsx
<ChatWindow
  title="Support Assistant"
  position="bottom-right"
  theme={{
    // Header
    headerBgGradient: "linear-gradient(135deg, #FF512F, #DD2476)",
    headerTextColor: "#ffffff",

    // Launcher Button
    buttonBgGradient: "linear-gradient(135deg, #FF512F, #DD2476)",
    buttonSize: "h-16 w-16",

    // User Message
    userBubbleBg: "#FFE4E6",
    userBubbleText: "#9F1239",

    // Bot Message
    botBubbleBg: "#F3F4F6",
    botBubbleText: "#1F2937",

    // Content
    thinkingText: "Agent is searching knowledge base...",
    poweredByText: "Powered by MyCompany AI"
  }}
/>
```


## 📄 License

MIT © K.D Ranaweera

