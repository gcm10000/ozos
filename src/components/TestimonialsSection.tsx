import React, { useEffect, useState } from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    content: "A Ozos transformou minha presença online com um site de portfólio deslumbrante. A atenção aos detalhes e a inovação tecnológica realmente os diferenciam.",
    author: "Sarah Johnson",
    position: "Fotógrafa",
  },
  {
    content: "Trabalhar com a Ozos foi super fácil. Eles entenderam exatamente o que nosso escritório de arquitetura precisava e entregaram um portfólio que mostra perfeitamente nosso trabalho.",
    author: "Michael Chen",
    position: "Arquiteto",
  },
  {
    content: "Como designer freelancer, meu portfólio é tudo. A Ozos criou um site que não só ficou incrível, como também me ajudou a conquistar novos clientes com frequência.",
    author: "Julia Rivera",
    position: "Designer Gráfica",
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

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
    <section id="testimonials" className="py-20 text-white bg-ozos-navy">
      <div className="container">
        <div className="text-center">
          <h2 className="reveal section-heading text-white">O Que Nossos Clientes Dizem</h2>
          <p className="reveal section-subheading max-w-3xl mx-auto text-blue-100">
            Veja o que dizem profissionais e empresas que transformaram sua presença online com a Ozos.
          </p>
        </div>

        <div className="mt-16">
          <div className="relative max-w-3xl mx-auto">
            <Quote className="absolute text-blue-400 w-14 h-14 -top-7 -left-7 opacity-20" />
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`transition-opacity duration-500 ${activeIndex === index ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'}`}
              >
                <blockquote className="text-xl text-center md:text-2xl">
                  "{testimonial.content}"
                </blockquote>
                <div className="mt-8 text-center">
                  <p className="font-semibold text-ozos-blue">{testimonial.author}</p>
                  <p className="text-blue-200">{testimonial.position}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${activeIndex === index ? 'bg-ozos-blue w-6' : 'bg-blue-700'}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;