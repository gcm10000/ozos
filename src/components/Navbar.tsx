
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-6'}`}>
      <div className="container flex items-center justify-between">
        <a href="#" className="text-2xl font-bold text-ozos-navy">
          <span className="text-ozos-blue">O</span>zos
        </a>

        {/* Desktop Menu */}
        <div className="hidden space-x-8 md:flex">
          <a href="#services" className="text-gray-700 transition-colors hover:text-ozos-blue">
            Services
          </a>
          <a href="#portfolio" className="text-gray-700 transition-colors hover:text-ozos-blue">
            Portfolio
          </a>
          <a href="#testimonials" className="text-gray-700 transition-colors hover:text-ozos-blue">
            Testimonials
          </a>
          <a href="#contact" className="text-gray-700 transition-colors hover:text-ozos-blue">
            Contact
          </a>
        </div>

        <div className="hidden md:block">
          <Button className="bg-ozos-blue hover:bg-blue-600 text-white">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="p-2 text-gray-700 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute w-full py-4 bg-white shadow-lg md:hidden">
          <div className="flex flex-col px-4 space-y-4">
            <a href="#services" className="text-gray-700 transition-colors hover:text-ozos-blue" onClick={() => setMobileMenuOpen(false)}>
              Services
            </a>
            <a href="#portfolio" className="text-gray-700 transition-colors hover:text-ozos-blue" onClick={() => setMobileMenuOpen(false)}>
              Portfolio
            </a>
            <a href="#testimonials" className="text-gray-700 transition-colors hover:text-ozos-blue" onClick={() => setMobileMenuOpen(false)}>
              Testimonials
            </a>
            <a href="#contact" className="text-gray-700 transition-colors hover:text-ozos-blue" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </a>
            <Button className="bg-ozos-blue hover:bg-blue-600 text-white">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
