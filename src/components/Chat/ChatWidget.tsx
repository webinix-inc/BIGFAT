import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Home, MessageSquare } from 'lucide-react';
import ChatHome from './ChatHome';
import ChatWindow from './ChatWindow';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'home' | 'messages'>('home');
    const [initialMessage, setInitialMessage] = useState<string | undefined>(undefined);

    const toggleOpen = () => setIsOpen(!isOpen);

    const handleStartChat = (message?: string) => {
        if (message) {
            setInitialMessage(message);
        }
        setActiveTab('messages');
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4 font-body">
            {/* Main Chat Card */}
            {isOpen && (
                <div className="w-[380px] h-[600px] max-h-[calc(100vh-100px)] flex flex-col rounded-2xl shadow-2xl border border-border/40 bg-background/60 backdrop-blur-xl overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">

                    {/* Content Area */}
                    <div className="flex-1 overflow-hidden relative">
                        {/* Close Button Absolute */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 z-20 h-8 w-8 rounded-full bg-black/5 hover:bg-black/10 text-muted-foreground hover:text-foreground"
                            onClick={toggleOpen}
                        >
                            <X size={18} />
                        </Button>

                        {activeTab === 'home' ? (
                            <ChatHome onStartChat={handleStartChat} />
                        ) : (
                            <ChatWindow
                                initialMessage={initialMessage}
                                onClearInitialMessage={() => setInitialMessage(undefined)}
                            />
                        )}
                    </div>

                    {/* Bottom Tab Navigation */}
                    <div className="flex border-t border-border/40 bg-background/80 backdrop-blur-sm">
                        <button
                            onClick={() => setActiveTab('home')}
                            className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 text-[10px] font-medium transition-colors ${activeTab === 'home' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <Home size={20} />
                            Home
                        </button>
                        <button
                            onClick={() => setActiveTab('messages')}
                            className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 text-[10px] font-medium transition-colors ${activeTab === 'messages' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <div className="relative">
                                <MessageSquare size={20} />
                                {activeTab === 'home' && (
                                    <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                                )}
                            </div>
                            Messages
                        </button>
                    </div>
                </div>
            )}

            {/* Launcher Button */}
            <Button
                className={`h-14 w-14 rounded-full shadow-lg shadow-primary/25 transition-all duration-300 p-0 ${isOpen
                    ? 'bg-background border border-border text-foreground hover:bg-muted'
                    : 'bg-gradient-to-r from-primary to-glow-cyan hover:shadow-primary/50 text-white animate-bounce-slow'
                    }`}
                onClick={toggleOpen}
            >
                {isOpen ? (
                    <X className="h-6 w-6" />
                ) : (
                    <MessageCircle className="h-8 w-8" />
                )}
            </Button>
        </div>
    );
};

export default ChatWidget;
