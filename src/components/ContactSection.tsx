import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: ''
  });

  // WhatsApp phone number (without country code plus)
  const whatsappNumber = "5551234567890"; // Replace with your actual phone number

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if required fields are filled
    if (!formData.name || !formData.message) {
      toast({
        title: "Informações ausentes",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    // Format the message for WhatsApp
    const formattedMessage = `
*Envio de Formulário de Contato*
*Nome:* ${formData.name}
*Assunto:* ${formData.subject}
*Mensagem:* ${formData.message}
    `.trim();

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(formattedMessage);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Show success toast
    toast({
      title: "Sucesso!",
      description: "Redirecionando para o WhatsApp...",
    });

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };

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
          <h2 className="reveal section-heading">Fale Conosco</h2>
          <p className="reveal section-subheading max-w-3xl mx-auto">
            Pronto para criar seu site de portfólio perfeito? Entre em contato com nossa equipe hoje mesmo.
          </p>
        </div>

        <div className="grid gap-12 mt-16 md:grid-cols-2">
          <div className="reveal">
            <h3 className="text-2xl font-semibold text-ozos-navy">Entre em Contato</h3>
            <p className="mt-4 text-gray-600">
              Preencha o formulário e nossa equipe entrará em contato com você em até 24 horas.
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
                  <h4 className="text-lg font-medium">Telefone</h4>
                  <p className="mt-1 text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full">
                  <MapPin className="w-6 h-6 text-ozos-blue" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium">Localização</h4>
                  <p className="mt-1 text-gray-600">123 Tech Street, Suite 200<br />San Francisco, CA 94107</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="reveal">
            <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-lg">
              <div className="grid gap-6 md:grid-cols-1">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                    Nome*
                  </label>
                  <Input 
                    id="name" 
                    placeholder="Seu nome" 
                    className="border-gray-300 focus:border-ozos-blue focus:ring-0"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-700">
                  Assunto
                </label>
                <Input 
                  id="subject" 
                  placeholder="Como podemos te ajudar?" 
                  className="border-gray-300 focus:border-ozos-blue focus:ring-0"
                  value={formData.subject}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="mt-6">
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">
                  Mensagem*
                </label>
                <Textarea 
                  id="message" 
                  rows={4} 
                  placeholder="Sua mensagem" 
                  className="border-gray-300 focus:border-ozos-blue focus:ring-0"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="mt-6">
                <Button type="submit" className="w-full bg-ozos-blue hover:bg-blue-600 text-white">
                  Enviar
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
