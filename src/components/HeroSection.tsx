
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const HeroSection = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => {
      revealElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="relative pt-32 pb-20 overflow-hidden md:pt-40 md:pb-32 bg-ozos-gray">
      <div className="absolute inset-0 opacity-20 bg-gradient-radial from-blue-500 via-transparent to-transparent"></div>
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="reveal text-4xl font-bold tracking-tight text-ozos-navy sm:text-5xl md:text-6xl">
            Criando Sites <span className="text-ozos-blue">Incríveis</span> de Portfólio
          </h1>
          <p className="reveal mt-6 text-lg text-gray-600 md:text-xl">
            Ajudamos empresas e profissionais a exibir seu trabalho com sites de portfólio modernos, responsivos e tecnologicamente avançados.
          </p>
          <div className="reveal flex flex-col items-center justify-center gap-4 mt-10 sm:flex-row">
            <Link href="/#portfolio">
              <Button className="w-full sm:w-auto bg-ozos-blue hover:bg-blue-600 text-white">
                Ver Nosso Trabalho
              </Button>
            </Link>
            <Link href="/#contact">
              <Button variant="outline" className="w-full sm:w-auto border-ozos-blue text-ozos-blue hover:bg-ozos-blue/10">
                Fale Conosco <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default HeroSection;
