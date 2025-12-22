import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import aiHero from '@/assets/ai-hero1.png';
import modelGlow from '@/assets/Model Glow.svg';
import elements from '@/assets/Elements.svg';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-glow-cyan/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-glow-violet/20 rounded-full blur-[120px]" />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center pt-24">
          {/* Left Content */}
          <div className="space-y-8">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-primary/20 animate-fade-up"
              style={{ animationDelay: '0.1s' }}>
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs text-muted-foreground">Next-Gen AI Technology</span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight mb-6 animate-fade-up"
              style={{ animationDelay: '0.2s' }}>
              Enterprise AI &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-glow-cyan to-primary">
                Generative AI
              </span>{' '}
              Solutions
            </h1>

            <p className="text-xl md:text-2xl text-foreground/80 mb-8 leading-relaxed font-medium animate-fade-up"
              style={{ animationDelay: '00.3s' }}>
              Transform your business with cutting-edge GenAI products, enterprise AI platforms, and intelligent automation solutions powered by the latest LLMs and ML technologies
            </p>

            <div
              className="flex flex-wrap gap-4 animate-fade-up"
              style={{ animationDelay: '0.4s' }}>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full bg-foreground/5 border-foreground/20 hover:bg-foreground/10"
                onClick={() => navigate('/contact')}
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>


          </div>

          {/* Right Content - Layered AI Image */}
          <div
            className="relative flex justify-center lg:justify-end animate-fade-up -mr-8 lg:-mr-16"
            style={{ animationDelay: '0.3s' }}>
            <div className="relative overflow-visible border-0 outline-none ring-0 shadow-none" style={{ boxShadow: 'none' }}>
              {/* Background Glow Layer */}
              <div
                className="absolute inset-0 flex items-center justify-center transform -translate-y-14 md:-translate-y-20"
                style={{ zIndex: 1 }}
              >
                <img
                  src={modelGlow}
                  alt=""
                  className="w-full h-auto opacity-90 brightness-125"
                  style={{ maxWidth: '980px' }}
                />
              </div>

              {/* AI Humanoid Image Layer */}
              <div className="relative border-0 outline-none ring-0 shadow-none" style={{ zIndex: 2, boxShadow: 'none' }}>
                <img
                  src={aiHero}
                  alt="Futuristic AI humanoid representing advanced artificial intelligence"
                  className="relative w-full h-auto object-contain border-0 outline-none ring-0 shadow-none"
                  style={{
                    maxWidth: 'none',
                    width: '100%',
                    boxShadow: 'none',
                    background: 'transparent',
                    maskImage: 'radial-gradient(ellipse 80% 90% at center, black 40%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(ellipse 80% 90% at center, black 40%, transparent 100%)'
                  }}
                />
              </div>

              {/* Elements/Particles Overlay Layer - Positioned to the right, slightly above center */}
              <div
                className="absolute inset-0 flex items-center justify-end pointer-events-none transform -translate-y-14 md:-translate-y-20"
                style={{ zIndex: 3, right: '0%' }}
              >
                <img
                  src={elements}
                  alt=""
                  className="h-full opacity-80 brightness-125"
                  style={{ maxWidth: '540px', mixBlendMode: 'screen', paddingRight: '16px' }}
                />
              </div>

              {/* Floating elements - positioned responsively around the humanoid */}
              <div className="absolute top-[5%] left-[2%] md:top-[8%] md:left-[10%] glass-card px-2 py-1 md:px-4 md:py-2 rounded-lg animate-float border-0" style={{ zIndex: 4, animationDelay: '0s' }}>
                <span className="text-[10px] md:text-sm font-medium">Contextual AI</span>
              </div>
              <div className="absolute top-[10%] right-[5%] md:top-[12%] md:right-[15%] glass-card px-2 py-1 md:px-4 md:py-2 rounded-lg animate-float border-0" style={{ zIndex: 4, animationDelay: '0.5s' }}>
                <span className="text-[10px] md:text-sm font-medium">Business Chat Bot</span>
              </div>
              <div className="absolute top-[25%] left-[5%] md:top-[28%] md:left-[15%] glass-card px-2 py-1 md:px-4 md:py-2 rounded-lg animate-float border-0" style={{ zIndex: 4, animationDelay: '1s' }}>
                <span className="text-[10px] md:text-sm font-medium">Fine Tuning</span>
              </div>
              <div className="absolute top-[45%] right-[2%] md:top-[48%] md:right-[10%] glass-card px-2 py-1 md:px-4 md:py-2 rounded-lg animate-float border-0" style={{ zIndex: 4, animationDelay: '1.5s' }}>
                <span className="text-[10px] md:text-sm font-medium">Custom Development</span>
              </div>
              <div className="absolute bottom-[45%] left-[2%] md:bottom-[48%] md:left-[10%] glass-card px-2 py-1 md:px-4 md:py-2 rounded-lg animate-float border-0" style={{ zIndex: 4, animationDelay: '2s' }}>
                <span className="text-[10px] md:text-sm font-medium">Voice Agents</span>
              </div>
              <div className="absolute bottom-[30%] right-[5%] md:bottom-[35%] md:right-[15%] glass-card px-2 py-1 md:px-4 md:py-2 rounded-lg animate-float border-0" style={{ zIndex: 4, animationDelay: '2.5s' }}>
                <span className="text-[10px] md:text-sm font-medium">AI Mobile App</span>
              </div>
              <div className="absolute bottom-[15%] left-[5%] md:bottom-[20%] md:left-[15%] glass-card px-2 py-1 md:px-4 md:py-2 rounded-lg animate-float border-0" style={{ zIndex: 4, animationDelay: '3s' }}>
                <span className="text-[10px] md:text-sm font-medium">Contextual AI Agent</span>
              </div>
              <div className="absolute bottom-[5%] right-[15%] md:bottom-[10%] md:right-[20%] glass-card px-2 py-1 md:px-4 md:py-2 rounded-lg animate-float border-0" style={{ zIndex: 4, animationDelay: '3.5s' }}>
                <span className="text-[10px] md:text-sm font-medium">RAG</span>
              </div>
              <div className="absolute top-[35%] left-[2%] md:top-[38%] md:left-[10%] glass-card px-2 py-1 md:px-4 md:py-2 rounded-lg animate-float border-0" style={{ zIndex: 4, animationDelay: '4s' }}>
                <span className="text-[10px] md:text-sm font-medium">AI Agents</span>
              </div>
              <div className="absolute top-[65%] right-[10%] md:top-[68%] md:right-[15%] glass-card px-2 py-1 md:px-4 md:py-2 rounded-lg animate-float border-0" style={{ zIndex: 4, animationDelay: '4.5s' }}>
                <span className="text-[10px] md:text-sm font-medium">LLM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;