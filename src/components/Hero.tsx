import React from 'react'

import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-transparent min-h-[calc(100vh-80px)] flex flex-col justify-center py-20 overflow-hidden">
      {/* Efeitos visuais de fundo (Glows) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none -z-10">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] opacity-60 mix-blend-multiply"></div>
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-orange-500/15 rounded-full blur-[100px] opacity-60 mix-blend-multiply"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center w-full relative z-10">
        
        {/* Badge superior com Glassmorphism para dar um toque moderno */}
        <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-md text-slate-800 font-bold text-sm mb-8 border border-white/60 shadow-sm shadow-slate-200/50 hover:shadow-md hover:bg-white/90 transition-all cursor-default">
          <span className="flex w-2 h-2 rounded-full bg-orange-500 mr-2 animate-pulse"></span>
          Especialistas em Infraestrutura
        </div>

        {/* Título Principal */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 max-w-5xl leading-[1.1]">
          Soluções completas em <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500">Painéis Elétricos</span> e <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-500">Climatização</span>
        </h1>

        {/* Subtítulo */}
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl leading-relaxed">
          Cote projetos, montagens, documentações técnicas e instalação de ar-condicionado em um só lugar. Rapidez, segurança e conformidade para o seu negócio.
        </p>

        {/* Botões de Ação (CTAs) */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16">
          <Link to="/montar-painel" className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-xl shadow-orange-500/25 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
            Cotar Painel Elétrico
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </Link>
          
          <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-700 font-bold rounded-xl border border-white/60 transition-all duration-300 shadow-lg shadow-slate-200/30 hover:shadow-xl hover:border-blue-300 transform hover:-translate-y-1">
            Cotar Ar-Condicionado
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

        {/* Elemento Gráfico / Imagem do Hero */}
        <div className="relative w-full max-w-5xl mx-auto mt-8 group perspective-1000">
          
          {/* Efeito Glow de Fundo da Imagem */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-orange-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
          
          <div className="relative rounded-3xl bg-white/60 backdrop-blur-md border border-white/60 p-2 shadow-2xl overflow-hidden transform transition-transform duration-700 hover:scale-[1.01]">
            <img 
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop" 
              alt="Montagem de Painéis Elétricos" 
              className="rounded-2xl object-cover w-full h-[350px] md:h-[500px] shadow-inner grayscale-[15%] group-hover:grayscale-0 transition-all duration-700"
            />
            {/* Overlay Gradiente na imagem para deixar mais elegante */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent rounded-2xl m-2 pointer-events-none"></div>
          </div>

          {/* Elemento Flutuante 1 (Estatística) */}
          <div className="absolute -left-6 md:-left-12 top-10 md:top-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl shadow-slate-200/50 border border-white/60 hidden sm:flex items-center gap-4 animate-[bounce_4s_infinite] pointer-events-none z-20">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <div className="text-left">
              <p className="font-extrabold text-slate-900 text-lg">+500 Projetos</p>
              {/* Avatares de prova social */}
              <div className="flex -space-x-2 mt-1">
                <img className="w-6 h-6 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=1" alt="Avatar 1" />
                <img className="w-6 h-6 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=2" alt="Avatar 2" />
                <img className="w-6 h-6 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=3" alt="Avatar 3" />
                <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">+</div>
              </div>
            </div>
          </div>

          {/* Elemento Flutuante 2 (Certificação) */}
          <div className="absolute -right-4 md:-right-8 bottom-10 md:bottom-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl shadow-slate-200/50 border border-white/60 hidden sm:flex items-center gap-4 animate-[bounce_5s_infinite_reverse] pointer-events-none z-20">
             <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <div className="text-left">
              <p className="font-extrabold text-slate-900 text-lg">NR-10 & NBR</p>
              <p className="text-sm text-slate-500 font-medium">100% de Conformidade</p>
            </div>
          </div>

        </div>

        {/* Indicadores de Confiança Redesenhados (Pílulas Glassmorphism) */}
        <div className="mt-24 pt-10 border-t border-slate-200/60 w-full flex flex-col items-center">
          <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-8">
            Nossos Diferenciais Técnicos
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md border border-white/60 rounded-2xl px-6 py-3 shadow-sm hover:-translate-y-1 transition-transform cursor-default">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="text-base font-bold text-slate-700">Projetos Customizados</span>
            </div>
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md border border-white/60 rounded-2xl px-6 py-3 shadow-sm hover:-translate-y-1 transition-transform cursor-default">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="text-base font-bold text-slate-700">Laudos Técnicos</span>
            </div>
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md border border-white/60 rounded-2xl px-6 py-3 shadow-sm hover:-translate-y-1 transition-transform cursor-default">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="text-base font-bold text-slate-700">Garantia e ART</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};