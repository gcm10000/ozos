
import React from 'react';
import ServiceLayout from '@/components/ServiceLayout';
import { Newspaper, Zap, Calendar, Clock, BarChart, MessageSquare } from 'lucide-react';

const BlogCreation = () => {
  return (
    <ServiceLayout
      title="Criação de Blog e Automação de Postagens"
      subtitle="Amplie seu alcance com blogs profissionais e postagens automatizadas"
      description="Desenvolvemos sistemas de blog personalizados e soluções de automação de conteúdo que permitem que você mantenha sua presença online de forma eficiente e consistente."
      imageSrc="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      features={[
        {
          title: "Plataforma de Blog Personalizada",
          description: "Criamos blogs personalizados que se integram perfeitamente ao seu site e refletem a identidade da sua marca."
        },
        {
          title: "Automação de Publicações",
          description: "Ferramentas que permitem agendar e publicar conteúdo automaticamente, mantendo seu blog sempre atualizado."
        },
        {
          title: "SEO para Conteúdo",
          description: "Otimização de cada postagem para mecanismos de busca, aumentando a visibilidade do seu conteúdo."
        },
        {
          title: "Integração com Redes Sociais",
          description: "Publicação automática nas suas redes sociais sempre que um novo conteúdo for lançado no blog."
        },
        {
          title: "Análise de Desempenho",
          description: "Relatórios detalhados sobre o desempenho do seu blog, incluindo métricas de engajamento e conversão."
        },
        {
          title: "Sistema de Comentários",
          description: "Funcionalidades para interação com os leitores, aumentando o engajamento e construindo uma comunidade."
        }
      ]}
      benefits={[
        "Economize tempo com a automação de publicações e compartilhamentos",
        "Mantenha uma presença online consistente com publicações regulares",
        "Aumente o tráfego orgânico do seu site com conteúdo otimizado para SEO",
        "Construa autoridade no seu nicho com um blog profissional",
        "Gere leads e conversões através de conteúdo estratégico",
        "Analise o desempenho do seu conteúdo para otimizar sua estratégia"
      ]}
    >
      {/* Seção de automação de blog */}
      <section className="py-16 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-ozos-navy mb-12">
            Como Funciona Nossa Automação
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="mb-6 flex justify-center">
                <Calendar className="w-16 h-16 text-ozos-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Agendamento Inteligente</h3>
              <p className="text-gray-600">
                Programe postagens com semanas ou meses de antecedência. Nossa plataforma publicará automaticamente nos dias e horários ideais para maximizar o engajamento.
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="mb-6 flex justify-center">
                <Zap className="w-16 h-16 text-ozos-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Distribuição Automática</h3>
              <p className="text-gray-600">
                Quando uma nova postagem é publicada, nosso sistema a compartilha automaticamente em suas redes sociais, boletins informativos e outros canais.
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="mb-6 flex justify-center">
                <BarChart className="w-16 h-16 text-ozos-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Análise e Otimização</h3>
              <p className="text-gray-600">
                Acompanhe o desempenho de cada postagem e obtenha insights valiosos. Use dados em tempo real para ajustar sua estratégia de conteúdo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de casos de uso */}
      <section className="py-16 bg-ozos-gray">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-ozos-navy mb-12">
            Casos de Uso
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start mb-4">
                <Newspaper className="w-8 h-8 text-ozos-blue mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Blog Corporativo</h3>
                  <p className="text-gray-600">
                    Mantenha seu blog corporativo ativo com publicações regulares que destacam a expertise da sua empresa e geram leads qualificados, sem ocupar o tempo da sua equipe.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start mb-4">
                <MessageSquare className="w-8 h-8 text-ozos-blue mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Marketing de Conteúdo</h3>
                  <p className="text-gray-600">
                    Implemente uma estratégia de marketing de conteúdo eficaz com publicações consistentes e distribuição automática em diversos canais digitais.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start mb-4">
                <Clock className="w-8 h-8 text-ozos-blue mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Agendamento Sazonal</h3>
                  <p className="text-gray-600">
                    Prepare conteúdo para datas e temporadas importantes com antecedência e deixe nosso sistema publicar no momento ideal, mesmo quando você estiver ocupado.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start mb-4">
                <BarChart className="w-8 h-8 text-ozos-blue mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Crescimento Orgânico</h3>
                  <p className="text-gray-600">
                    Aumente sua presença online de forma orgânica com conteúdo otimizado para SEO e publicado com regularidade, melhorando seu posicionamento nos resultados de busca.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ServiceLayout>
  );
};

export default BlogCreation;