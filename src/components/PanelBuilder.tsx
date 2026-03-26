import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Tipos e dados simulados (mock) para as peças
type Part = { id: string; name: string; category: string; description: string };
type SelectedPart = Part & { qty: number };

const availableParts: Part[] = [
  { id: 'cx-1', category: 'Estrutura (Caixas)', name: 'Quadro Metálico 600x400x200mm', description: 'Com placa de montagem e flange.' },
  { id: 'cx-2', category: 'Estrutura (Caixas)', name: 'Quadro Metálico 800x600x250mm', description: 'Ideal para painéis de distribuição maiores.' },
  { id: 'dj-1', category: 'Proteção', name: 'Disjuntor Geral Tripolar 63A', description: 'Proteção termomagnética curva C.' },
  { id: 'dj-2', category: 'Proteção', name: 'Disjuntor Motor 20-25A', description: 'Proteção específica para motores elétricos.' },
  { id: 'dps-1', category: 'Proteção', name: 'DPS 40kA 275V', description: 'Dispositivo contra surtos elétricos.' },
  { id: 'ct-1', category: 'Acionamento & Controle', name: 'Contator de Potência 18A', description: 'Bobina 220VAC com 1NA.' },
  { id: 'inv-1', category: 'Acionamento & Controle', name: 'Inversor de Frequência 3CV', description: 'Entrada 220V Trifásico, vetorial.' },
  { id: 'clp-1', category: 'Acionamento & Controle', name: 'CLP Básico 12 Entradas / 8 Saídas', description: 'Controlador Lógico Programável a relé.' },
];

export const PanelBuilder: React.FC = () => {
  const [selectedParts, setSelectedParts] = useState<SelectedPart[]>([]);

  const addPart = (part: Part) => {
    setSelectedParts((prev) => {
      const existing = prev.find((p) => p.id === part.id);
      if (existing) {
        return prev.map((p) => p.id === part.id ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { ...part, qty: 1 }];
    });
  };

  const removePart = (partId: string) => {
    setSelectedParts((prev) => {
      const existing = prev.find((p) => p.id === partId);
      if (existing && existing.qty > 1) {
        return prev.map((p) => p.id === partId ? { ...p, qty: p.qty - 1 } : p);
      }
      return prev.filter((p) => p.id !== partId);
    });
  };

  // Agrupar peças por categoria para exibir na UI
  const groupedParts = availableParts.reduce((acc, part) => {
    if (!acc[part.category]) acc[part.category] = [];
    acc[part.category].push(part);
    return acc;
  }, {} as Record<string, Part[]>);

  return (
    <section className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabeçalho */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Monte seu <span className="text-blue-600">Painel Elétrico</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl">
            Selecione as peças e componentes desejados para o seu projeto. Não se preocupe se esquecer de algo, nossa equipe técnica revisará os requisitos com você.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Lista de Peças (Lado Esquerdo) */}
          <div className="flex-1 space-y-8">
            {Object.entries(groupedParts).map(([category, parts]) => (
              <div key={category} className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-white/60 overflow-hidden">
                <div className="bg-slate-100/50 px-6 py-4 border-b border-slate-200">
                  <h2 className="text-xl font-bold text-slate-800">{category}</h2>
                </div>
                <div className="divide-y divide-slate-100">
                  {parts.map((part) => (
                    <div key={part.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                      <div>
                        <h3 className="font-semibold text-slate-900 text-lg">{part.name}</h3>
                        <p className="text-slate-500 text-sm mt-1">{part.description}</p>
                      </div>
                      <button 
                        onClick={() => addPart(part)}
                        className="shrink-0 px-4 py-2 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors shadow-sm"
                      >
                        + Adicionar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Resumo / Carrinho (Lado Direito Fixo) */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl shadow-slate-200/50 border border-white/60 p-6 sticky top-28">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center justify-between">
                Resumo do Projeto
                <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
                  {selectedParts.reduce((acc, p) => acc + p.qty, 0)} itens
                </span>
              </h2>

              {selectedParts.length === 0 ? (
                <div className="text-center py-8 text-slate-500 border-2 border-dashed border-slate-200 rounded-xl">
                  <p>Nenhuma peça selecionada ainda.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {selectedParts.map((item) => (
                    <div key={item.id} className="flex items-start justify-between gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-800 line-clamp-2">{item.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.category}</p>
                      </div>
                      
                      {/* Controles de Quantidade */}
                      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-md shrink-0">
                        <button onClick={() => removePart(item.id)} className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-orange-500 hover:bg-slate-50 rounded-l-md transition-colors">-</button>
                        <span className="text-sm font-semibold w-4 text-center">{item.qty}</span>
                        <button onClick={() => addPart(item)} className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:bg-slate-50 rounded-r-md transition-colors">+</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-sm text-slate-500 mb-4">
                  Ao avançar, anexaremos esta lista de peças à sua solicitação de cotação para nossa engenharia.
                </p>
                <Link 
                  to="/cotar-painel" 
                  className={`w-full flex items-center justify-center py-3.5 px-4 rounded-xl font-bold text-white transition-all shadow-lg transform hover:-translate-y-0.5 ${
                    selectedParts.length > 0 
                      ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/30' 
                      : 'bg-slate-300 pointer-events-none'
                  }`}
                >
                  Avançar para Cotação
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};