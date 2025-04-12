
import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 text-white bg-ozos-navy">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <a href="#" className="text-2xl font-bold">
              <span className="text-ozos-blue">O</span>zos
            </a>
            <p className="mt-4 text-blue-200">
              Creating outstanding portfolio websites for professionals and businesses.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white">Services</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-blue-200 transition-colors hover:text-ozos-blue">Portfolio Design</a></li>
              <li><a href="#" className="text-blue-200 transition-colors hover:text-ozos-blue">Development</a></li>
              <li><a href="#" className="text-blue-200 transition-colors hover:text-ozos-blue">Responsive Design</a></li>
              <li><a href="#" className="text-blue-200 transition-colors hover:text-ozos-blue">SEO Optimization</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white">About</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-blue-200 transition-colors hover:text-ozos-blue">Our Team</a></li>
              <li><a href="#" className="text-blue-200 transition-colors hover:text-ozos-blue">Company</a></li>
              <li><a href="#" className="text-blue-200 transition-colors hover:text-ozos-blue">Careers</a></li>
              <li><a href="#" className="text-blue-200 transition-colors hover:text-ozos-blue">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white">Connect</h3>
            <div className="flex mt-4 space-x-3">
              <a href="#" className="p-2 text-blue-200 transition-colors rounded-full hover:text-ozos-blue hover:bg-white/10">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 text-blue-200 transition-colors rounded-full hover:text-ozos-blue hover:bg-white/10">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 text-blue-200 transition-colors rounded-full hover:text-ozos-blue hover:bg-white/10">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 text-blue-200 transition-colors rounded-full hover:text-ozos-blue hover:bg-white/10">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <p className="mt-4 text-blue-200">
              Sign up for our newsletter to receive the latest updates.
            </p>
          </div>
        </div>
        
        <div className="pt-8 mt-12 text-center border-t border-blue-800">
          <p className="text-blue-300">
            &copy; {new Date().getFullYear()} Ozos. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
