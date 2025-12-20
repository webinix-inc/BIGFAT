import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ChatbotLauncher = () => {
    return (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-slow">
            <Button
                className="h-14 w-14 rounded-full bg-gradient-to-r from-primary to-glow-cyan shadow-lg shadow-primary/25 hover:shadow-primary/50 transition-all duration-300 p-0"
                onClick={() => console.log("Chatbot launched!")}
            >
                <MessageCircle className="h-8 w-8 text-white" />
            </Button>
        </div>
    );
};

export default ChatbotLauncher;
