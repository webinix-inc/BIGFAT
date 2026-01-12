import { memo } from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const footerLinks = {
  solutions: [
    { name: 'Generative AI', href: '#' },
    { name: 'Conversational AI', href: '#' },
    { name: 'Enterprise Platforms', href: '#' },
    { name: 'Custom Development', href: '#' },
  ],
  company: [
    { name: 'About Us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Contact', href: '#' },
  ],
  resources: [
    { name: 'Documentation', href: '#' },
    { name: 'API Reference', href: '#' },
    { name: 'Case Studies', href: '#' },
    { name: 'Support', href: '#' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Mail, href: '#', label: 'Email' },
];

const Footer = memo(() => {
  return (
    <footer className="py-16 border-t border-foreground/10 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-glow-cyan/5 to-transparent pointer-events-none" />

      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-3 mb-4">
              <span className="font-display font-bold text-xl">BIGFAT AI LABS</span>
            </a>
            <p className="text-muted-foreground mb-4 max-w-sm">
              Building the future of enterprise AI with cutting-edge LLMs,
              intelligent automation, and scalable SaaS solutions.
            </p>

            {/* Contact Information */}
            <div className="space-y-2 mb-6 text-sm">
              <p className="text-foreground/80 font-semibold">Corporate Office:</p>
              <p className="text-muted-foreground">
                World Trade Tower,<br />
                Sector 16, Noida,<br />
                Uttar Pradesh – 201301
              </p>
              <p className="text-muted-foreground">
                Email: <a href="mailto:bigfatailabs@bigfat.ai" className="text-primary hover:underline">bigfatailabs@bigfat.ai</a>
              </p>
            </div>

            {/* Newsletter */}
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-muted border border-foreground/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 text-sm"
              />
              <Button variant="default" size="default">
                Subscribe
              </Button>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Solutions</h4>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-foreground/10">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © 2024 BIGFAT AI LABS. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center hover:bg-foreground/10 transition-colors group"
              >
                <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;