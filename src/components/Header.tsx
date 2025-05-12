
import React, { useState, useEffect } from "react";
import Container from "./ui/Container";
import { Menu, X } from "lucide-react";
import Button from "./ui/CustomButtonComponent";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Handle background change on scroll
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper function to determine if a route is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-black/70 backdrop-blur-lg shadow-md' : 'py-6 bg-transparent'}`}>
      <Container>
        <div className="flex items-center justify-between">
          <Link to="/" className="relative z-10 micro-interaction">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/23b8985f-164c-4c02-a983-2dfa808c0689.png" 
                alt="Cointegrity Logo" 
                className="h-10 w-auto" 
              />
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {[
              { to: "/about", label: "About Us" },
              { to: "/services", label: "Services" },
              { to: "/partners", label: "Partners" },
              { to: "/team", label: "Team" },
              { to: "/testimonials", label: "Testimonials" }
            ].map(({ to, label }) => (
              <Link 
                key={to}
                to={to} 
                className={`micro-interaction px-4 py-2 transition-colors relative
                  ${isActive(to) ? 'text-white font-semibold' : 'text-white/80 hover:text-white'}`}
              >
                {label}
              </Link>
            ))}
            <Link to="/contact" className="pl-4 micro-interaction">
              <Button variant="primary" size="sm">Connect</Button>
            </Link>
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
                { to: "/about", label: "About Us" },
                { to: "/services", label: "Services" },
                { to: "/partners", label: "Partners" },
                { to: "/team", label: "Team" },
                { to: "/testimonials", label: "Testimonials" }
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`micro-interaction w-full py-4 text-xl border-b border-white/10
                    ${isActive(to) ? 'text-white' : 'text-white/90 hover:text-white'}`}
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <Link to="/contact" className="micro-interaction w-full py-4 text-xl text-white mt-4" onClick={() => setIsOpen(false)}>
                <Button variant="primary" size="sm" className="w-full">
                  Contact Us
                </Button>
              </Link>
            </nav>
          </Container>
        </div>}
    </header>;
};

export default Header;
