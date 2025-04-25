import React from "react";
import Container from "./ui/Container";
import { Linkedin, Twitter, Youtube, Github } from "lucide-react";
const Footer = () => {
  const currentYear = new Date().getFullYear();
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
              <a href="#" className="text-white/50 hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white/50 hover:text-blue-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-white/50 hover:text-blue-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-white/50 hover:text-blue-400 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-white/70 hover:text-blue-400 transition-colors">Blockchain Development</a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/70 hover:text-blue-400 transition-colors">Strategic Consulting</a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/70 hover:text-blue-400 transition-colors">DeFi Solutions</a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/70 hover:text-blue-400 transition-colors">Security & Compliance</a>
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
                <a href="#" className="text-sm text-white/70 hover:text-blue-400 transition-colors">Web3 Insights</a>
              </li>
              <li>
                <a href="#" className="text-sm text-white/70 hover:text-blue-400 transition-colors">Documentation</a>
              </li>
              <li>
                <a href="#contact" className="text-sm text-white/70 hover:text-blue-400 transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-white/50">
              &copy; {currentYear} Cointegrity AS. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-xs text-white/50 hover:text-blue-400 transition-colors">Privacy Policy</a>
              
              
            </div>
          </div>
        </div>
      </Container>
    </footer>;
};
export default Footer;