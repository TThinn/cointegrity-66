
import React, { useEffect, useState } from "react";
import Container from "./ui/Container";
import Button from "./ui/Button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-[#080112]/80 backdrop-blur-lg border-b border-white/5"
          : "py-5 bg-transparent"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center group">
            <img 
              src="/lovable-uploads/0d4c386b-c572-4c92-8715-d6725b80040a.png" 
              alt="Cointegrity Logo" 
              className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#services"
              className="text-white/80 hover:text-white transition-colors"
            >
              Services
            </a>
            <a
              href="#founders"
              className="text-white/80 hover:text-white transition-colors"
            >
              Team
            </a>
            <a
              href="#contact"
              className="text-white/80 hover:text-white transition-colors"
            >
              Contact
            </a>
            <Button href="#contact" isGlowing>Get Started</Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden pt-5 pb-2 flex flex-col space-y-4 animate-fade-in">
            <a
              href="#services"
              className="text-white/80 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </a>
            <a
              href="#founders"
              className="text-white/80 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Team
            </a>
            <a
              href="#contact"
              className="text-white/80 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
            <Button 
              href="#contact" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </Button>
          </nav>
        )}
      </Container>
    </header>
  );
};

export default Header;
