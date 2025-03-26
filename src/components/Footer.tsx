import React from "react";
import Container from "./ui/Container";
import { Linkedin, Twitter, Youtube, Github } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <a href="#" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg bg-purple-blue-gradient flex items-center justify-center">
                <span className="text-white font-bold text-lg">Ω</span>
              </div>
              <span className="font-semibold text-xl text-gray-800">Omega</span>
            </a>
            <p className="mt-4 text-sm text-gray-600">
              A premier Web3 consultancy helping businesses navigate the decentralized landscape with confidence.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-800 mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">Blockchain Development</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">Strategic Consulting</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">DeFi Solutions</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">Security & Compliance</a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-800 mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#founders" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">Our Team</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">Case Studies</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">Careers</a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-gray-800 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">Blog</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">Web3 Insights</a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">Documentation</a>
              </li>
              <li>
                <a href="#contact" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; {currentYear} Cointegrity AS. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-xs text-gray-500 hover:text-purple-600 transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-gray-500 hover:text-purple-600 transition-colors">Terms of Service</a>
              <a href="#" className="text-xs text-gray-500 hover:text-purple-600 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
