
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink } from 'lucide-react';

const portfolioItems = [
  {
    title: "Photography Portfolio",
    category: "Creative",
    image: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Architecture Studio",
    category: "Business",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Personal Blog",
    category: "Personal",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Digital Agency",
    category: "Business",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Artist Portfolio",
    category: "Creative",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  },
  {
    title: "Tech Startup",
    category: "Business",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
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
          <h2 className="reveal section-heading">Our Portfolio</h2>
          <p className="reveal section-subheading max-w-3xl mx-auto">
            Explore our collection of beautifully designed portfolio websites for various industries.
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
                  <Button className="bg-white text-ozos-blue hover:bg-white/90">
                    View Project <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
              <div className="p-6 bg-white">
                <span className="text-sm font-medium text-ozos-blue">{item.category}</span>
                <h3 className="mt-1 text-xl font-semibold">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button className="bg-ozos-blue hover:bg-blue-600 text-white">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioShowcase;
