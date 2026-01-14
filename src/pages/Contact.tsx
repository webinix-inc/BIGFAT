import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, CheckCircle } from 'lucide-react';
import React from 'react';


const Contact = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    mobile: '',
    requirement: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, requirement: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'https://bigfat-1.onrender.com';
      const response = await fetch(`${API_URL}/api/v1/contact/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', mobile: '', requirement: '', message: '' });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.detail || 'Failed to send message.');
      }
    } catch (error) {
      setErrorMessage('Error connecting to server. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - BIGFAT AI</title>
        <meta
          name="description"
          content="Get in touch with BIGFAT AI for enterprise AI and Generative AI solutions, custom development, and partnerships."
        />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <ParticleBackground />
        <Navbar />

        {/* Page header, aligned with dark theme */}
        <section className="relative z-10 mt-20 border-b border-border/40 bg-background/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Contact</h1>
          </div>
        </section>

        <main className="relative z-10 w-full">
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Top: heading + form + contact cards */}
            <div className="grid gap-12 lg:grid-cols-[1.4fr_minmax(0,1fr)] items-start">
              {/* Left: form */}
              <div>
                <p className="text-base font-bold tracking-[0.25em] text-primary mb-3 uppercase drop-shadow-sm">
                  Contact now
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight text-white drop-shadow-md">
                  Have Question? Write a <br className="hidden sm:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                    Message
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground/80 mb-10 max-w-xl leading-relaxed">
                  We will catch you as early as we receive the message.
                </p>

                {isSuccess ? (
                  <div className="glass-card p-10 text-center animate-fade-up border border-primary/20 bg-primary/5">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-glow-cyan/20 ring-1 ring-primary/30">
                      <CheckCircle className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">Message Sent!</h3>
                    <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                      Thank you for reaching out. We have received your message and will get back to you shortly.
                    </p>
                    <Button
                      onClick={() => setIsSuccess(false)}
                      className="rounded-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 px-8"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground ml-1 uppercase tracking-wider">Enter name</label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Enter Name"
                          className="h-14 rounded-2xl bg-white/5 border-white/10 text-lg px-6 placeholder:text-white/30 focus:border-primary/50 focus:bg-white/10 transition-all duration-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground ml-1 uppercase tracking-wider">Enter email</label>
                        <Input
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          type="email"
                          placeholder="Enter Email"
                          className="h-14 rounded-2xl bg-white/5 border-white/10 text-lg px-6 placeholder:text-white/30 focus:border-primary/50 focus:bg-white/10 transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground ml-1 uppercase tracking-wider">Enter mobile</label>
                        <Input
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          required
                          placeholder="Enter Mobile"
                          className="h-14 rounded-2xl bg-white/5 border-white/10 text-lg px-6 placeholder:text-white/30 focus:border-primary/50 focus:bg-white/10 transition-all duration-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground ml-1 uppercase tracking-wider">Select requirement</label>
                        <Select onValueChange={handleSelectChange} value={formData.requirement}>
                          <SelectTrigger className="h-14 rounded-2xl bg-white/5 border-white/10 text-lg px-6 text-white/90 focus:border-primary/50 focus:bg-white/10 transition-all duration-300">
                            <SelectValue placeholder="Select requirement" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-900/95 backdrop-blur-xl border-white/10 rounded-xl">
                            <SelectItem value="consulting" className="text-lg py-3 focus:bg-white/10 text-white">AI Consulting</SelectItem>
                            <SelectItem value="platform" className="text-lg py-3 focus:bg-white/10 text-white">Enterprise AI Platform</SelectItem>
                            <SelectItem value="agents" className="text-lg py-3 focus:bg-white/10 text-white">AI Agents / Automation</SelectItem>
                            <SelectItem value="other" className="text-lg py-3 focus:bg-white/10 text-white">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground ml-1 uppercase tracking-wider">Enter your message</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us about your use case and goals."
                        className="resize-none rounded-2xl bg-white/5 border-white/10 text-lg p-6 placeholder:text-white/30 focus:border-primary/50 focus:bg-white/10 transition-all duration-300"
                      />
                    </div>

                    {errorMessage && (
                      <div className="text-red-400 text-sm px-1">
                        {errorMessage}
                      </div>
                    )}

                    <div className="pt-4">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="h-14 w-full sm:w-auto rounded-full bg-gradient-to-r from-primary to-glow-cyan hover:from-primary/90 hover:to-glow-cyan/90 text-white px-12 text-lg font-semibold tracking-wide shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                      >
                        {isSubmitting ? 'Sending...' : 'Submit'}
                      </Button>
                    </div>
                  </form>
                )}
              </div>

              {/* Right: contact detail cards */}
              <div className="space-y-6 lg:mt-8">
                <div className="glass-card p-8 hover:bg-white/10 transition-colors duration-300">
                  <div className="flex items-start gap-5">
                    <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-lg font-bold text-white uppercase tracking-wide mb-2">Phone</h2>
                      <p className="text-base text-muted-foreground mb-1">
                        Assistance hours: Monday – Saturday, 9 am to 5 pm.
                      </p>
                      <p className="text-xl font-bold text-white">
                        +91 8700258968
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-8 hover:bg-white/10 transition-colors duration-300">
                  <div className="flex items-start gap-5">
                    <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-lg font-bold text-white uppercase tracking-wide mb-2">Email</h2>
                      <p className="text-base text-muted-foreground mb-1">
                        Our support team will get back to you in 24 hours during business days.
                      </p>
                      <p className="text-xl font-bold text-white break-all">
                        bigfatailabs@bigfat.ai
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Offices section at the end */}
            <div className="mt-24 max-w-5xl mx-auto text-center">
              <p className="text-base font-bold tracking-[0.25em] text-primary mb-3 uppercase">
                Our locations
              </p>
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-white">Our Office</h2>

              <div className="grid gap-8 md:grid-cols-2 text-left">
                {/* Corporate office card */}
                <div className="relative group h-full">
                  <div className="glass-card h-full p-8 md:p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_22px_60px_rgba(56,189,248,0.2)]">
                    <div className="mb-6 inline-flex px-4 py-1.5 rounded-full bg-gradient-to-r from-glow-cyan/20 to-primary/20 border border-primary/20 items-center justify-center text-[10px] font-bold tracking-[0.25em] text-primary uppercase">
                      India
                    </div>
                    <p className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase mb-3">
                      Corporate Office
                    </p>
                    <h3 className="text-2xl font-bold mb-3 text-white">World Trade Tower</h3>
                    <p className="text-lg font-medium text-muted-foreground/80 leading-relaxed">
                      Sector 16, Noida,
                      <br />
                      Uttar Pradesh – 201301
                    </p>
                  </div>
                  <div className="pointer-events-none absolute inset-x-6 -bottom-4 h-6 rounded-full bg-gradient-to-r from-primary/40 via-glow-cyan/40 to-primary/40 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                </div>

                {/* Registered office card */}
                <div className="relative group h-full">
                  <div className="glass-card h-full p-8 md:p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_22px_60px_rgba(56,189,248,0.2)]">
                    <div className="mb-6 inline-flex px-4 py-1.5 rounded-full bg-gradient-to-r from-glow-cyan/20 to-primary/20 border border-primary/20 items-center justify-center text-[10px] font-bold tracking-[0.25em] text-primary uppercase">
                      India
                    </div>
                    <p className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase mb-3">
                      Registered Office
                    </p>
                    <h3 className="text-2xl font-bold mb-3 text-white">Innov8 - 3rd Floor</h3>
                    <p className="text-lg font-medium text-muted-foreground/80 leading-relaxed">
                      Orchid Centre,<br />
                      Gurugram, Haryana 122022
                    </p>
                  </div>
                  <div className="pointer-events-none absolute inset-x-6 -bottom-4 h-6 rounded-full bg-gradient-to-r from-primary/40 via-glow-cyan/40 to-primary/40 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Contact;


