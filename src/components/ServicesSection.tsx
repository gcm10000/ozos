"use client"

import React, { useEffect } from 'react';
import { Code, Layout, Newspaper, Search, Smartphone } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

const services = [
  {
    icon: <Layout className="w-12 h-12 text-ozos-blue" />,
    title: "Design de Portfólio",
    description: "Sites de portfólio personalizados que exibem seu trabalho de forma bonita e eficaz.",
    link: "/services/portfolio-design"
  },
  {
    icon: <Search className="w-12 h-12 text-ozos-blue" />,
    title: "Otimização de SEO",
    description: "Melhore sua visibilidade nos mecanismos de busca e atraia visitantes mais qualificados para seu site.",
    link: "/services/seo-optimization"
  },
  {
    icon: <Newspaper className="w-12 h-12 text-ozos-blue" />,
    title: "Criação de Blog",
    description: "Plataformas de blog personalizadas com publicações automáticas para manter uma presença online consistente.",
    link: "/services/blog-creation"
  }
];


const ServicesSection = () => {
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
    <section id="services" className="py-20 bg-white">
      <div className="container">
        <div className="text-center">
          <h2 className="reveal section-heading">Nossos Serviços</h2>
          <p className="reveal section-subheading max-w-3xl mx-auto">
            Oferecemos serviços completos de websites de portfólio adaptados às suas necessidades específicas.
          </p>
        </div>

        <div className="grid gap-8 mt-16 md:grid-cols-3">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="reveal p-8 transition-all duration-300 border rounded-lg hover:shadow-lg hover:border-ozos-blue"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-3 mb-5 rounded-full w-fit bg-ozos-blue/10">
                {service.icon}
              </div>
              <h3 className="mb-3 text-xl font-semibold">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
              <Button asChild variant="outline" className="mt-auto w-full">
                <Link href={service.link}>Saiba mais</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
