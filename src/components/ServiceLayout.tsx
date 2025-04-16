"use client"

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ServiceLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  features: {
    title: string;
    description: string;
  }[];
  benefits: string[];
  children?: React.ReactNode;
}

const ServiceLayout: React.FC<ServiceLayoutProps> = ({
  title,
  subtitle,
  description,
  imageSrc,
  features,
  benefits,
  children
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-white to-blue-50">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h1 className="text-4xl md:text-5xl font-bold text-ozos-navy mb-4">{title}</h1>
                <p className="text-xl text-ozos-blue mb-6">{subtitle}</p>
                <p className="text-gray-600 mb-8">{description}</p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild className="bg-ozos-blue hover:bg-blue-600">
                    <Link href="/#contact">Solicitar Orçamento</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/#features">Saiba Mais</Link>
                  </Button>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <img 
                  src={imageSrc} 
                  alt={title} 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-white">
          <div className="container max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-ozos-navy mb-12">
              Recursos e Benefícios
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-ozos-navy mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-ozos-navy mb-12">
              Por que escolher este serviço?
            </h2>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-ozos-blue rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p className="ml-4 text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Opcional: Conteúdo adicional específico para cada serviço */}
        {children}

        {/* CTA Section */}
        <section id="contact" className="py-16 bg-ozos-navy text-white">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Pronto para começar seu projeto?</h2>
            <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
              Entre em contato conosco hoje mesmo para discutir suas necessidades e obter um orçamento personalizado.
            </p>
            <Button asChild size="lg" className="bg-white text-ozos-navy hover:bg-gray-100">
              <Link href="/#contact">
                Fale Conosco <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceLayout;