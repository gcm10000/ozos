import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 text-white bg-ozos-navy">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <a href="/" className="text-2xl font-bold">
              <span className="text-ozos-blue">O</span>zos
            </a>
            <p className="mt-4 text-blue-200">
              Criando sites de portfólio incríveis para profissionais e empresas.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white">Serviços</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="/services/portfolio-design" className="text-blue-200 transition-colors hover:text-ozos-blue">Design de Portfólio</a></li>
              <li><a href="/services/seo-optimization" className="text-blue-200 transition-colors hover:text-ozos-blue">Otimização de SEO</a></li>
              <li><a href="/services/blog-creation" className="text-blue-200 transition-colors hover:text-ozos-blue">Criação de Blog</a></li>
            </ul>
          </div>
          
          {/* <div>
            <h3 className="text-lg font-semibold text-white">Sobre</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-blue-200 transition-colors hover:text-ozos-blue">Nosso Time</a></li>
              <li><a href="#" className="text-blue-200 transition-colors hover:text-ozos-blue">Empresa</a></li>
              <li><a href="#" className="text-blue-200 transition-colors hover:text-ozos-blue">Carreiras</a></li>
              <li><a href="#" className="text-blue-200 transition-colors hover:text-ozos-blue">Blog</a></li>
            </ul>
          </div> */}
          
          <div>
            <h3 className="text-lg font-semibold text-white">Conecte-se</h3>
            <div className="flex mt-4 space-x-3">
              <a href="#" className="p-2 text-blue-200 transition-colors rounded-full hover:text-ozos-blue hover:bg-white/10">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 text-blue-200 transition-colors rounded-full hover:text-ozos-blue hover:bg-white/10">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 text-blue-200 transition-colors rounded-full hover:text-ozos-blue hover:bg-white/10">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 text-blue-200 transition-colors rounded-full hover:text-ozos-blue hover:bg-white/10">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <p className="mt-4 text-blue-200">
              Inscreva-se na nossa newsletter para receber as últimas novidades.
            </p>
          </div>
        </div>
        
        <div className="pt-8 mt-12 text-center border-t border-blue-800">
          <p className="text-blue-300">
            &copy; {new Date().getFullYear()} Ozos. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
