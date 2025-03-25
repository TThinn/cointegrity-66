import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Container from "./ui/Container";
import { Button } from "./ui/Button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white py-4 shadow-sm">
      <Container>
        <div className="flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-gray-800">
            Cointegrity
          </a>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="#services" className="text-gray-600 hover:text-gray-800">Services</a>
            <a href="#founders" className="text-gray-600 hover:text-gray-800">Founders</a>
            <a href="#accreditations" className="text-gray-600 hover:text-gray-800">Accreditations</a>
            <a href="#contact" className="text-gray-600 hover:text-gray-800">Contact</a>
            <Button variant="default">Get Started</Button>
          </nav>

          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="md:hidden text-gray-600 hover:text-gray-800">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Mobile menu (conditionally rendered) */}
          {isMenuOpen && (
            <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center space-y-6">
              <button onClick={toggleMenu} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
                <X className="h-6 w-6" />
              </button>
              <a href="#services" className="text-gray-600 hover:text-gray-800">Services</a>
              <a href="#founders" className="text-gray-600 hover:text-gray-800">Founders</a>
              <a href="#accreditations" className="text-gray-600 hover:text-gray-800">Accreditations</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-800">Contact</a>
              <Button variant="default">Get Started</Button>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
