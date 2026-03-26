import React, { useEffect, useRef } from 'react';

export const Features: React.FC = () => {
  // Referências para os cards que vamos animar
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Configura o observador de rolagem da página
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Quando o card entra na tela, removemos a opacidade 0 e o deslocamento
            entry.target.classList.remove('opacity-0', 'translate-y-12');
            entry.target.classList.add('opacity-100', 'translate-y-0');
            // Para de observar após animar a primeira vez
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 } // Dispara quando 10% do card estiver visível
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const benefits = [
    {
      title: 'Engenharia Especializada',
      description: 'Nossa equipe projeta soluções sob medida para a sua demanda, otimizando custos e garantindo eficiência energética.',
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Conformidade NR-10',
      description: 'Todos os painéis e projetos seguem rigorosamente as normas técnicas de segurança (NR-10, NBR 5410).',
      icon: (
        <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: 'Componentes de Alta Qualidade',
      description: 'Trabalhamos apenas com peças homologadas e as melhores marcas do mercado para garantir durabilidade.',
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
    {
      title: 'Suporte e Manutenção Rápida',
      description: 'Oferecemos atendimento ágil para manutenções preventivas e corretivas, evitando paradas na sua linha de produção.',
      icon: (
        <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-24 bg-white/40 backdrop-blur-xl relative border-t border-white/60 shadow-sm">
      {/* Divisor superior sutil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Por que escolher a Tech<span className="text-blue-600">B2B</span>?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Garantimos excelência técnica, segurança e eficiência em cada etapa do seu projeto elétrico e de climatização.
          </p>
        </div>

        {/* Grid de Vantagens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              ref={(el) => { cardRefs.current[index] = el; }}
              style={{ transitionDelay: `${index * 150}ms` }}
              className="opacity-0 translate-y-12 transition-all duration-1000 ease-out h-full"
            >
              <div className="h-full bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/60 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 group">
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};