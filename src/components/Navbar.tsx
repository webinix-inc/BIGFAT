import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const navLinks = [
  { name: 'Home', href: '/#home' },
  { name: 'AI Solutions', href: '/#solutions' },
  { name: 'About', href: '/#about' },
  { name: 'Products', href: '/#products' },
  { name: 'Team', href: '/#team' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Blog', href: '/#blog' },
] as const;

const Navbar = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'nav-glass py-3' : 'bg-transparent py-5'
        }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo text only (image removed as requested) */}
        <Link to="/#home" className="flex items-center gap-3">
          <span className="font-display font-bold text-xl text-foreground">BIGFAT AI LABS</span>
        </Link>

        {/* Desktop Nav - Centered with rounded border */}
        <nav className="hidden lg:flex items-center gap-1 px-6 py-2 rounded-full border border-foreground/10 bg-background/40 backdrop-blur-sm">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium rounded-full hover:bg-foreground/5">
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="https://wa.me/918700258968" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </Button>
          </a>
          <Link to="/contact">
            <Button variant="outline" size="default" className="rounded-full">
              Request a Quote
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden nav-glass mt-2 mx-4 rounded-xl p-4 animate-fade-up">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="hero" className="mt-2 text-left justify-start px-0 w-full">
                Request a Quote
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;