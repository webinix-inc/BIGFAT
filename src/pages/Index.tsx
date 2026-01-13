import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SolutionsSection from '@/components/SolutionsSection';
import WhyChooseSection from '@/components/WhyChooseSection';
import ProductsSection from '@/components/ProductsSection';
import BlogSection from '@/components/BlogSection';
import OurClientsSection from '@/components/OurClientsSection';
import ClientTestimonialsSection from '@/components/ClientTestimonialsSection';
import TeamsSection from '@/components/TeamsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
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
          <SolutionsSection />
          <WhyChooseSection />
          <ProductsSection />
          <BlogSection />
          <OurClientsSection />
          <ClientTestimonialsSection />
          <TeamsSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;