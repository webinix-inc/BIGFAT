import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Users, Target, Lightbulb, Award, Globe, Heart } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - BIGFAT AI Labs</title>
        <meta
          name="description"
          content="Learn about BIGFAT AI Labs - your trusted partner for enterprise AI solutions, custom development, and AI integration services."
        />
        <meta name="keywords" content="about BIGFAT AI, AI company, enterprise AI solutions, AI development team" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="About Us - BIGFAT AI Labs" />
        <meta property="og:description" content="Learn about BIGFAT AI Labs - your trusted partner for enterprise AI solutions, custom development, and AI integration services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bigfatai.com/about" />
        <meta property="og:site_name" content="BIGFAT AI Labs" />
        <meta property="og:image" content="https://bigfatai.com/og-image.jpg" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us - BIGFAT AI Labs" />
        <meta name="twitter:description" content="Learn about BIGFAT AI Labs - your trusted partner for enterprise AI solutions, custom development, and AI integration services." />
        <meta name="twitter:image" content="https://bigfatai.com/twitter-image.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://bigfatai.com/about" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About BIGFAT AI Labs",
            "description": "Learn about BIGFAT AI Labs - your trusted partner for enterprise AI solutions, custom development, and AI integration services",
            "url": "https://bigfatai.com/about",
            "mainEntity": {
              "@type": "Organization",
              "name": "BIGFAT AI Labs",
              "url": "https://bigfatai.com",
              "description": "Enterprise AI solutions and custom development company"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <ParticleBackground />
        <Navbar />
        
        <main className="py-20">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {/* Hero Section */}
              <div className="text-center mb-20">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <Users className="w-6 h-6 text-primary" />
                  <span className="text-primary font-semibold">Our Story</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                  Pioneering <span className="gradient-text">Enterprise AI</span> Solutions
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  We are a team of AI experts dedicated to transforming businesses through cutting-edge artificial intelligence solutions, 
                  custom development, and seamless enterprise integration.
                </p>
              </div>

              {/* Mission & Vision */}
              <div className="grid lg:grid-cols-2 gap-12 mb-20">
                <div className="bg-card border rounded-2xl p-8 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-6">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To democratize enterprise AI by providing accessible, powerful, and customizable AI solutions 
                    that drive real business value and innovation across industries.
                  </p>
                </div>

                <div className="bg-card border rounded-2xl p-8 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 flex items-center justify-center mb-6">
                    <Lightbulb className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To become the global leader in enterprise AI integration, empowering businesses to harness 
                    the full potential of artificial intelligence for sustainable growth and competitive advantage.
                  </p>
                </div>
              </div>

              {/* Our Values */}
              <div className="mb-20">
                <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Customer First</h3>
                    <p className="text-muted-foreground">
                      We prioritize our clients' success and build long-term partnerships based on trust and results.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                      <Lightbulb className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Innovation</h3>
                    <p className="text-muted-foreground">
                      We constantly push boundaries and explore new possibilities in AI technology and applications.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Excellence</h3>
                    <p className="text-muted-foreground">
                      We deliver highest quality solutions that exceed expectations and drive measurable business impact.
                    </p>
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 mb-20">
                <h2 className="text-3xl font-bold text-center mb-12">Why Choose BIGFAT AI Labs?</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-primary">Enterprise Expertise</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span>Deep understanding of enterprise challenges and requirements</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span>Proven track record with Fortune 500 companies</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span>End-to-end AI solution development and deployment</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-primary">Technical Excellence</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span>Integration with leading AI models and platforms</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span>Custom fine-tuning and optimization</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span>Enterprise-grade security and compliance</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Global Presence */}
              <div className="text-center">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-orange-600" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Global Impact</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                  Serving clients across India and internationally, with a focus on delivering 
                  localized AI solutions with global standards.
                </p>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">50+</div>
                    <div className="text-sm text-muted-foreground">Enterprise Clients</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">200+</div>
                    <div className="text-sm text-muted-foreground">AI Solutions Delivered</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">99%</div>
                    <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;
