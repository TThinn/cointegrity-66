
import React, { useState, useEffect } from "react";
import Container from "./ui/Container";
import { Menu, X } from "lucide-react";
import Button from "./ui/CustomButtonComponent";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      // Handle background change on scroll
      const offset = window.scrollY;
      setScrolled(offset > 50);

      // Handle section highlighting
      const sections = ['services', 'partners', 'team', 'testimonials'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      setActiveSection(currentSection || '');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-black/70 backdrop-blur-lg shadow-md' : 'py-6 bg-transparent'}`}>
      <Container>
        <div className="flex items-center justify-between">
          <a href="/" className="relative z-10 micro-interaction">
            <div className="flex items-center text-xl font-bold">
              <img src="/lovable-uploads/1bac2890-8c6e-4688-994e-10abf9d0d9be.png" alt="Cointegrity Logo" className="h-10 w-auto mr-3" />
              <span className="text-white"></span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {[
              { href: "#services", label: "Services" },
              { href: "#partners", label: "Partners" },
              { href: "#team", label: "Team" },
              { href: "#testimonials", label: "Testimonials" }
            ].map(({ href, label }) => (
              <a 
                key={href}
                href={href} 
                className={`micro-interaction px-4 py-2 text-white/80 hover:text-white transition-colors relative
                  ${activeSection === href.slice(1) ? 'text-white' : 'hover:text-white'}
                  ${activeSection === href.slice(1) ? 'font-semibold' : ''}`}
              >
                {label}
              </a>
            ))}
            <a href="#contact" className="pl-4 micro-interaction">
              <Button variant="primary" size="sm">Connect</Button>
            </a>
          </nav>

          <button className="md:hidden text-white p-2 micro-interaction" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {isOpen && <div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-40 md:hidden pt-20">
          <Container>
            <nav className="flex flex-col gap-4 items-center text-center">
              {[
                { href: "#services", label: "Services" },
                { href: "#partners", label: "Partners" },
                { href: "#team", label: "Team" },
                { href: "#testimonials", label: "Testimonials" }
              ].map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className={`micro-interaction w-full py-4 text-xl border-b border-white/10
                    ${activeSection === href.slice(1) ? 'text-white' : 'text-white/90 hover:text-white'}`}
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </a>
              ))}
              <a href="#contact" className="micro-interaction w-full py-4 text-xl text-white mt-4" onClick={() => setIsOpen(false)}>
                <Button variant="primary" size="sm" className="w-full">
                  Contact Us
                </Button>
              </a>
            </nav>
          </Container>
        </div>}
    </header>;
};

export default Header;
