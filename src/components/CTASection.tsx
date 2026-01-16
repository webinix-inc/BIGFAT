import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Rocket } from 'lucide-react';

const CTASection = memo(() => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-glow-cyan/10 via-transparent to-glow-violet/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-glow-cyan/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-card rounded-3xl p-12 md:p-16 text-center gradient-border">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Rocket className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Start Your AI Journey</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Build the Future{' '}
              <span className="gradient-text">with AI</span>
            </h2>

            <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
              Ready to transform your business with cutting-edge AI solutions?
              Let's discuss how we can help you achieve your goals with intelligent automation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="lg">
                Start Your AI Journey
                <ArrowRight className="w-5 h-5" />
              </Button>
              <a href="https://cal.com/bigfat-ai-tasbkl" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Schedule a Demo
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

CTASection.displayName = 'CTASection';

export default CTASection;