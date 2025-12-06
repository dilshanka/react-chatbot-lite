import { cn } from '../utils/cn';
import ReactMarkdown from 'react-markdown';
import { Bot, User } from 'lucide-react';
import { ReactNode } from 'react';

interface ChatBubbleProps {
  variant: 'user' | 'bot';
  content: string;
  theme?: {
    userBubbleBg?: string;
    userBubbleText?: string;
    botBubbleBg?: string;
    botBubbleText?: string;
    botAvatarBg?: string;
    botAvatarBorder?: string;
    botIconColor?: string;
    userAvatarBg?: string;
    userAvatarBorder?: string;
    userIconColor?: string;
    messageFontSize?: string;
    userIcon?: ReactNode;
    botIcon?: ReactNode;
  };
}

const isTailwindClass = (v?: string) => !!v && (/\b(bg-|from-|to-|text-|border-)/i).test(v);

export const ChatBubble = ({ variant, content, theme = {} }: ChatBubbleProps) => {
  const {
    userBubbleBg = 'bg-blue-600',
    userBubbleText = 'text-white',
    botBubbleBg = 'bg-white',
    botBubbleText = 'text-gray-700',
    botAvatarBg = 'bg-indigo-50',
    botAvatarBorder = 'border-indigo-100',
    botIconColor = 'text-indigo-600',
    userAvatarBg = 'bg-gray-100',
    userAvatarBorder = 'border-gray-200',
    userIconColor = 'text-gray-600',
    messageFontSize = 'text-sm',
    userIcon = <User size={14} className={userIconColor} />,
    botIcon = <Bot size={16} className={botIconColor} />,
  } = theme;

  const isUser = variant === 'user';

  return (
    <div className={cn(
      "flex gap-3 mb-6 opacity-0 animate-slide-in",
      isUser ? "flex-row-reverse" : "flex-row"
    )}>
      {/* Avatar */}
      <div className={cn(
        `w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm border`,
        isUser ? `${userAvatarBg} ${userAvatarBorder}` : `${botAvatarBg} ${botAvatarBorder}`
      )}>
        {isUser ? userIcon : botIcon}
      </div>

      {/* Text Content */}
      <div
        className={cn(
          `max-w-[85%] rounded-2xl px-4 py-3 ${messageFontSize} shadow-sm leading-6 transition-all`,
          isUser ? `rounded-tr-sm` : `border border-gray-100 rounded-tl-sm hover:shadow-md`,
          // attach text color as class if tailwind-like
          (isUser ? (isTailwindClass(userBubbleText) ? userBubbleText : undefined) : (isTailwindClass(botBubbleText) ? botBubbleText : undefined))
        )}
        style={{
          backgroundColor: isUser ? (isTailwindClass(userBubbleBg) ? undefined : (userBubbleBg || '#2563eb')) : (isTailwindClass(botBubbleBg) ? undefined : (botBubbleBg || '#ffffff')),
          color: isUser ? (isTailwindClass(userBubbleText) ? undefined : (userBubbleText || '#ffffff')) : (isTailwindClass(botBubbleText) ? undefined : (botBubbleText || '#1f2937')),
        }}
      >
        <ReactMarkdown 
          components={{
            p: ({children}) => <p className="mb-1 last:mb-0">{children}</p>,
            ul: ({children}) => <ul className="list-disc ml-4 mb-2 space-y-1">{children}</ul>,
            ol: ({children}) => <ol className="list-decimal ml-4 mb-2 space-y-1">{children}</ol>,
            code({inline, children}) {
               return !inline 
                ? <div className="bg-gray-900 text-gray-100 p-2 rounded-md my-2 text-xs overflow-x-auto font-mono border border-gray-700">{children}</div>
                : <code className="bg-black/10 px-1 py-0.5 rounded font-mono text-xs">{children}</code>
            }
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};