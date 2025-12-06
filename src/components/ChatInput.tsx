import { useState, type KeyboardEvent, ReactNode } from 'react';
import { Send } from 'lucide-react';
import { cn } from '../utils/cn';

const isTailwindClass = (v?: string) => !!v && (/\b(bg-|from-|to-|text-|border-)/i).test(v);

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
  theme?: {
    inputBgColor?: string;
    inputTextColor?: string;
    inputBorderFocus?: string;
    inputPlaceholderColor?: string;
    inputFontSize?: string;
    sendButtonBgActive?: string;
    sendButtonBgInactive?: string;
    sendButtonTextActive?: string;
    sendButtonTextInactive?: string;
    sendIcon?: ReactNode;
  };
}

export const ChatInput = ({ onSend, disabled, theme = {} }: ChatInputProps) => {
  const {
    inputBgColor = 'bg-gray-100',
    inputTextColor = 'text-gray-800',
    inputFontSize = 'text-sm',
    sendButtonBgActive = 'bg-blue-600',
    sendButtonBgInactive = 'bg-transparent',
    sendButtonTextActive = 'text-white',
    sendButtonTextInactive = 'text-gray-300',
    sendIcon = <Send size={18} />,
  } = theme;

  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim() && !disabled) {
      onSend(text);
      setText("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative flex items-center">
      <input
        className={cn(
          `w-full border-none rounded-full pl-4 pr-12 py-3.5 ${inputFontSize} transition-all shadow-inner outline-none`,
          isTailwindClass(inputBgColor) ? inputBgColor : undefined,
          isTailwindClass(inputTextColor) ? inputTextColor : undefined
        )}
        placeholder="Ask a question..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        style={{
          backgroundColor: isTailwindClass(inputBgColor) ? undefined : (inputBgColor || '#f3f4f6'),
          color: isTailwindClass(inputTextColor) ? undefined : (inputTextColor || '#1f2937'),
        }}
      />
      <button 
        onClick={handleSend}
        disabled={disabled || !text.trim()}
        className={cn(
          "absolute right-2 p-2 rounded-full transition-all duration-200",
          text.trim() ? `hover:scale-105 shadow-md` : `cursor-not-allowed`,
          // include tailwind bg/text classes if provided
          text.trim() ? (isTailwindClass(sendButtonBgActive) ? sendButtonBgActive : undefined) : (isTailwindClass(sendButtonBgInactive) ? sendButtonBgInactive : undefined),
          text.trim() ? (isTailwindClass(sendButtonTextActive) ? sendButtonTextActive : undefined) : (isTailwindClass(sendButtonTextInactive) ? sendButtonTextInactive : undefined)
        )}
        style={{
          backgroundColor: (text.trim() ? (isTailwindClass(sendButtonBgActive) ? undefined : (sendButtonBgActive || '#2563eb')) : (isTailwindClass(sendButtonBgInactive) ? undefined : 'transparent')) as string | undefined,
          color: (text.trim() ? (isTailwindClass(sendButtonTextActive) ? undefined : (sendButtonTextActive || '#ffffff')) : (isTailwindClass(sendButtonTextInactive) ? undefined : (sendButtonTextInactive || '#d1d5db'))),
        }}
      >
        {sendIcon}
      </button>
    </div>
  );
};