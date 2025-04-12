
import React, { useEffect, useState } from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    content: "Ozos transformed my online presence with a stunning portfolio website. The attention to detail and technological innovation truly sets them apart.",
    author: "Sarah Johnson",
    position: "Photographer",
  },
  {
    content: "Working with Ozos was a breeze. They understood exactly what our architecture firm needed and delivered a portfolio that perfectly showcases our work.",
    author: "Michael Chen",
    position: "Architect",
  },
  {
    content: "As a freelance designer, my portfolio is everything. Ozos created a website that not only looks amazing but has helped me land new clients consistently.",
    author: "Julia Rivera",
    position: "Graphic Designer",
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
          <h2 className="reveal section-heading text-white">What Our Clients Say</h2>
          <p className="reveal section-subheading max-w-3xl mx-auto text-blue-100">
            Hear from professionals and businesses who have transformed their online presence with Ozos.
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
