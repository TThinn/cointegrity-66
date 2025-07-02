import React from "react";
import Container from "./ui/Container";
import { Link, useLocation } from "react-router-dom";
import { CopyrightNotice } from "./legal/CopyrightNotice";
const Footer = () => {
  const location = useLocation();
  const isHomepage = location.pathname === '/';

  // Helper function to determine if we should use Link or anchor
  const NavLink = ({
    to,
    children,
    className,
    target,
    rel,
    "aria-label": ariaLabel
  }: {
    to: string;
    children: React.ReactNode;
    className?: string;
    target?: string;
    rel?: string;
    "aria-label"?: string;
  }) => {
    // For hash links on homepage
    if (isHomepage && to.startsWith('#')) {
      return <a href={to} className={className} target={target} rel={rel} aria-label={ariaLabel}>
          {children}
        </a>;
    }

    // Use Link for internal routes without hash
    if (to.startsWith('/') && !to.includes('#')) {
      return <Link to={to} className={className}>
          {children}
        </Link>;
    }

    // Use anchor for external URLs
    return <a href={to} className={className} target={target} rel={rel} aria-label={ariaLabel}>
        {children}
      </a>;
  };

  // Navigation links configuration
  const quickLinks = [{
    to: isHomepage ? "#about" : "/about",
    label: "About Us"
  }, {
    to: isHomepage ? "#services" : "/services",
    label: "Services"
  }, {
    to: isHomepage ? "#partners" : "/partners",
    label: "Partners"
  }, {
    to: isHomepage ? "#founders" : "/team",
    label: "Team"
  }, {
    to: isHomepage ? "#testimonials" : "/testimonials",
    label: "Testimonials"
  }, {
    to: isHomepage ? "#contact" : "/contact",
    label: "Contact"
  }, {
    to: "/privacy",
    label: "Privacy Policy"
  }];
  return <footer className="bg-[#080112] text-white py-12 border-t border-white/10">
      <Container>
        <div className="flex flex-col md:flex-row justify-between">
          {/* Logo and intro */}
          <div className="mb-8 md:mb-0 w-full md:w-1/3 pr-0 md:pr-8">
            <NavLink to="/" className="inline-block mb-4">
              <img src="/lovable-uploads/68d5ee22-66d4-4e4d-b0dc-e03f0a45adab.png" alt="Cointegrity Logo" className="h-10 w-auto" />
            </NavLink>
            <p className="text-white/70 mb-4">Expert Web3 Consultancy specializing in blockchain strategy, regulatory compliance, and Web3 implementation services for organizations navigating digital asset transformation and decentralized infrastructure.</p>
          </div>
          
          {/* Quick links */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map(link => <NavLink key={link.label} to={link.to} className="text-white/70 hover:text-white transition-colors py-1">
                  {link.label}
                </NavLink>)}
            </div>
          </div>
          
          {/* Contact information */}
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-white/70 mb-2">
              <span className="block font-medium text-white">Email:</span>
              <NavLink to="mailto:hello@cointegrity.io" className="hover:text-white transition-colors">
                hello@cointegrity.io
              </NavLink>
            </p>
            
            <div className="flex mt-4 space-x-4">
              <NavLink to="https://twitter.com/cointegrity" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <svg className="w-6 h-6 text-white/70 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </NavLink>
              <NavLink to="https://linkedin.com/company/cointegrity" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg className="w-6 h-6 text-white/70 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
              </NavLink>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10">
          <CopyrightNotice variant="footer" />
        </div>
      </Container>
    </footer>;
};
export default Footer;