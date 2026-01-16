import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Layers,
  MapPin,
  Sparkles,
  Target,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NotFound from './NotFound';
import { caseStudies } from '@/data/caseStudies';
import ParticleBackground from '@/components/ParticleBackground';

const CaseStudyDetail = () => {
  const { id } = useParams();
  const caseStudy = caseStudies.find((study) => study.id === Number(id));

  if (!caseStudy) {
    return <NotFound />;
  }

  return (
    <>
      <Helmet>
        <title>{caseStudy.title} - Case Study | BIGFAT AI Labs</title>
        <meta name="description" content={caseStudy.description} />
        <meta
          name="keywords"
          content={`${caseStudy.title}, ${caseStudy.category}, AI case study, BIGFAT AI Labs`}
        />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <ParticleBackground />
        <Navbar />

        <main className="py-20">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Case Studies
              </Link>

              <section className="mt-8 rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-8 lg:p-12">
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                    {caseStudy.category}
                  </span>
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {caseStudy.client}
                  </span>
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {caseStudy.duration}
                  </span>
                </div>

                <div className="mt-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
                  <div>
                    <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight">
                      {caseStudy.title}
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                      {caseStudy.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {caseStudy.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium rounded-full border border-foreground/10 bg-background/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-primary/10 shadow-lg">
                    <img
                      src={caseStudy.image}
                      alt={caseStudy.title}
                      className="w-full h-full object-cover"
                      width={900}
                      height={600}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </section>

              <section className="mt-12 grid lg:grid-cols-2 gap-8">
                <div className="bg-card border rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4 text-primary">
                    <Target className="w-5 h-5" />
                    <h2 className="text-xl font-bold">Challenges</h2>
                  </div>
                  <ul className="space-y-3 text-muted-foreground">
                    {caseStudy.challenges.map((challenge) => (
                      <li key={challenge} className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-primary"></span>
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-card border rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4 text-primary">
                    <Sparkles className="w-5 h-5" />
                    <h2 className="text-xl font-bold">Solutions</h2>
                  </div>
                  <ul className="space-y-3 text-muted-foreground">
                    {caseStudy.solutions.map((solution) => (
                      <li key={solution} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-primary mt-1" />
                        <span>{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="mt-12">
                <div className="flex items-center gap-2 mb-6 text-primary">
                  <Target className="w-5 h-5" />
                  <h2 className="text-2xl font-bold">Impact & Results</h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {caseStudy.results.map((result) => (
                    <div
                      key={result.metric}
                      className="bg-card border rounded-2xl p-6 text-center"
                    >
                      <div className="text-3xl font-bold text-primary mb-2">
                        {result.metric}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {result.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-12">
                <div className="flex items-center gap-2 mb-6 text-primary">
                  <Layers className="w-5 h-5" />
                  <h2 className="text-2xl font-bold">Technology Stack</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {caseStudy.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>

              <section className="mt-16">
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
                  <h2 className="text-2xl font-bold mb-4">Ready for Your Own Success Story?</h2>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Let’s explore how BIGFAT AI Labs can build a custom AI roadmap for your business.
                  </p>
                  <Link to="/appointment">
                    <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors">
                      Book a Consultation
                    </button>
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CaseStudyDetail;
