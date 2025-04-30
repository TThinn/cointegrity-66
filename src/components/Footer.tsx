import React from "react";
import { Link } from "react-router-dom";
import Container from "./ui/Container";
import { Linkedin, Twitter, Youtube, Github } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const {
    trackEvent
  } = useAnalytics();
  const handleSocialClick = (platform: string) => {
    trackEvent('social_click', {
      category: 'Social',
      label: platform
    });
  };
  return <footer className="bg-gradient-to-br from-[#000624] to-[#282c2f] pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <a href="#" className="flex items-center space-x-2">
              <span className="font-semibold text-xl text-white">Cointegrity</span>
            </a>
            <p className="mt-4 text-sm text-white/70">
              A premier Web3 consultancy helping businesses navigate the decentralized landscape with confidence.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-white/50 hover:text-blue-400 transition-colors" onClick={() => handleSocialClick('twitter')}>
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white/50 hover:text-blue-400 transition-colors" onClick={() => handleSocialClick('linkedin')}>
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-white/50 hover:text-blue-400 transition-colors" onClick={() => handleSocialClick('github')}>
                
              </a>
              <a href="#" className="text-white/50 hover:text-blue-400 transition-colors" onClick={() => handleSocialClick('youtube')}>
                
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-sm text-white/70 hover:text-blue-400 transition-colors">Strategic Positioning</a>
              </li>
              <li>
                <a href="#services" className="text-sm text-white/70 hover:text-blue-400 transition-colors">Strateic Consulting</a>
              </li>
              <li>
                <a href="#services" className="text-sm text-white/70 hover:text-blue-400 transition-colors">Regulatory Navigatioin</a>
              </li>
              <li>
                <a href="#services" className="text-sm text-white/70 hover:text-blue-400 transition-colors">Capital Acceleration</a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-white/70 hover:text-blue-400 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#founders" className="text-sm text-white/70 hover:text-blue-400 transition-colors">Our Team</a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/70 hover:text-blue-400 transition-colors">Case Studies</a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/70 hover:text-blue-400 transition-colors">Careers</a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-white/70 hover:text-blue-400 transition-colors">Blog</a>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-white/70 hover:text-blue-400 transition-colors" onClick={() => trackEvent('privacy_policy_click')}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-white/70 hover:text-blue-400 transition-colors">Documentation</a>
              </li>
              <li>
                <a href="#contact" className="text-sm text-white/70 hover:text-blue-400 transition-colors" onClick={() => trackEvent('footer_contact_click')}>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <div className="mb-4 md:mb-0">
              <img src="/lovable-uploads/32e8bd55-2f0b-4772-bab3-657297e9573f.png" alt="Cointegrity Logo" className="h-6 w-auto" />
            </div>
            <p className="text-sm text-white/50">
              &copy; {currentYear} Cointegrity AS. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>;
};
export default Footer;