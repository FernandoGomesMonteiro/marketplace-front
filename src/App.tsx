import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuotePanel } from './components/QuotePanel';
import { PanelBuilder } from './components/PanelBuilder';
import { Footer } from './components/Footer';
import { Features } from './components/Features';
import { FAQ } from './components/FAQ';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mostra o botão após rolar 400px para baixo
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    // Estrutura principal com textura e iluminação global
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-orange-500 selection:text-white relative flex flex-col">
      
      {/* Elementos de Fundo Fixos (Glassmorphism global) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Grade Tecnológica Suave */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] opacity-30"></div>
        
        {/* Iluminação Difusa (Glows) */}
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[40%] rounded-full bg-blue-400/20 blur-[120px] mix-blend-multiply"></div>
        <div className="absolute top-[30%] -right-[10%] w-[40%] h-[50%] rounded-full bg-orange-400/10 blur-[120px] mix-blend-multiply"></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[60%] h-[40%] rounded-full bg-cyan-400/15 blur-[120px] mix-blend-multiply"></div>
      </div>

      {/* O conteúdo precisa ficar acima (z-10) do fundo fixo */}
      <div className="relative z-10 flex flex-col flex-1">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Features />
                <FAQ />
              </>
            } />
            <Route path="/montar-painel" element={<PanelBuilder />} />
            <Route path="/cotar-painel" element={<QuotePanel />} />
          </Routes>
          <Footer />
          
          {/* Botão Flutuante de Voltar ao Topo */}
          <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-50 p-3 bg-orange-500 text-white rounded-full shadow-xl shadow-orange-500/40 hover:bg-orange-600 hover:-translate-y-1 transition-all duration-300 ${
              showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
            }`}
            aria-label="Voltar ao topo"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App;