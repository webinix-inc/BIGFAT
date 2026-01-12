import { memo } from 'react';
import { Brain, MessageSquare, Building2, Bot, Code2, Layers } from 'lucide-react';

const solutions = [
  {
    icon: Brain,
    title: 'Generative AI Products',
    description: 'Build intelligent applications with state-of-the-art generative models for content creation, design, and more.',
  },
  {
    icon: MessageSquare,
    title: 'Conversational AI',
    description: 'Deploy ChatGPT-like experiences with custom knowledge bases, perfect for customer support and internal tools.',
  },
  {
    icon: Building2,
    title: 'Enterprise AI Platforms',
    description: 'Secure, scalable AI infrastructure designed for enterprise compliance and integration requirements.',
  },
  {
    icon: Bot,
    title: 'AI Automation & Agents',
    description: 'Autonomous agents that handle complex workflows, from data processing to decision-making pipelines.',
  },
  {
    icon: Code2,
    title: 'Custom LLM Development',
    description: 'Fine-tuned language models trained on your data for domain-specific accuracy and performance.',
  },
  {
    icon: Layers,
    title: 'AI SaaS Development',
    description: 'End-to-end development of AI-powered SaaS products from concept to market-ready deployment.',
  },
];

const SolutionsSection = memo(() => {
  return (
    <section id="solutions" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-glow-cyan/5 to-transparent pointer-events-none" />

      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Our Solutions
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-4 mb-6">
            AI Solutions for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Every Challenge</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From conversational interfaces to enterprise platforms, we deliver AI solutions
            that transform how businesses operate and innovate.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <div
              key={solution.title}
              className="glass-card glow-border p-8 rounded-2xl transition-all duration-300 hover:translate-y-[-4px] group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-glow-cyan/20 to-glow-violet/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <solution.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-primary transition-colors">
                {solution.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

SolutionsSection.displayName = 'SolutionsSection';

export default SolutionsSection;