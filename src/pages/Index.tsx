import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import { lazy, Suspense } from 'react';
const SolutionsSection = lazy(() => import('@/components/SolutionsSection'));
const WhyChooseSection = lazy(() => import('@/components/WhyChooseSection'));
const ProductsSection = lazy(() => import('@/components/ProductsSection'));
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