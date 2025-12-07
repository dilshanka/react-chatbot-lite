import { useState, useEffect, useRef, ReactNode, CSSProperties } from 'react';
import { useChat } from '../hooks/useChat';
import { ChatBubble } from './ChatBubble';
import { ChatInput } from './ChatInput';
import { Loader2, MessageSquare, Sparkles, X} from 'lucide-react';
import { cn } from '../utils/cn'; 

export type WidgetPosition = 'bottom-right' | 'bottom-left';

const positionClasses: Record<WidgetPosition, string> = {
  'bottom-right': 'bottom-4 right-4',
  'bottom-left':  'bottom-4 left-4',
};

export interface ChatTheme {

  headerBgGradient?: string;  
  headerTextColor?: string;   
  bodyBgColor?: string;       
  messageAreaBgColor?: string; 
  borderColor?: string;       
  buttonBgGradient?: string;  
  buttonBgOpen?: string;      
  buttonTextColor?: string;   
  buttonOpenTextColor?: string; 
  launcherBgStyle?: React.CSSProperties;
  iconColor?: string;         
  statusDotColor?: string;    
  poweredByTextColor?: string; 

  // Message Colors
  userBubbleBg?: string;
  userBubbleText?: string;
  botBubbleBg?: string;
  botBubbleText?: string;

  // Input Colors
  inputBgColor?: string;
  inputTextColor?: string;
  inputBorderFocus?: string;
  inputPlaceholderColor?: string;
  sendButtonBgActive?: string;
  sendButtonBgInactive?: string;
  sendButtonTextActive?: string;
  sendButtonTextInactive?: string;

  // Text Sizes
  titleFontSize?: string;
  subtitleFontSize?: string;
  messageFontSize?: string;
  inputFontSize?: string;
  poweredByFontSize?: string;

  // Spacing & Sizing
  headerPadding?: string;
  messagePadding?: string;
  footerPadding?: string;
  borderRadius?: string;
  buttonSize?: string;

  // Images/Icons
  headerIcon?: ReactNode;
  emptyStateIcon?: ReactNode;
  loadingIcon?: ReactNode;
  closeIcon?: ReactNode;
  launcherIcon?: ReactNode;
  sendIcon?: ReactNode;

  // Text Content
  emptyStateMessage?: string;
  thinkingText?: string;
  poweredByText?: string;
  alwaysActiveText?: string;
}

// small helper: detect if a provided string looks like Tailwind utility classes
const isTailwindClass = (v?: string) => !!v && (/\b(bg-|from-|to-|text-|border-|from:|to:)/i).test(v);

interface ChatWindowProps {
  position?: WidgetPosition; 
  title?: string;           
  tenantId?: string;
  theme?: ChatTheme;
}

export const ChatWindow = ({ 
  position = 'bottom-right', 
  title = "Neuro Assistant",
  theme = {},
}: ChatWindowProps) => {
  
  const {
    // Colors
    headerBgGradient = 'from-gray-900 to-gray-800',
    headerTextColor = 'text-white',
    bodyBgColor = 'bg-white',
    messageAreaBgColor = 'bg-gray-50',
    borderColor = 'border-gray-100',
    buttonBgGradient = 'from-blue-600 to-indigo-600',
    buttonBgOpen = 'bg-gray-100',
    buttonTextColor = 'text-white',
    buttonOpenTextColor = 'text-gray-600',
    launcherBgStyle,
    iconColor = 'text-blue-300',
    statusDotColor = 'bg-green-400',
    poweredByTextColor = 'text-gray-400',
    
    // Text Sizes
    titleFontSize = 'text-sm',
    subtitleFontSize = 'text-xs',
    messageFontSize = 'text-sm',
    poweredByFontSize = 'text-[10px]',
    
    // Spacing & Sizing
    headerPadding = 'p-4',
    messagePadding = 'p-5',
    footerPadding = 'p-4',
    borderRadius = 'rounded-2xl',
    buttonSize = 'h-14 w-14',
    
    // Images/Icons
    headerIcon = <Sparkles size={20} className={iconColor} />,
    emptyStateIcon = <MessageSquare size={32} className="text-gray-400" />,
    loadingIcon = <Loader2 className="animate-spin text-blue-600" size={14} />,
    closeIcon = <X size={20} />,
    launcherIcon = <MessageSquare size={26} fill="currentColor" />,
    
    // Text Content
    emptyStateMessage = "Hi there! I'm an AI assistant. Ask me anything about this website.",
    thinkingText = "Neuro is thinking...",
    poweredByText = "Powered by NeuroAI",
    alwaysActiveText = "Always active",
  } = theme;
  
  const { messages, sendMessage, isLoading } = useChat();
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className={cn(
      "fixed z-[9999] font-sans flex flex-col transition-all duration-500 ease-in-out pointer-events-none", 
      positionClasses[position], 
      position.includes('left') ? 'items-start' : 'items-end'
    )}>
      
      {/* --- THE CHAT INTERFACE --- */}
      <div
        className={cn(
          `pointer-events-auto shadow-2xl ${borderRadius} w-[320px] h-[70.666vh] lg:h-screen/2 sm:mb-4 sm:${borderRadius} flex flex-col overflow-hidden transition-all duration-300 ease-in-out origin-bottom `,
          isOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 translate-y-10 pointer-events-none h-0',
   
          isTailwindClass(borderColor) ? borderColor : undefined,
      
          isTailwindClass(bodyBgColor) ? bodyBgColor : undefined
        )}
        style={isTailwindClass(bodyBgColor) ? undefined : ({ backgroundColor: bodyBgColor } as CSSProperties)}
      >
        

        {isTailwindClass(headerBgGradient) ? (
          <div className={cn(`${headerPadding} shadow-md bg-gradient-to-br ${headerBgGradient} ${headerTextColor}`)}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
        
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
                  {headerIcon}
                </div>
                <div>
                  <h3 className={cn(`font-bold ${titleFontSize}`)}>{title}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className={cn(`w-2 h-2 rounded-full animate-pulse`, isTailwindClass(statusDotColor) ? statusDotColor : undefined)} style={isTailwindClass(statusDotColor) ? undefined : ({ backgroundColor: statusDotColor } as CSSProperties)}></span>
                    <span className={cn(`${subtitleFontSize} text-gray-300`)}>{alwaysActiveText}</span>
                  </div>
                </div>
              </div>
              {/* Minimize Button */}
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-md"
              >
                {closeIcon}
              </button>
            </div>
          </div>
        ) : (
          <div
            className={cn(`${headerPadding} shadow-md`)}
            style={{
              background: headerBgGradient || undefined,
              color: isTailwindClass(headerTextColor) ? undefined : headerTextColor,
            }}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                {/* Icon Container with Glassmorphism */}
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
                  {headerIcon}
                </div>
                <div>
                  <h3 className={cn(`font-bold ${titleFontSize}`)}>{title}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className={cn(`w-2 h-2 rounded-full animate-pulse`, isTailwindClass(statusDotColor) ? statusDotColor : undefined)} style={isTailwindClass(statusDotColor) ? undefined : ({ backgroundColor: statusDotColor } as CSSProperties)}></span>
                    <span className={cn(`${subtitleFontSize} text-gray-300`)}>{alwaysActiveText}</span>
                  </div>
                </div>
              </div>
              {/* Minimize Button */}
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-md"
              >
                {closeIcon}
              </button>
            </div>
          </div>
        )}

        {/* 2. Message Area */}
    
        <div
          className={cn(
            `flex-1 overflow-y-auto ${messagePadding} neuro-scrollbar`,
            isTailwindClass(messageAreaBgColor) ? messageAreaBgColor : undefined
          )}
          style={isTailwindClass(messageAreaBgColor) ? undefined : ({ backgroundColor: messageAreaBgColor } as CSSProperties)}
        >
           {/* Empty State */}
           {messages.length === 0 && (
             <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    {emptyStateIcon}
                </div>
                <p className={cn(`${messageFontSize} text-gray-500 max-w-[200px]`)}>
                  {emptyStateMessage}
                </p>
             </div>
           )}
           
           {/* Message List */}
           {messages.map((msg, i) => (
              <ChatBubble 
                key={i} 
                variant={msg.role} 
                content={msg.content}
                theme={{
                  userBubbleBg: theme.userBubbleBg,
                  userBubbleText: theme.userBubbleText,
                  botBubbleBg: theme.botBubbleBg,
                  botBubbleText: theme.botBubbleText,
                  messageFontSize: theme.messageFontSize,
                }}
              />
           ))}
           
           {/* Thinking Indicator */}
           {isLoading && (
             <div className={cn(`flex items-center gap-2 text-gray-500 ${subtitleFontSize} ml-2 animate-pulse mt-2`)}>
               <div className="w-8 h-8 bg-white border rounded-full flex items-center justify-center shadow-sm">
                  {loadingIcon}
               </div>
               <span>{thinkingText}</span>
             </div>
           )}

           <div ref={messagesEndRef} />
        </div>


        {/* input/footer: typing area */}
        <div
          className={cn(`${footerPadding} border-t`, isTailwindClass(borderColor) ? borderColor : undefined)}
          style={isTailwindClass(bodyBgColor) ? undefined : ({ backgroundColor: bodyBgColor } as CSSProperties)}
        >
          <ChatInput 
            onSend={sendMessage} 
            disabled={isLoading}
            theme={{
              inputBgColor: theme.inputBgColor,
              inputTextColor: theme.inputTextColor,
              inputFontSize: theme.inputFontSize,
              sendButtonBgActive: theme.sendButtonBgActive,
              sendButtonBgInactive: theme.sendButtonBgInactive,
              sendButtonTextActive: theme.sendButtonTextActive,
              sendButtonTextInactive: theme.sendButtonTextInactive,
              sendIcon: theme.sendIcon,
            }}
          />
          <div className="text-center mt-2">
            {/* Render poweredByText as a single string with same color (supports Tailwind class or hex color) */}
            {(() => {
              const poweredByClass = isTailwindClass(poweredByTextColor) ? poweredByTextColor : undefined;
              const poweredByStyle = isTailwindClass(poweredByTextColor) ? undefined : ({ color: poweredByTextColor } as CSSProperties);
              return (
                <span className={cn(`${poweredByFontSize} flex items-center justify-center gap-1`, poweredByClass)} style={poweredByStyle}>
                  {poweredByText}
                </span>
              );
            })()}
          </div>
        </div>
      </div>

      {/* --- FLOATING LAUNCHER BUTTON --- */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          `pointer-events-auto ${buttonSize} rounded-full shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95`,
          isOpen 
            ? `${buttonOpenTextColor} rotate-90` 
            : `${buttonTextColor}`,

          !isOpen && isTailwindClass(buttonBgGradient) ? `bg-gradient-to-r ${buttonBgGradient}` : undefined,
          isOpen && isTailwindClass(buttonBgOpen) ? buttonBgOpen : undefined
        )}
        style={{
     
          ...(isOpen && !isTailwindClass(buttonBgOpen) ? { backgroundColor: buttonBgOpen } : {}),
          ...(!isOpen && !isTailwindClass(buttonBgGradient) ? { background: buttonBgGradient } : {}),
          // Allow override with explicit launcherBgStyle
          ...(launcherBgStyle || {})
        }}
      >
        {isOpen ? closeIcon : launcherIcon}
      </button>
    </div>
  );
};