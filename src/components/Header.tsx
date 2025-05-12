
import React, { useState, useEffect } from "react";
import Container from "./ui/Container";
import { Menu, X } from "lucide-react";
import Button from "./ui/CustomButtonComponent";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Handle background change on scroll
      const offset = window.scrollY;
      setScrolled(offset > 50);

      // Handle section highlighting
      const sections = ['about', 'services', 'partners', 'founders', 'testimonials'];
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

  // Helper function to determine if we should use Link or anchor
  const NavLink = ({ to, children, className, onClick }: { to: string; children: React.ReactNode; className?: string; onClick?: () => void }) => {
    // Use Link for internal routes without hash
    if (to.startsWith('/') && !to.includes('#')) {
      return (
        <Link to={to} className={className} onClick={onClick}>
          {children}
        </Link>
      );
    }
    // Use anchor for hash navigation (section links) or external URLs
    return (
      <a href={to} className={className} onClick={onClick}>
        {children}
      </a>
    );
  };

  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-black/70 backdrop-blur-lg shadow-md' : 'py-6 bg-transparent'}`}>
      <Container>
        <div className="flex items-center justify-between">
          <NavLink to="/" className="relative z-10 micro-interaction">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/23b8985f-164c-4c02-a983-2dfa808c0689.png" 
                alt="Cointegrity Logo" 
                className="h-10 w-auto" 
              />
            </div>
          </NavLink>

          <nav className="hidden md:flex items-center gap-1">
            {[
              { href: "#about", label: "About Us" },
              { href: "#services", label: "Services" },
              { href: "#partners", label: "Partners" },
              { href: "#founders", label: "Team" },
              { href: "#testimonials", label: "Testimonials" }
            ].map(({ href, label }) => (
              <NavLink 
                key={href}
                to={href} 
                className={`micro-interaction px-4 py-2 text-white/80 hover:text-white transition-colors relative
                  ${activeSection === href.slice(1) ? 'text-white' : 'hover:text-white'}
                  ${activeSection === href.slice(1) ? 'font-semibold' : ''}`}
              >
                {label}
              </NavLink>
            ))}
            <NavLink to="#contact" className="pl-4 micro-interaction">
              <Button variant="primary" size="sm">Connect</Button>
            </NavLink>
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
                { href: "#about", label: "About Us" },
                { href: "#services", label: "Services" },
                { href: "#partners", label: "Partners" },
                { href: "#founders", label: "Team" },
                { href: "#testimonials", label: "Testimonials" }
              ].map(({ href, label }) => (
                <NavLink
                  key={href}
                  to={href}
                  className={`micro-interaction w-full py-4 text-xl border-b border-white/10
                    ${activeSection === href.slice(1) ? 'text-white' : 'text-white/90 hover:text-white'}`}
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </NavLink>
              ))}
              <NavLink to="#contact" className="micro-interaction w-full py-4 text-xl text-white mt-4" onClick={() => setIsOpen(false)}>
                <Button variant="primary" size="sm" className="w-full">
                  Contact Us
                </Button>
              </NavLink>
            </nav>
          </Container>
        </div>}
    </header>;
};

export default Header;
