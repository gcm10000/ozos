
import ServiceLayout from '@/components/ServiceLayout';
import React from 'react';

const PortfolioDesign = () => {
  return (
    <ServiceLayout
      title="Portfolio Design"
      subtitle="Destaque seu trabalho com um portfolio profissional"
      description="Criamos websites de portfolio personalizados que destacam seu trabalho de forma elegante e eficaz, ajudando você a impressionar clientes e empregadores."
      imageSrc="https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      features={[
        {
          title: "Design Personalizado",
          description: "Criamos um design único que reflete sua identidade visual e destaca seu trabalho de forma impressionante."
        },
        {
          title: "Galeria Interativa",
          description: "Apresente seus projetos em uma galeria interativa que permite aos visitantes navegar e explorar seu trabalho em detalhes."
        },
        {
          title: "Otimização para Conversão",
          description: "Estruturamos seu portfolio para maximizar contatos e oportunidades de negócio."
        },
        {
          title: "Design Centrado no Usuário",
          description: "Interfaces intuitivas que facilitam a visualização e compreensão dos seus projetos."
        },
        {
          title: "Integração com Redes Sociais",
          description: "Conecte seu portfolio com suas redes sociais para ampliar seu alcance profissional."
        },
        {
          title: "Filtros de Categorias",
          description: "Organize seus projetos em categorias para facilitar a navegação dos visitantes."
        }
      ]}
      benefits={[
        "Aumente sua credibilidade profissional com um portfolio de aparência profissional",
        "Destaque-se da concorrência com um design único e personalizado",
        "Impressione clientes em potencial com uma apresentação visual impactante do seu trabalho",
        "Facilite o contato e as conversões com chamadas para ação estratégicas",
        "Exiba seu trabalho de forma organizada e fácil de navegar",
        "Atualizações simples para manter seu portfolio sempre atual"
      ]}
    >
      {/* Seção adicional específica para Portfolio Design */}
      <section className="py-16 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-ozos-navy mb-12">
            Nosso Processo de Design
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-ozos-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Descoberta</h3>
              <p className="text-gray-600">Entendemos seus objetivos, estilo e necessidades específicas.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-ozos-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Conceito</h3>
              <p className="text-gray-600">Criamos conceitos visuais alinhados com sua identidade profissional.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-ozos-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Desenvolvimento</h3>
              <p className="text-gray-600">Transformamos o conceito aprovado em um portfolio funcional.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-ozos-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Lançamento</h3>
              <p className="text-gray-600">Finalizamos e lançamos seu portfolio com treinamento para atualizações.</p>
            </div>
          </div>
        </div>
      </section>
    </ServiceLayout>
  );
};

export default PortfolioDesign;