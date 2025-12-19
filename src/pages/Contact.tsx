import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, MessageCircleMore } from 'lucide-react';

const Contact = () => {
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

        <main className="relative z-10">
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Top: heading + form + contact cards */}
            <div className="grid gap-10 lg:grid-cols-[1.4fr_minmax(0,1fr)] items-start">
              {/* Left: form */}
              <div>
                <p className="text-xs font-semibold tracking-[0.25em] text-primary mb-3 uppercase">
                  Contact now
                </p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  Have Question? Write a <br className="hidden sm:block" />
                  Message
                </h1>
                <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl">
                  We will catch you as early as we receive the message.
                </p>

                <form className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium mb-1">Enter name</label>
                      <Input placeholder="Enter Name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Enter email</label>
                      <Input type="email" placeholder="Enter Email" />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium mb-1">Enter mobile</label>
                      <Input placeholder="Enter Mobile" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Select requirement</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select requirement" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consulting">AI consulting</SelectItem>
                          <SelectItem value="platform">Enterprise AI platform</SelectItem>
                          <SelectItem value="agents">AI agents / automation</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Enter your message</label>
                    <Textarea rows={4} placeholder="Tell us about your use case and goals." />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full sm:w-auto rounded-full bg-gradient-to-r from-primary to-glow-cyan text-white px-10"
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </div>

              {/* Right: contact detail cards */}
              <div className="space-y-5 text-sm">
                <div className="glass-card rounded-2xl border border-border/40 bg-background/60 backdrop-blur px-6 py-5 shadow-[0_18px_45px_rgba(15,23,42,0.7)]">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 rounded-full bg-primary/10 p-2 text-primary">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-base font-semibold mb-1">Phone</h2>
                      <p className="text-xs text-muted-foreground mb-2">
                        Assistance hours: Monday – Saturday, 9 am to 5 pm.
                      </p>
                      <p className="font-medium text-foreground opacity-60">
                        {/* Phone number to be added */}
                        Add phone number
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-2xl border border-border/40 bg-background/60 backdrop-blur px-6 py-5 shadow-[0_18px_45px_rgba(15,23,42,0.7)]">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 rounded-full bg-primary/10 p-2 text-primary">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-base font-semibold mb-1">Email</h2>
                      <p className="text-xs text-muted-foreground mb-2">
                        Our support team will get back to you in 24 hours during business days.
                      </p>
                      <p className="font-medium text-foreground">Email: bigfatailabs@bigfat.ai</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-2xl border border-border/40 bg-background/60 backdrop-blur px-6 py-5 shadow-[0_18px_45px_rgba(15,23,42,0.7)]">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 rounded-full bg-primary/10 p-2 text-primary">
                      <MessageCircleMore className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-base font-semibold mb-1">Skype</h2>
                      <p className="text-xs text-muted-foreground mb-2">
                        We are online: Monday – Friday, 9 am to 5 pm.
                      </p>
                      <p className="font-medium text-foreground opacity-60">
                        {/* Skype / chat handle to be added */}
                        Add Skype / chat handle
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Offices section at the end */}
            <div className="mt-20 max-w-4xl mx-auto text-center">
              <p className="text-xs font-semibold tracking-[0.25em] text-primary mb-2 uppercase">
                Our locations
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-10">Our Office</h2>

              <div className="grid gap-8 md:grid-cols-2 text-left">
                {/* Corporate office card */}
                <div className="relative group">
                  <div className="glass-card rounded-3xl border border-border/40 px-6 sm:px-8 py-8 bg-background/80 backdrop-blur transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_22px_60px_rgba(56,189,248,0.3)]">
                    <div className="w-16 h-8 rounded-full bg-gradient-to-r from-glow-cyan to-primary mb-4 flex items-center justify-center text-[10px] font-semibold tracking-[0.25em] text-white uppercase">
                      India
                    </div>
                    <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase mb-2">
                      Corporate Office
                    </p>
                    <p className="font-semibold text-lg mb-1">World Trade Tower</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Sector 16, Noida,
                      <br />
                      Uttar Pradesh – 201301
                    </p>
                  </div>
                  <div className="pointer-events-none absolute inset-x-6 -bottom-4 h-6 rounded-full bg-gradient-to-r from-primary/40 via-glow-cyan/40 to-primary/40 blur-xl opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
                </div>

                {/* Registered office card */}
                <div className="relative group">
                  <div className="glass-card rounded-3xl border border-border/40 px-6 sm:px-8 py-8 bg-background/80 backdrop-blur transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_22px_60px_rgba(56,189,248,0.3)]">
                    <div className="w-16 h-8 rounded-full bg-gradient-to-r from-glow-cyan to-primary mb-4 flex items-center justify-center text-[10px] font-semibold tracking-[0.25em] text-white uppercase">
                      India
                    </div>
                    <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase mb-2">
                      Registered Office
                    </p>
                    <p className="font-semibold text-lg mb-1">Innov8 - 3rd Floor, Orchid Centre</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Gurugram, Haryana 122022
                    </p>
                  </div>
                  <div className="pointer-events-none absolute inset-x-6 -bottom-4 h-6 rounded-full bg-gradient-to-r from-primary/40 via-glow-cyan/40 to-primary/40 blur-xl opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
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


