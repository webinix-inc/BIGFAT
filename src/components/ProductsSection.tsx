import { MessageCircle, Brain, LineChart, Workflow, Cloud } from 'lucide-react';
import { Button } from '@/components/ui/button';

const products = [
  {
    icon: MessageCircle,
    title: 'AI Chat Platform',
    description: 'Enterprise-grade conversational AI with custom knowledge integration and multi-channel deployment.',
    features: ['Custom Training', 'Multi-language', 'API Access'],
  },
  {
    icon: Brain,
    title: 'AI Assistant for Business',
    description: 'Intelligent virtual assistant that handles scheduling, emails, research, and task automation.',
    features: ['Voice Enabled', 'Calendar Sync', 'Smart Replies'],
  },
  {
    icon: LineChart,
    title: 'AI Analytics Dashboard',
    description: 'Real-time insights powered by ML with predictive analytics and anomaly detection.',
    features: ['Predictive Models', 'Custom Reports', 'Alerts'],
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description: 'AI-driven process automation that learns from patterns and optimizes operations.',
    features: ['No-code Builder', 'Integrations', 'Auto-scaling'],
  },
  {
    icon: Cloud,
    title: 'API-based AI Services',
    description: 'RESTful APIs for text generation, image analysis, sentiment detection, and more.',
    features: ['Low Latency', 'High Availability', 'Usage Tiers'],
  },
];

const ProductsSection = () => {
  return (
    <section id="products" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-glow-violet/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-glow-cyan/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Products & Platforms
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-4 mb-6">
            Powerful AI{' '}
            <span className="gradient-text">Products</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Production-ready AI solutions designed for immediate deployment and rapid time-to-value.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={product.title}
              className={`glass-card p-8 rounded-2xl transition-all duration-300 hover:translate-y-[-4px] group gradient-border ${index === 0 ? 'lg:col-span-2 lg:row-span-1' : ''
                }`}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-glow-cyan to-glow-violet flex items-center justify-center flex-shrink-0 group-hover:animate-pulse-glow">
                  <product.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {product.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {product.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-foreground/5 text-muted-foreground border border-foreground/10"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="glow" size="lg">
            Explore All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;