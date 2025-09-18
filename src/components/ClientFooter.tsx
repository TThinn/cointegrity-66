import React from "react";
import { Link, useLocation } from "react-router-dom";
import Container from "./ui/Container";
import OptimizedImage from "./ui/OptimizedImage";

const ClientFooter = () => {
  const location = useLocation();

  const NavLink = ({ 
    to, 
    children, 
    className = "" 
  }: { 
    to: string; 
    children: React.ReactNode;
    className?: string;
  }) => {
    if (to.startsWith('#') && location.pathname === '/') {
      return <a href={to} className={className}>{children}</a>;
    }
    return <Link to={to} className={className}>{children}</Link>;
  };

  const quickLinks = [
    { name: "Home", to: location.pathname === '/' ? '#hero' : '/' },
    { name: "Services", to: location.pathname === '/' ? '#services' : '/#services' },
    { name: "About", to: location.pathname === '/' ? '#about' : '/#about' },
    { name: "Contact", to: location.pathname === '/' ? '#contact' : '/#contact' },
  ];

  return (
    <footer className="client-bg border-t border-client-border">
      <Container className="client-container">
        <div className="client-section">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <OptimizedImage
                  src="/lovable-uploads/Cointegrity_LogoIcon_Green.png"
                  alt="Cointegrity Logo"
                  className="h-8 w-auto"
                />
              </div>
              <p className="client-text-muted text-sm leading-relaxed">
                Professional blockchain consulting and Web3 solutions for enterprise clients.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="client-heading-sm mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.to}
                      className="client-text-muted hover:text-client-accent transition-colors text-sm"
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="client-heading-sm mb-4">Contact Us</h3>
              <div className="space-y-3">
                <a 
                  href="mailto:hello@cointegrity.com" 
                  className="client-text-muted hover:text-client-accent transition-colors text-sm block"
                >
                  hello@cointegrity.com
                </a>
                <a 
                  href="https://www.linkedin.com/company/cointegrity/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="client-text-muted hover:text-client-accent transition-colors text-sm block"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-client-border mt-8 pt-6">
            <p className="client-text-muted text-center text-sm">
              © 2024 Cointegrity. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default ClientFooter;