import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import { lazy, Suspense } from 'react';
const SolutionsSection = lazy(() => import('@/components/SolutionsSection'));
const WhyChooseSection = lazy(() => import('@/components/WhyChooseSection'));
const ProductsSection = lazy(() => import('@/components/ProductsSection'));
const ProjectsSection = lazy(() => import('@/components/ProjectsSection')); // Added ProjectsSection
const BlogSection = lazy(() => import('@/components/BlogSection'));
const OurClientsSection = lazy(() => import('@/components/OurClientsSection'));
const ClientTestimonialsSection = lazy(() => import('@/components/ClientTestimonialsSection'));
const TeamsSection = lazy(() => import('@/components/TeamsSection'));
const CTASection = lazy(() => import('@/components/CTASection'));
const Footer = lazy(() => import('@/components/Footer'));
import ParticleBackground from '@/components/ParticleBackground';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>BIGFAT AI - Enterprise AI & Generative AI Solutions</title>
        <meta
          name="description"
          content="Transform your business with cutting-edge GenAI products, enterprise AI platforms, and intelligent automation solutions powered by the latest LLMs and ML technologies."
        />
        <meta name="keywords" content="AI, artificial intelligence, generative AI, LLM, enterprise AI, SaaS, machine learning, BIGFAT AI" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="BIGFAT AI - Enterprise AI & Generative AI Solutions" />
        <meta property="og:description" content="Transform your business with cutting-edge GenAI products, enterprise AI platforms, and intelligent automation solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bigfatai.com" />
        <meta property="og:site_name" content="BIGFAT AI Labs" />
        <meta property="og:image" content="https://bigfatai.com/og-image.jpg" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BIGFAT AI - Enterprise AI & Generative AI Solutions" />
        <meta name="twitter:description" content="Transform your business with cutting-edge GenAI products, enterprise AI platforms, and intelligent automation solutions." />
        <meta name="twitter:image" content="https://bigfatai.com/twitter-image.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://bigfatai.com" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "BIGFAT AI Labs",
            "description": "Transform your business with cutting-edge GenAI products, enterprise AI platforms, and intelligent automation solutions",
            "url": "https://bigfatai.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://bigfatai.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <ParticleBackground />
        <Navbar />
        <main id="home">
          <HeroSection />
          <Suspense fallback={<div className="h-20" />}>
            <SolutionsSection />
            <WhyChooseSection />
            <ProductsSection />
            <ProjectsSection /> {/* Added ProjectsSection */}
            <BlogSection />
            <OurClientsSection />
            <ClientTestimonialsSection />
            <TeamsSection />
            <CTASection />
          </Suspense>
        </main>
        <Suspense fallback={<div className="h-20" />}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default Index;