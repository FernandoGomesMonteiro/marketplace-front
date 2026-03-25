import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
              {/* Ícone genérico simulando um painel/raio */}
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-extrabold text-2xl text-slate-900 tracking-tight">
              Tech<span className="text-blue-600">B2B</span>
            </span>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#" className="text-slate-600 hover:text-blue-600 font-semibold transition-colors">Início</a>
            <a href="#" className="text-slate-600 hover:text-blue-600 font-semibold transition-colors">Painéis Elétricos</a>
            <a href="#" className="text-slate-600 hover:text-blue-600 font-semibold transition-colors">Climatização</a>
            <a href="#" className="text-slate-600 hover:text-blue-600 font-semibold transition-colors">Documentação</a>
          </div>

          {/* CTAs (Chamadas para Ação) */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-slate-500 hover:text-slate-900 font-semibold px-3 py-2 transition-colors">
              Entrar
            </button>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg font-bold transition-all shadow-md shadow-orange-500/20 transform hover:-translate-y-0.5">
              Nova Cotação
            </button>
          </div>

          {/* Menu Mobile (Ícone Hamburguer) */}
          <div className="md:hidden flex items-center">
            <button className="text-slate-600 hover:text-slate-900 focus:outline-none">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};