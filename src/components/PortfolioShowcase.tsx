"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ExternalLink } from 'lucide-react';

const portfolioItems = [
    {
        title: "Bella Beauty",
        category: "Estética",
        image: "/portfolios/bellabeauty.png",
        link: "https://bellabeauty.ozos.com.br",
    },
    {
        title: "Brow Beauty",
        category: "Estética",
        image: "/portfolios/browbeauty.png",
        link: "https://browbeauty.ozos.com.br",
    },
    {
        title: "Doces Delicias",
        category: "Confeitaria",
        image: "/portfolios/docesdelicias.png",
        link: "https://docesdelicias.ozos.com.br",
    },
    {
        title: "Nail Artista",
        category: "Estética",
        image: "/portfolios/nailartista.png",
        link: "https://nailartista.ozos.com.br",
    },
    {
        title: "Pedra Perfeita",
        category: "Alvenaria",
        image: "/portfolios/pedra-perfeita.png",
        link: "https://pedra-perfeita.ozos.com.br",
    },
    {
        title: "Serralheria GJM",
        category: "Negócios",
        image: "/portfolios/serralheria-gjm.png",
        link: "https://serralheria-gjm.ozos.com.br",
    },
];

const PortfolioShowcase = () => {
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
        <section id="portfolio" className="py-20 bg-ozos-gray">
            <div className="container">
                <div className="text-center">
                    <h2 className="reveal section-heading">Nosso Portfólio</h2>
                    <p className="reveal section-subheading max-w-3xl mx-auto">
                        Explore nossa coleção de sites de portfólio projetados para diversos setores.
                    </p>
                </div>

                <div className="grid gap-6 mt-16 md:grid-cols-2 lg:grid-cols-3">
                    {portfolioItems.map((item, index) => (
                        <div
                            key={index}
                            className="reveal overflow-hidden transition-all duration-300 rounded-lg group hover:shadow-xl"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-ozos-blue/80 opacity-0 group-hover:opacity-100">
                                    <Link href={item.link} target="_blank" rel="noopener noreferrer">
                                        <Button className="bg-white text-ozos-blue hover:bg-white/90">
                                            Ver Projeto <ExternalLink className="w-4 h-4 ml-2" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            <div className="p-6 bg-white">
                                <span className="text-sm font-medium text-ozos-blue">{item.category}</span>
                                <h3 className="mt-1 text-xl font-semibold">{item.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* <div className="mt-16 text-center">
          <Button className="bg-ozos-blue hover:bg-blue-600 text-white">
            Ver Todos os Projetos
          </Button>
        </div> */}
            </div>
        </section>
    );
};

export default PortfolioShowcase;
