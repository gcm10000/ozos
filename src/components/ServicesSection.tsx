
import React, { useEffect } from 'react';
import { Code, Layout, Smartphone } from 'lucide-react';

const services = [
  {
    icon: <Layout className="w-12 h-12 text-ozos-blue" />,
    title: "Portfolio Design",
    description: "Custom-designed portfolio websites that showcase your work beautifully and effectively.",
  },
  {
    icon: <Code className="w-12 h-12 text-ozos-blue" />,
    title: "Development",
    description: "Clean, optimized code that ensures your website loads quickly and functions flawlessly.",
  },
  {
    icon: <Smartphone className="w-12 h-12 text-ozos-blue" />,
    title: "Responsive Design",
    description: "Websites that look and work perfectly on all devices, from desktop to mobile.",
  },
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
          <h2 className="reveal section-heading">Our Services</h2>
          <p className="reveal section-subheading max-w-3xl mx-auto">
            We offer comprehensive portfolio website services tailored to your specific needs.
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
