import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Loader2, User, Bot, AlertCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

interface ChatWindowProps {
    initialMessage?: string;
    onClearInitialMessage?: () => void;
}

const ChatWindow = ({ initialMessage, onClearInitialMessage }: ChatWindowProps) => {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Hi there! I am the BIGFAT AI Assistant. How can I help you today?' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (manualMsg?: string) => {
        const messageToSend = manualMsg || inputValue.trim();
        if (!messageToSend || isLoading) return;

        if (!manualMsg) {
            setInputValue('');
        }

        // Add user message
        const newMessages: Message[] = [...messages, { role: 'user', content: messageToSend }];
        setMessages(newMessages);
        setIsLoading(true);

        try {
            const history = newMessages.slice(-6);

            const API_URL = import.meta.env.VITE_API_URL || 'https://bigfat.onrender.com';
            const response = await fetch(`${API_URL}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: messageToSend,
                    history: history
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setMessages([...newMessages, { role: 'assistant', content: data.response }]);
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages([...newMessages, { role: 'system', content: "Sorry, I'm having trouble connecting to the server. Please make sure the backend is running." }]);
        } finally {
            setIsLoading(false);
        }
    };

    // Auto-send initial message if present
    useEffect(() => {
        if (initialMessage) {
            handleSendMessage(initialMessage);
            onClearInitialMessage?.();
        }
    }, [initialMessage]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="flex flex-col h-full bg-background/95 backdrop-blur-md">
            {/* Header */}
            <div className="p-4 border-b border-border/50 flex items-center gap-3 bg-card/30">
                <div>
                    <h3 className="font-semibold text-sm font-display tracking-wide">BIGFAT AI Board</h3>
                    <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs text-muted-foreground">Online</span>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                    >
                        <div
                            className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === 'user'
                                ? 'bg-primary text-primary-foreground rounded-tr-sm'
                                : msg.role === 'system'
                                    ? 'bg-destructive/10 text-destructive border border-destructive/20 rounded-tl-sm'
                                    : 'bg-muted/80 text-foreground border border-border/50 rounded-tl-sm'
                                }`}
                        >
                            {msg.role === 'system' && <AlertCircle className="h-4 w-4 inline mr-2 mb-0.5" />}
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start animate-fade-in">
                        <div className="bg-muted/80 text-foreground border border-border/50 rounded-2xl rounded-tl-sm px-4 py-3 text-sm flex items-center gap-2">
                            <span className="font-semibold text-xs text-primary">BIGFAT AI is typing</span>
                            <div className="flex gap-1 items-center h-4">
                                <span className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1 h-1 bg-primary rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border/50 bg-card/30">
                <div className="relative">
                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        className="pr-12 bg-background/50 border-border/50 focus-visible:ring-primary/50"
                    />
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleSendMessage()}
                        disabled={isLoading || !inputValue.trim()}
                        className="absolute right-1 top-1 h-8 w-8 text-primary hover:text-primary hover:bg-primary/10"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
                <div className="mt-2 flex justify-center">
                    <span className="text-[10px] text-muted-foreground/60 flex items-center gap-1">
                        Powered by BIGFAT AI
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;
