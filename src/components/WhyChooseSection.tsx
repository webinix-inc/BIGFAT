import { memo } from 'react';
import { Zap, Shield, Users, BarChart3, Cpu } from 'lucide-react';

const features = [
  {
    icon: Cpu,
    title: 'Cutting-edge LLMs & ML Models',
    description: 'Access the latest in transformer architecture and machine learning innovations.',
  },
  {
    icon: Zap,
    title: 'Scalable SaaS Architecture',
    description: 'Infrastructure that grows with your needs, from MVP to millions of users.',
  },
  {
    icon: Shield,
    title: 'Secure & Enterprise-ready',
    description: 'SOC 2 compliant with end-to-end encryption and role-based access control.',
  },
  {
    icon: Users,
    title: 'Human-centered AI Design',
    description: 'AI solutions that augment human capabilities and prioritize user experience.',
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    description: 'Comprehensive dashboards with actionable insights and performance metrics.',
  },
];

const WhyChooseSection = memo(() => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-glow-violet/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Features List */}
          <div className="space-y-6">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Built for the{' '}
              <span className="gradient-text">Future of AI</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              We combine deep technical expertise with a relentless focus on
              delivering business value through intelligent automation.
            </p>

            <div className="space-y-4 pt-4">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-foreground/5 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-glow-cyan/20 to-glow-violet/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold mb-1 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Visual Element */}
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              {/* Animated rings */}
              <div className="absolute inset-0 rounded-full border border-primary/20 animate-pulse" />
              <div
                className="absolute inset-8 rounded-full border border-primary/30 animate-pulse"
                style={{ animationDelay: '0.5s' }}
              />
              <div
                className="absolute inset-16 rounded-full border border-primary/40 animate-pulse"
                style={{ animationDelay: '1s' }}
              />

              {/* Center content */}
              <div className="absolute inset-24 rounded-full bg-gradient-to-br from-glow-cyan/20 to-glow-violet/20 backdrop-blur-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-display font-bold gradient-text">AI</div>
                  <div className="text-sm text-muted-foreground">Powered</div>
                </div>
              </div>

              {/* Floating icons */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 glass-card p-3 rounded-xl animate-float">
                <Cpu className="w-6 h-6 text-primary" />
              </div>
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 glass-card p-3 rounded-xl animate-float"
                style={{ animationDelay: '1.5s' }}
              >
                <Shield className="w-6 h-6 text-secondary" />
              </div>
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 glass-card p-3 rounded-xl animate-float"
                style={{ animationDelay: '0.5s' }}
              >
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 glass-card p-3 rounded-xl animate-float"
                style={{ animationDelay: '2s' }}
              >
                <BarChart3 className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

WhyChooseSection.displayName = 'WhyChooseSection';

export default WhyChooseSection;