
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from 'lucide-react';

const ContactSection = () => {
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
    <section id="contact" className="py-20 bg-white">
      <div className="container">
        <div className="text-center">
          <h2 className="reveal section-heading">Contact Us</h2>
          <p className="reveal section-subheading max-w-3xl mx-auto">
            Ready to create your perfect portfolio website? Get in touch with our team today.
          </p>
        </div>

        <div className="grid gap-12 mt-16 md:grid-cols-2">
          <div className="reveal">
            <h3 className="text-2xl font-semibold text-ozos-navy">Get in Touch</h3>
            <p className="mt-4 text-gray-600">
              Fill out the form and our team will get back to you within 24 hours.
            </p>
            
            <div className="mt-8 space-y-6">
              <div className="flex items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full">
                  <Mail className="w-6 h-6 text-ozos-blue" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium">Email</h4>
                  <p className="mt-1 text-gray-600">info@ozos.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full">
                  <Phone className="w-6 h-6 text-ozos-blue" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium">Phone</h4>
                  <p className="mt-1 text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full">
                  <MapPin className="w-6 h-6 text-ozos-blue" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium">Location</h4>
                  <p className="mt-1 text-gray-600">123 Tech Street, Suite 200<br />San Francisco, CA 94107</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="reveal">
            <form className="p-8 bg-white rounded-lg shadow-lg">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <Input 
                    id="name" 
                    placeholder="Your name" 
                    className="border-gray-300 focus:border-ozos-blue focus:ring-0"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Your email" 
                    className="border-gray-300 focus:border-ozos-blue focus:ring-0"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-700">
                  Subject
                </label>
                <Input 
                  id="subject" 
                  placeholder="How can we help you?" 
                  className="border-gray-300 focus:border-ozos-blue focus:ring-0"
                />
              </div>
              
              <div className="mt-6">
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">
                  Message
                </label>
                <Textarea 
                  id="message" 
                  rows={4} 
                  placeholder="Your message" 
                  className="border-gray-300 focus:border-ozos-blue focus:ring-0"
                />
              </div>
              
              <div className="mt-6">
                <Button className="w-full bg-ozos-blue hover:bg-blue-600 text-white">
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
