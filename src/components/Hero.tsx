import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Badge superior opcional para dar um toque moderno */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-semibold text-sm mb-6 border border-blue-100">
          <span className="flex w-2 h-2 rounded-full bg-orange-500 mr-2"></span>
          Especialistas em Infraestrutura
        </div>

        {/* Título Principal */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 max-w-4xl">
          Soluções completas em <span className="text-blue-600">Painéis Elétricos</span> e <span className="text-blue-600">Climatização</span>
        </h1>

        {/* Subtítulo */}
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl">
          Cote projetos, montagens, documentações técnicas e instalação de ar-condicionado em um só lugar. Rapidez, segurança e conformidade para o seu negócio.
        </p>

        {/* Botões de Ação (CTAs) */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow-lg shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-1">
            Cotar Painel Elétrico
          </button>
          
          <button className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-lg border-2 border-slate-200 transition-all duration-300">
            Cotar Ar-Condicionado
          </button>
        </div>

        {/* Indicadores de Confiança (Social Proof) */}
        <div className="mt-16 pt-8 border-t border-slate-100 w-full">
          <p className="text-sm text-slate-400 font-medium uppercase tracking-wider mb-6">
            Serviços com garantia e emissão de ART
          </p>
          <div className="flex justify-center gap-8 md:gap-16 opacity-60 grayscale">
            {/* Aqui você pode colocar ícones ou logos no futuro */}
            <div className="text-xl font-bold text-slate-400">Projetos Customizados</div>
            <div className="text-xl font-bold text-slate-400">Laudos Técnicos</div>
            <div className="text-xl font-bold text-slate-400">Manutenção Preventiva</div>
          </div>
        </div>

      </div>
    </section>
  );
};