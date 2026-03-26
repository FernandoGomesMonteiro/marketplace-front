import React, { useState } from 'react';

export const FAQ: React.FC = () => {
  // Estado para controlar qual pergunta está aberta (nulo = nenhuma)
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    // Se clicar na pergunta que já está aberta, ela fecha. Senão, abre a nova.
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Lista de Perguntas e Respostas Simuladas
  const faqs = [
    {
      question: 'Vocês atendem e entregam painéis em todo o Brasil?',
      answer: 'Sim! Nossa engenharia e montagem estão concentradas em São Paulo, mas enviamos nossos painéis elétricos e quadros de automação devidamente embalados e segurados para todo o território nacional através de transportadoras parceiras.',
    },
    {
      question: 'Qual o prazo médio para a entrega de um painel sob medida?',
      answer: 'O prazo varia de acordo com a complexidade do projeto e a disponibilidade dos componentes no mercado. Em média, nossos quadros de distribuição (QGBTs) e de automação levam entre 15 a 30 dias úteis para projeto, montagem e testes em bancada.',
    },
    {
      question: 'Os painéis já vêm com documentação e ART?',
      answer: 'Com certeza. A segurança é nossa prioridade. Todos os nossos painéis acompanham projeto elétrico unifilar (as-built), memorial descritivo, laudo de testes de isolação e a Anotação de Responsabilidade Técnica (ART) assinada por nossos engenheiros.',
    },
    {
      question: 'Posso fornecer os componentes e contratar apenas a mão de obra?',
      answer: 'Sim, oferecemos a modalidade de prestação de serviço de montagem. Neste caso, você envia as peças (ou aproveita as que já possui em estoque) e nós entramos com a estrutura física, cabos, anilhas, engenharia e a mão de obra especializada.',
    },
    {
      question: 'Como funciona o processo de cotação online?',
      answer: 'É muito simples! Você pode usar nossa ferramenta de "Montar Painel" para pré-selecionar os itens desejados ou ir direto ao formulário de cotação para nos enviar seu projeto em PDF/DWG. Nossa equipe fará a análise e enviará a proposta comercial em até 48 horas úteis.',
    },
  ];

  return (
    // Fundo translúcido para continuar mesclando o design glassmorphism
    <section className="py-24 bg-slate-50/40 backdrop-blur-xl border-t border-white/60 relative shadow-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Dúvidas <span className="text-blue-600">Frequentes</span>
          </h2>
          <p className="text-lg text-slate-600">
            Encontre respostas rápidas para as principais dúvidas dos nossos clientes corporativos.
          </p>
        </div>

        {/* Container da Sanfona */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div 
                key={index} 
                className={`bg-white/80 backdrop-blur-sm border rounded-2xl transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md ${
                  isOpen ? 'border-blue-200' : 'border-slate-200'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-5 flex items-center justify-between bg-transparent focus:outline-none text-left"
                >
                  <span className={`font-bold text-lg transition-colors duration-300 ${isOpen ? 'text-blue-700' : 'text-slate-800'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 shrink-0 ml-4 ${isOpen ? 'bg-blue-100 text-blue-600 rotate-180' : 'bg-slate-100 text-slate-500'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Conteúdo Expansível animado com Grid */}
                <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4 mt-2">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};