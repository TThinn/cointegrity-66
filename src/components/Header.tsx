import React, { useState, useEffect } from "react";
import Container from "./ui/Container";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
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
          {/* Logo */}
          <a href="/" className="relative z-10">
            <div className="flex items-center text-xl font-bold">
              <img src="/lovable-uploads/4a1df2a6-21ec-4f4d-bf1e-0be36a960849.png" alt="Cointegrity Logo" className="h-10 w-auto mr-3" />
              <span className="text-white">
            </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <a href="#services" className="px-4 py-2 text-white/80 hover:text-white transition-colors">
              Services
            </a>
            <a href="#founders" className="px-4 py-2 text-white/80 hover:text-white transition-colors">
              Team
            </a>
            <a href="#accreditations" className="px-4 py-2 text-white/80 hover:text-white transition-colors">
              Accreditations
            </a>
            <a href="#contact" className="pl-4">
              <Button size="sm" className="bg-gradient-to-r from-pink-600 via-pink-500 to-[#483AA7] hover:opacity-90 text-white rounded-lg shadow-button" asChild>
                <span>
                  Contact Us
                </span>
              </Button>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile Navigation */}
      {isOpen && <div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-40 md:hidden pt-20">
          <Container>
            <nav className="flex flex-col gap-4 items-center text-center">
              <a href="#services" className="w-full py-4 text-xl text-white/90 hover:text-white border-b border-white/10" onClick={() => setIsOpen(false)}>
                Services
              </a>
              <a href="#founders" className="w-full py-4 text-xl text-white/90 hover:text-white border-b border-white/10" onClick={() => setIsOpen(false)}>
                Team
              </a>
              <a href="#accreditations" className="w-full py-4 text-xl text-white/90 hover:text-white border-b border-white/10" onClick={() => setIsOpen(false)}>
                Accreditations
              </a>
              <Button size="lg" className="bg-gradient-to-r from-pink-600 via-pink-500 to-[#483AA7] hover:opacity-90 text-white mt-4 w-full" asChild>
                <a href="#contact" onClick={() => setIsOpen(false)}>
                  Contact Us
                </a>
              </Button>
            </nav>
          </Container>
        </div>}
    </header>;
};

export default Header;
