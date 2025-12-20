import { Button } from '@/components/ui/button';
import { Send, ArrowRight, ExternalLink, Bot, Sparkles, MessageCircle } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ChatHomeProps {
    onStartChat: (initialMessage?: string) => void;
}

const SUGGESTED_QUESTIONS = [
    "What are your AI Consulting services?",
    "How can I integrate Generative AI?",
    "Tell me about your Enterprise Platform.",
    "Do you offer custom AI Agents?"
];

const ChatHome = ({ onStartChat }: ChatHomeProps) => {
    return (
        <div className="flex flex-col h-full bg-background/95 backdrop-blur-md font-body">
            {/* Header Area - Removed Logo as requested */}
            <div className="p-6 pb-4 bg-gradient-to-b from-primary/10 to-transparent">
                <h2 className="text-3xl font-bold font-display text-foreground leading-tight mb-2 tracking-tight">
                    Welcome to <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-glow-cyan">
                        BIGFAT AI!
                    </span>
                </h2>
                <p className="text-muted-foreground font-medium text-lg">How can we help you today?</p>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-2 space-y-6 custom-scrollbar">

                {/* CTA Card - Primary Action */}
                <div
                    className="bg-background border border-border/60 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group flex items-center justify-between"
                    onClick={() => onStartChat()}
                >
                    <div className="flex flex-col gap-1">
                        <span className="font-semibold text-primary text-sm">Send us a message</span>
                        <span className="text-xs text-muted-foreground">We typically reply in under a minute</span>
                    </div>
                    <Send className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Recent Message / Status Card */}
                <div
                    className="bg-card/40 border border-border/40 rounded-xl p-4 hover:bg-card/60 transition-all duration-300 cursor-pointer group"
                    onClick={() => onStartChat()}
                >
                    <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-glow-cyan/20 flex items-center justify-center border border-white/10">
                            <Bot size={16} className="text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-sm font-semibold text-foreground">BIGFAT Assistant</span>
                                <span className="text-[10px] text-primary/80 bg-primary/10 px-1.5 py-0.5 rounded-full">Online</span>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-1 group-hover:text-foreground transition-colors">
                                Ask me anything about our products...
                            </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                    </div>
                </div>

                {/* Suggested Questions Section */}
                <div className="space-y-3">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-1">
                        Frequently Asked Questions
                    </h3>
                    <div className="grid gap-2">
                        {SUGGESTED_QUESTIONS.map((q, i) => (
                            <button
                                key={i}
                                onClick={() => onStartChat(q)}
                                className="w-full text-left p-3 rounded-lg bg-card/20 hover:bg-card/50 border border-transparent hover:border-primary/20 transition-all duration-200 group"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-foreground/80 group-hover:text-foreground">{q}</span>
                                    <MessageCircle className="h-3 w-3 text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all" />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Job Opportunity Link */}
                <a
                    href="/#careers"
                    className="flex items-center justify-between p-4 bg-transparent border border-border/40 rounded-xl hover:bg-white/5 transition-colors group mt-4"
                >
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground group-hover:text-glow-cyan transition-colors">
                            Join our team
                        </span>
                        <span className="text-xs text-muted-foreground">Looking For A Job Opportunity?</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </a>
            </div>
        </div>
    );
};

export default ChatHome;
