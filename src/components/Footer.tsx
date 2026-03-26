import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Marca e Descrição */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-3 cursor-pointer">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Tech<span className="text-blue-500">B2B</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Soluções completas em infraestrutura elétrica e climatização para a indústria e comércio. Qualidade, segurança e conformidade normativa.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-white font-semibold mb-4">Soluções</h3>
            <ul className="space-y-3">
              <li><Link to="/montar-painel" className="text-slate-400 hover:text-orange-500 transition-colors text-sm">Painéis Elétricos</Link></li>
              <li><a href="#" className="text-slate-400 hover:text-orange-500 transition-colors text-sm">Climatização Industrial</a></li>
              <li><a href="#" className="text-slate-400 hover:text-orange-500 transition-colors text-sm">Projetos e Laudos</a></li>
              <li><a href="#" className="text-slate-400 hover:text-orange-500 transition-colors text-sm">Manutenção Preventiva</a></li>
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h3 className="text-white font-semibold mb-4">Empresa</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Sobre Nós</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Casos de Sucesso</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Trabalhe Conosco</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Blog Técnico</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-white font-semibold mb-4">Fale Conosco</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <svg className="w-5 h-5 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                contato@techb2b.com.br
              </li>
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <svg className="w-5 h-5 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                (11) 99999-9999
              </li>
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <svg className="w-5 h-5 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                São Paulo, SP - Brasil
              </li>
            </ul>
          </div>

        </div>

        {/* Direitos Autorais */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} TechB2B. Todos os direitos reservados.</p>
          <p className="text-slate-500 text-sm flex gap-4"><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a> <a href="#" className="hover:text-white transition-colors">Termos de Uso</a></p>
        </div>
      </div>
    </footer>
  );
};