
import React from 'react';
import { Search, TrendingUp, BarChart2, Globe } from 'lucide-react';
import ServiceLayout from '@/components/ServiceLayout';

const SeoOptimization = () => {
  return (
    <ServiceLayout
      title="Otimização SEO"
      subtitle="Aumente sua visibilidade online e atraia mais visitantes"
      description="Otimizamos seu site para os motores de busca, melhorando seu posicionamento no Google e aumentando o tráfego orgânico qualificado para seu negócio."
      imageSrc="https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      features={[
        {
          title: "SEO On-Page",
          description: "Otimização de títulos, meta descrições, headings, URLs e conteúdo para palavras-chave relevantes."
        },
        {
          title: "SEO Técnico",
          description: "Melhoria da velocidade do site, estrutura de URLs, sitemap XML, schema markup e mobile-friendliness."
        },
        {
          title: "Link Building",
          description: "Estratégias éticas para construção de backlinks de qualidade que aumentam a autoridade do site."
        },
        {
          title: "Otimização de Conteúdo",
          description: "Criação e otimização de conteúdo valioso que atrai visitantes e melhora o posicionamento."
        },
        {
          title: "SEO Local",
          description: "Otimização para buscas locais, incluindo Google Meu Negócio e citações locais."
        },
        {
          title: "Relatórios e Análises",
          description: "Monitoramento de rankings, tráfego e conversões com relatórios detalhados de desempenho."
        }
      ]}
      benefits={[
        "Aumente a visibilidade do seu site nos resultados de busca do Google",
        "Atraia tráfego orgânico qualificado sem custo por clique",
        "Melhore a experiência do usuário com um site mais rápido e bem estruturado",
        "Construa autoridade e credibilidade no seu nicho de mercado",
        "Obtenha resultados duradouros que continuam gerando retorno",
        "Supere a concorrência com estratégias avançadas de SEO"
      ]}
    >
      {/* Processo SEO */}
      <section className="py-16 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-ozos-navy mb-12">
            Nosso Processo de Otimização SEO
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-ozos-blue/10 rounded-full flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-ozos-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Auditoria e Análise</h3>
              <p className="text-gray-600">Análise completa do seu site e identificação de oportunidades de melhoria.</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                <li>• Análise técnica do site</li>
                <li>• Pesquisa de palavras-chave</li>
                <li>• Análise de concorrentes</li>
                <li>• Identificação de problemas</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-ozos-blue/10 rounded-full flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-ozos-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Otimização</h3>
              <p className="text-gray-600">Implementação de melhorias técnicas e de conteúdo para maximizar resultados.</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                <li>• Otimização técnica</li>
                <li>• Otimização de conteúdo</li>
                <li>• Estruturação de URLs</li>
                <li>• Melhorias de velocidade</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-ozos-blue/10 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-ozos-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Construção de Autoridade</h3>
              <p className="text-gray-600">Estratégias para aumentar a autoridade e relevância do seu site.</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                <li>• Link building ético</li>
                <li>• Otimização de redes sociais</li>
                <li>• Criação de conteúdo valioso</li>
                <li>• Marketing de conteúdo</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-ozos-blue/10 rounded-full flex items-center justify-center mb-4">
                <BarChart2 className="w-6 h-6 text-ozos-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">4. Análise e Ajustes</h3>
              <p className="text-gray-600">Monitoramento contínuo e refinamento da estratégia para maximizar resultados.</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                <li>• Monitoramento de rankings</li>
                <li>• Análise de tráfego</li>
                <li>• Rastreamento de conversões</li>
                <li>• Ajustes estratégicos</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Resultados SEO */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-ozos-navy mb-12">
            Resultados que Entregamos
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-bold text-ozos-blue mb-2">200%</div>
              <p className="text-gray-700">Aumento médio no tráfego orgânico para nossos clientes em 6 meses</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-bold text-ozos-blue mb-2">TOP 10</div>
              <p className="text-gray-700">Posicionamento para palavras-chave estratégicas em 3-4 meses</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-bold text-ozos-blue mb-2">50%</div>
              <p className="text-gray-700">Redução média no custo de aquisição de cliente após otimização SEO</p>
            </div>
          </div>
        </div>
      </section>
    </ServiceLayout>
  );
};

export default SeoOptimization;
