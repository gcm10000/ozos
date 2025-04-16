"use client"

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from 'next/link';

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
        <Link href="/" className="text-2xl font-bold text-ozos-navy">
          <span className="text-ozos-blue">O</span>zos
        </Link>

        {/* Desktop Menu */}
        <div className="hidden space-x-8 md:flex items-center">
          {/* Serviços com dropdown */}
          <NavigationMenu className="z-50">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent"
                >
                  <Link href="#" className="text-gray-700 transition-colors hover:text-ozos-blue">
                    Serviços
                  </Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] grid-cols-2">
                    <li className="col-span-2">
                      <NavigationMenuLink asChild>
                        <div
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-ozos-blue/20 to-ozos-blue/10 p-6 no-underline outline-none focus:shadow-md"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className="mb-2 mt-4 text-lg font-medium text-ozos-navy">
                            Nossos Serviços
                          </div>
                          <p className="text-sm text-gray-600">
                            Soluções completas para seu site ou aplicação web. Design, desenvolvimento e otimização.
                          </p>
                        </div>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/services/portfolio-design"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className="text-sm font-medium text-ozos-navy">Design de Portfólio</div>
                          <p className="line-clamp-2 text-sm text-gray-600">
                            Sites de portfólio personalizados e impactantes.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/services/seo-optimization"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className="text-sm font-medium text-ozos-navy">Otimização SEO</div>
                          <p className="line-clamp-2 text-sm text-gray-600">
                            Melhore sua visibilidade nos buscadores.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/services/blog-creation"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className="text-sm font-medium text-ozos-navy">Criação de Blog</div>
                          <p className="line-clamp-2 text-sm text-gray-600">
                            Amplie seu alcance com blogs e postagens automatizadas.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link href="/#portfolio" className="text-gray-700 transition-colors hover:text-ozos-blue">
            Portfólio
          </Link>
          <Link href="/#testimonials" className="text-gray-700 transition-colors hover:text-ozos-blue">
            Depoimentos
          </Link>
          <Link href="/blog" className="text-gray-700 transition-colors hover:text-ozos-blue">
            Blog
          </Link>
          <Link href="/#contact" className="text-gray-700 transition-colors hover:text-ozos-blue">
            Contato
          </Link>
        </div>

        <div className="hidden md:block">
          <Button asChild className="bg-ozos-blue hover:bg-blue-600 text-white">
            <Link href="/#contact">Solicitar Orçamento</Link>
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
            {/* Serviços Dropdown no Mobile */}
            <div className="space-y-2">
              <div className="flex items-center justify-between cursor-pointer py-2 text-gray-700">
                <span className="font-medium">Serviços</span>
                <ChevronDown size={16} />
              </div>
              <div className="pl-4 space-y-2 border-l-2 border-ozos-blue/20">
                <Link 
                  href="/services/portfolio-design" 
                  className="block py-1 text-gray-700 hover:text-ozos-blue"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Design de Portfólio
                </Link>
                <Link 
                  href="/services/blog-creation" 
                  className="block py-1 text-gray-700 hover:text-ozos-blue"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Criação de Blog
                </Link>
                {/* <Link 
                  href="/services/responsive-design" 
                  className="block py-1 text-gray-700 hover:text-ozos-blue"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Design Responsivo
                </Link> */}
                <Link 
                  href="/services/seo-optimization" 
                  className="block py-1 text-gray-700 hover:text-ozos-blue"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Otimização SEO
                </Link>
              </div>
            </div>
            
            <Link href="/#portfolio" className="text-gray-700 transition-colors hover:text-ozos-blue" onClick={() => setMobileMenuOpen(false)}>
              Portfólio
            </Link>
            <Link href="/#testimonials" className="text-gray-700 transition-colors hover:text-ozos-blue" onClick={() => setMobileMenuOpen(false)}>
              Depoimentos
            </Link>
            <Link href="/blog" className="text-gray-700 transition-colors hover:text-ozos-blue" onClick={() => setMobileMenuOpen(false)}>
              Blog
            </Link>
            <Link href="/#contact" className="text-gray-700 transition-colors hover:text-ozos-blue" onClick={() => setMobileMenuOpen(false)}>
              Contato
            </Link>
            <Button asChild className="bg-ozos-blue hover:bg-blue-600 text-white" onClick={() => setMobileMenuOpen(false)}>
              <Link href="/#contact">Solicitar Orçamento</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
