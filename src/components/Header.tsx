
import React, { useState, useEffect } from "react";
import Container from "./ui/Container";
import { Menu, X } from "lucide-react";
import Button from "./ui/CustomButtonComponent";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-black/70 backdrop-blur-lg shadow-md' : 'py-6 bg-transparent'}`}>
      <Container>
        <div className="flex items-center justify-between">
          <a href="/" className="relative z-10 micro-interaction">
            <div className="flex items-center text-xl font-bold">
              <img src="/lovable-uploads/4a1df2a6-21ec-4f4d-bf1e-0be36a960849.png" alt="Cointegrity Logo" className="h-10 w-auto mr-3" />
              <span className="text-white">
            </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            <a href="#services" className="micro-interaction px-4 py-2 text-white/80 hover:text-white transition-colors">
              Services
            </a>
            <a href="#founders" className="micro-interaction px-4 py-2 text-white/80 hover:text-white transition-colors">
              Team
            </a>
            <a href="#accreditations" className="micro-interaction px-4 py-2 text-white/80 hover:text-white transition-colors">
              Accreditations
            </a>
            <a href="#contact" className="pl-4 micro-interaction">
              <Button variant="cta-primary" size="sm">
                Contact Us
              </Button>
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
              <a href="#services" className="micro-interaction w-full py-4 text-xl text-white/90 hover:text-white border-b border-white/10" onClick={() => setIsOpen(false)}>
                Services
              </a>
              <a href="#founders" className="micro-interaction w-full py-4 text-xl text-white/90 hover:text-white border-b border-white/10" onClick={() => setIsOpen(false)}>
                Team
              </a>
              <a href="#accreditations" className="micro-interaction w-full py-4 text-xl text-white/90 hover:text-white border-b border-white/10" onClick={() => setIsOpen(false)}>
                Accreditations
              </a>
              <a href="#contact" className="micro-interaction w-full py-4 text-xl text-white mt-4" onClick={() => setIsOpen(false)}>
                <Button variant="cta-primary" size="lg" className="w-full">
                  Contact Us
                </Button>
              </a>
            </nav>
          </Container>
        </div>}
    </header>;
};

export default Header;
