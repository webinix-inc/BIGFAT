export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    category: string;
    image: string;
    author: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: '1',
        slug: 'future-of-generative-ai-enterprise',
        title: 'The Future of Generative AI in Enterprise',
        excerpt: 'Exploring how custom AI products and state-of-the-art generative models are transforming business operations and content creation.',
        content: 'Generative AI is no longer just a buzzword; it is a critical driver of innovation in the enterprise sector. From custom AI products to intelligent content creation tools, BIGFAT AI LABS is at the forefront of this revolution...',
        date: 'Dec 20, 2025',
        category: 'Technology',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
        author: 'BIGFAT AI Team',
    },
    {
        id: '2',
        slug: 'mastering-conversational-ai',
        title: 'Mastering Conversational AI',
        excerpt: 'Leveraging custom knowledge bases and LLMs to create ChatGPT-like experiences for superior customer support and internal tools.',
        content: 'Conversational AI has evolved beyond simple chatbots. With custom knowledge base integration, businesses can now provide highly accurate and context-aware assistance...',
        date: 'Dec 18, 2025',
        category: 'Solutions',
        image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=800',
        author: 'AI Specialist',
    },
    {
        id: '3',
        slug: 'rise-of-ai-agents',
        title: 'The Rise of AI Agents in 2025',
        excerpt: 'How autonomous AI agents are redefining efficiency by handling complex workflows, from data processing to decision-making pipelines.',
        content: 'AI agents are moving from task executors to autonomous decision-makers. In 2025, we are seeing a shift towards agents that can manage entire workflows with minimal human intervention...',
        date: 'Dec 15, 2025',
        category: 'Automation',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
        author: 'Automation Lead',
    },
    {
        id: '4',
        slug: 'custom-llm-development-benefits',
        title: 'Why Custom LLMs Outperform General Models',
        excerpt: 'Deep dive into the benefits of fine-tuned language models trained on domain-specific data for enterprise accuracy and performance.',
        content: 'General-purpose models like GPT-4 are powerful, but for specific industries, custom-trained LLMs offer unmatched accuracy, security, and performance...',
        date: 'Dec 12, 2025',
        category: 'Development',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
        author: 'Data Scientist',
    },
];
