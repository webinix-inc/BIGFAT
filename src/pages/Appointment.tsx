import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AppointmentBooking from '../components/AppointmentBooking';
import { Calendar, Clock, MapPin, Phone, Mail } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground';

const Appointment = () => {
  return (
    <>
      <Helmet>
        <title>Book Appointment - BIGFAT AI Labs | AI Consultation</title>
        <meta
          name="description"
          content="Schedule a consultation with BIGFAT AI experts. Book your appointment for AI solutions, demos, and project discussions. Transform your business with AI."
        />
        <meta name="keywords" content="AI appointment, consultation booking, BIGFAT AI, AI expert consultation, enterprise AI meeting, AI demo" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Book Appointment - BIGFAT AI Labs | AI Consultation" />
        <meta property="og:description" content="Schedule a consultation with BIGFAT AI experts. Book your appointment for AI solutions, demos, and project discussions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bigfatai.com/appointment" />
        <meta property="og:site_name" content="BIGFAT AI Labs" />
        <meta property="og:image" content="https://bigfatai.com/og-image.jpg" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Book Appointment - BIGFAT AI Labs | AI Consultation" />
        <meta name="twitter:description" content="Schedule a consultation with BIGFAT AI experts. Book your appointment for AI solutions, demos, and project discussions." />
        <meta name="twitter:image" content="https://bigfatai.com/twitter-image.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://bigfatai.com/appointment" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Book Appointment - BIGFAT AI Labs",
            "description": "Schedule a consultation with BIGFAT AI experts for enterprise AI solutions and project discussions",
            "url": "https://bigfatai.com/appointment",
            "mainEntity": {
              "@type": "Organization",
              "name": "BIGFAT AI Labs",
              "url": "https://bigfatai.com",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": ["English"],
                "schedulingUrl": "https://cal.com/bigfat-ai-tasbkl"
              }
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
              {/* Header Section */}
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                  Schedule Your <span className="gradient-text">AI Consultation</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Book a personalized consultation with our AI experts to discuss your project requirements,
                  see live demos, and explore how we can transform your business with cutting-edge AI solutions.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Booking Form */}
                <div className="order-2 lg:order-1">
                  <div className="bg-card border rounded-2xl p-8 shadow-sm h-full">
                    <AppointmentBooking />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="order-1 lg:order-2 space-y-6">
                  {/* Quick Contact */}
                  <div className="bg-card border rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Quick Contact
                    </h3>
                    <div className="space-y-3">
                      <a 
                        href="tel:+918700258968" 
                        className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span>+91 8700258968</span>
                      </a>
                      <a 
                        href="mailto:bigfatailabs@bigfat.ai" 
                        className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        <span>bigfatailabs@bigfat.ai</span>
                      </a>
                    </div>
                  </div>

                  {/* Office Hours */}
                  <div className="bg-card border rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Office Hours
                    </h3>
                    <div className="space-y-2 text-muted-foreground">
                      <p>Monday - Saturday</p>
                      <p className="font-medium text-foreground">9:00 AM - 5:00 PM IST</p>
                      <p className="text-sm">Closed on Sundays</p>
                    </div>
                  </div>

                  {/* Office Locations */}
                  <div className="bg-card border rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Office Locations
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-1">Corporate Office</h4>
                        <p className="text-sm text-muted-foreground">
                          World Trade Tower<br />
                          Sector 16, Noida<br />
                          Uttar Pradesh – 201301
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Registered Office</h4>
                        <p className="text-sm text-muted-foreground">
                          Innov8 - 3rd Floor, Orchid Centre<br />
                          Gurugram, Haryana 122022
                        </p>
                      </div>
                    </div>
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

export default Appointment;
