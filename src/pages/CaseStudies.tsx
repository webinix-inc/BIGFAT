import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Plane, MapPin, Users, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { caseStudies } from '@/data/caseStudies';
import ParticleBackground from '@/components/ParticleBackground';

const CaseStudies = () => {

  return (
    <>
      <Helmet>
        <title>Case Studies - BIGFAT AI Labs</title>
        <meta
          name="description"
          content="Explore our successful AI projects including Dook Travels B2B platform and enterprise AI solutions with measurable results."
        />
        <meta name="keywords" content="AI case studies, Dook Travels, enterprise AI success stories, AI project examples" />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <ParticleBackground />
        <Navbar />
        
        <main className="py-20">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  <span className="text-primary font-semibold">Success Stories</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                  Client <span className="gradient-text">Case Studies</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Discover how we've helped businesses transform their operations with cutting-edge AI solutions
                </p>
              </div>

              {/* Featured Case Study - Dook Travels */}
              <div className="mb-16">
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Plane className="w-5 h-5 text-primary" />
                    <span className="text-sm font-semibold text-primary">Featured Project</span>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-12">
                    <div>
                      <h2 className="text-3xl font-bold mb-4">{caseStudies[0].title}</h2>
                      <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{caseStudies[0].client}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{caseStudies[0].duration}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {caseStudies[0].description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {caseStudies[0].tags.map((tag, index) => (
                          <span key={index} className="px-3 py-1 bg-background/50 border border-foreground/10 rounded-full text-xs font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        to={`/case-studies/${caseStudies[0].id}`}
                        className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                      >
                        View Full Case Study <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                    <div>
                      <img
                        src={caseStudies[0].image}
                        alt={caseStudies[0].title}
                        className="w-full h-64 object-cover rounded-xl"
                        width={800}
                        height={256}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Grid for Dook Travels */}
              <div className="grid md:grid-cols-4 gap-6 mb-16">
                {caseStudies[0].results.map((result, index) => (
                  <div key={index} className="bg-card border rounded-2xl p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">{result.metric}</div>
                    <div className="text-sm text-muted-foreground">{result.description}</div>
                  </div>
                ))}
              </div>

              {/* Other Case Studies */}
              <div className="grid lg:grid-cols-2 gap-8">
                {caseStudies.slice(1).map((study) => (
                  <div key={study.id} className="bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-48 object-cover"
                      width={800}
                      height={192}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                          {study.category}
                        </span>
                        <span className="text-sm text-muted-foreground">{study.duration}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3">{study.title}</h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">{study.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>{study.client}</span>
                        </div>
                        <Link to={`/case-studies/${study.id}`} className="text-primary font-medium hover:underline">
                          Learn More →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Section */}
              <div className="text-center mt-16">
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h2>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Join our successful clients and let us help you leverage AI for your business growth and efficiency.
                  </p>
                  <Link to="/appointment">
                    <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors">
                      Schedule a Consultation
                    </button>
                  </Link>
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

export default CaseStudies;
