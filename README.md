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

Add this to your project file 

```ts
import "react-chatbot-lite/style.css";
```

### **2. Wrap Your App**

```tsx
import { ChatProvider, ChatWindow } from "react-chatbot-lite";

function App() {
  return (
    <ChatProvider
      config={{
        baseUrl: "https://your-backend-api.com", // Your RAG server endpoint
        botId: "user_123_abc", // Optional: For multi-tenant apps
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
  tenantId="optional-tenant-id"
  theme={{
    /* HEADER */
    headerBgGradient: "#0d9488",
    headerTextColor: "#ffffff",
    headerIcon: <Icon size={20} />,
    headerPadding: "p-4",
    titleFontSize: "text-base",
    subtitleFontSize: "text-xs",
    statusDotColor: "#34d399",
    alwaysActiveText: "Online now",

    /* MESSAGE AREA */
    messageAreaBgColor: "#ecfdf5",
    messagePadding: "p-5",
    messageFontSize: "text-sm",

    /* USER MESSAGE */
    userBubbleBg: "#2dd4bf",
    userBubbleText: "#ffffff",

    /* BOT MESSAGE */
    botBubbleBg: "#ffffff",
    botBubbleText: "#134e4a",

    /* BODY */
    bodyBgColor: "#f0fdfa",
    borderColor: "#99f6e4",
    borderRadius: "rounded-2xl",

    /* INPUT */
    inputBgColor: "#ffffff",
    inputTextColor: "#134e4a",
    inputFontSize: "text-sm",
    inputBorderFocus: "focus:ring-2",
    inputPlaceholderColor: "#9ca3af",

    /* SEND BUTTON */
    sendButtonBgActive: "#0f766e",
    sendButtonBgInactive: "#00000000",
    sendButtonTextActive: "#ffffff",
    sendButtonTextInactive: "#5eead4",
    sendIcon: <Send size={20} />,

    /* LAUNCHER BUTTON */
    buttonBgGradient: "#14b8a6",
    buttonBgOpen: "#5eead4",
    buttonTextColor: "#ffffff",
    buttonOpenTextColor: "#065f46",
    buttonSize: "h-14 w-14",
    launcherIcon: <Icon />,
    launcherBgStyle: undefined,
    closeIcon: <X size={20} />,

    /* EMPTY STATE & LOADING */
    emptyStateIcon: <Icon size={40} />,
    emptyStateMessage: "Start chatting with us!",
    loadingIcon: undefined,
    thinkingText: "Assistant is typing...",

    /* FOOTER */
    poweredByText: "Powered by AI Support",
    poweredByTextColor: "#0f766e",
    poweredByFontSize: "text-[10px]",
    footerPadding: "p-4",

    /* GENERAL ICON COLOR */
    iconColor: "#ffffff",
  }}
/>
```

## 📄 License

MIT © K.D Ranaweera
