import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Tipos e dados simulados (mock) para as peças
type Part = { id: string; name: string; category: string; description: string; price: number; image: string; manufacturer: string; };
type SelectedPart = Part & { qty: number };

const availableParts: Part[] = [
  { id: 'cx-1', category: 'Estrutura (Caixas)', name: 'Quadro Metálico 600x400x200mm', description: 'Com placa de montagem e flange.', price: 350.00, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&q=80', manufacturer: 'Cemig' },
  { id: 'cx-2', category: 'Estrutura (Caixas)', name: 'Quadro Metálico 800x600x250mm', description: 'Ideal para painéis de distribuição maiores.', price: 580.00, image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=150&q=80', manufacturer: 'Cemig' },
  { id: 'dj-1', category: 'Proteção', name: 'Disjuntor Geral Tripolar 63A', description: 'Proteção termomagnética curva C.', price: 120.50, image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=150&q=80', manufacturer: 'Siemens' },
  { id: 'dj-2', category: 'Proteção', name: 'Disjuntor Motor 20-25A', description: 'Proteção específica para motores elétricos.', price: 185.00, image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=150&q=80', manufacturer: 'WEG' },
  { id: 'dps-1', category: 'Proteção', name: 'DPS 40kA 275V', description: 'Dispositivo contra surtos elétricos.', price: 85.00, image: 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=150&q=80', manufacturer: 'Clamper' },
  { id: 'ct-1', category: 'Acionamento & Controle', name: 'Contator de Potência 18A', description: 'Bobina 220VAC com 1NA.', price: 95.90, image: 'https://images.unsplash.com/photo-1580901369227-2c938c037803?w=150&q=80', manufacturer: 'Schneider' },
  { id: 'inv-1', category: 'Acionamento & Controle', name: 'Inversor de Frequência 3CV', description: 'Entrada 220V Trifásico, vetorial.', price: 1450.00, image: 'https://images.unsplash.com/photo-1537498425277-c283d32ef9db?w=150&q=80', manufacturer: 'WEG' },
  { id: 'clp-1', category: 'Acionamento & Controle', name: 'CLP Básico 12 Entradas / 8 Saídas', description: 'Controlador Lógico Programável a relé.', price: 890.00, image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=150&q=80', manufacturer: 'Siemens' },
  { id: 'pp-1', category: 'Painéis Prontos', name: 'QGBT Padrão 400A', description: 'Quadro Geral montado e testado. Inclui disjuntor geral 400A, barramento de cobre e proteção contra surtos (DPS).', price: 12500.00, image: 'https://images.unsplash.com/photo-1580982333068-1934e8371300?w=150&q=80', manufacturer: 'TechB2B' },
  { id: 'pp-2', category: 'Painéis Prontos', name: 'Painel Bomba de Recalque Duplo', description: 'Comando para 2 bombas com revezamento automático, relés térmicos e disjuntores motor.', price: 3450.00, image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=150&q=80', manufacturer: 'TechB2B' },
  { id: 'pp-3', category: 'Painéis Prontos', name: 'Quadro de Automação Básico', description: 'Painel com CLP 12/8 e IHM touchscreen na porta, ideal para pequenas automações e máquinas.', price: 5800.00, image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=150&q=80', manufacturer: 'TechB2B' },
];

export const PanelBuilder: React.FC = () => {
  const location = useLocation();
  // Recupera o estado caso o usuário tenha clicado em "Editar Pedido" na próxima tela
  const initialState = location.state as { selectedParts?: SelectedPart[], cep?: string, shippingCost?: number } | null;

  const [selectedParts, setSelectedParts] = useState<SelectedPart[]>(initialState?.selectedParts || []);
  const [cep, setCep] = useState(initialState?.cep || '');
  const [shippingCost, setShippingCost] = useState(initialState?.shippingCost || 0);
  const [hasCalculatedShipping, setHasCalculatedShipping] = useState((initialState?.shippingCost || 0) > 0);
  const [isCalculating, setIsCalculating] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterManufacturer, setFilterManufacturer] = useState('');
  const [isDraggingOver, setIsDraggingOver] = useState(false);

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

  // Extração de Categorias e Fabricantes para os Filtros
  const categories = Array.from(new Set(availableParts.map(p => p.category)));
  const manufacturers = Array.from(new Set(availableParts.map(p => p.manufacturer)));

  // Filtros aplicados
  const filteredParts = availableParts.filter(part => {
    const matchSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase()) || part.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = filterCategory ? part.category === filterCategory : true;
    const matchMfg = filterManufacturer ? part.manufacturer === filterManufacturer : true;
    return matchSearch && matchCat && matchMfg;
  });

  const groupedParts = filteredParts.reduce((acc, part) => {
    if (!acc[part.category]) acc[part.category] = [];
    acc[part.category].push(part);
    return acc;
  }, {} as Record<string, Part[]>);

  const structures = selectedParts.filter(p => p.category === 'Estrutura (Caixas)' || p.category === 'Painéis Prontos');
  const components = selectedParts.filter(p => p.category !== 'Estrutura (Caixas)' && p.category !== 'Painéis Prontos');
  const hasEnclosure = structures.length > 0; // Validação Obrigatória

  // Simulação de cálculo de frete fake
  const handleCalculateShipping = () => {
    if (cep.length < 8) return;
    setIsCalculating(true);
    
    setTimeout(() => {
      const fakeCost = Math.floor(Math.random() * (150 - 45 + 1)) + 45; // Valor aleatório entre R$ 45 e R$ 150
      setShippingCost(fakeCost);
      setHasCalculatedShipping(true);
      setIsCalculating(false);
    }, 800); // Pequeno atraso para dar a sensação de busca na API
  };

  // Drag and Drop (Arrastar e Soltar) Handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, part: Part) => {
    e.dataTransfer.setData('text/plain', part.id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necessário para permitir o drop
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const partId = e.dataTransfer.getData('text/plain');
    const part = availableParts.find(p => p.id === partId);
    if (part) addPart(part);
  };

  const partsTotal = selectedParts.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const totalValue = partsTotal + shippingCost;
  const totalItemsCount = selectedParts.reduce((acc, p) => acc + p.qty, 0);

  // Limpar todo o painel
  const handleClearPanel = () => {
    if (window.confirm('Tem certeza que deseja remover todos os itens e recomeçar o painel?')) {
      setSelectedParts([]);
      setCep('');
      setShippingCost(0);
      setHasCalculatedShipping(false);
    }
  };

  return (
    <section className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabeçalho */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Monte seu <span className="text-blue-600">Painel Elétrico</span> ou Escolha um Pronto
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl">
            Selecione as peças e componentes desejados para o seu projeto, ou adicione um de nossos painéis pré-montados. Não se preocupe se esquecer de algo, nossa equipe técnica revisará os requisitos com você.
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
          
          {/* Coluna 1: Filtros e Catálogo (Lado Esquerdo) */}
          <div className="w-full xl:w-[350px] shrink-0 space-y-6">
            
            {/* Filtros */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-white/60 p-5">
              <h3 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-wider">Filtros de Catálogo</h3>
              <div className="space-y-3">
                <div className="relative">
                  <svg className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  <input 
                    type="text" placeholder="Pesquisar componente..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <select 
                    value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full px-2 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="">Todas as Categorias</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                  <select 
                    value={filterManufacturer} onChange={(e) => setFilterManufacturer(e.target.value)}
                    className="w-full px-2 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="">Todos os Fabricantes</option>
                    {manufacturers.map(mfg => <option key={mfg} value={mfg}>{mfg}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Lista Rolável */}
            <div className="space-y-4 overflow-y-auto max-h-[800px] pr-2 custom-scrollbar pb-10">
              {Object.entries(groupedParts).map(([category, parts]) => (
                <div key={category} className="bg-white/80 backdrop-blur-md rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="bg-slate-100/50 px-4 py-3 border-b border-slate-200">
                    <h4 className="font-bold text-slate-700 text-sm flex justify-between items-center">
                      {category} <span className="text-slate-500 bg-white px-2 py-0.5 rounded-full text-xs font-bold shadow-sm">{parts.length}</span>
                    </h4>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {parts.map((part) => (
                      <div 
                        key={part.id} 
                        draggable
                        onDragStart={(e) => handleDragStart(e, part)}
                        className="p-4 flex flex-col gap-3 hover:bg-slate-50/80 transition-colors group cursor-grab active:cursor-grabbing"
                      >
                        <div className="flex gap-3">
                          <img src={part.image} alt={part.name} draggable={false} className="w-14 h-14 object-cover rounded-lg border border-slate-200 shadow-sm shrink-0 bg-white" />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-slate-900 text-sm leading-tight mb-1 truncate" title={part.name}>{part.name}</h3>
                            <span className="inline-block px-1.5 py-0.5 bg-slate-100 border border-slate-200 text-slate-500 text-[10px] rounded uppercase font-bold tracking-wider mb-1">{part.manufacturer}</span>
                            <p className="text-blue-600 font-bold text-sm">R$ {part.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => addPart(part)}
                          className="w-full py-2 bg-slate-50 hover:bg-blue-500 border border-slate-200 hover:border-transparent text-slate-700 hover:text-white font-semibold rounded-lg transition-colors text-sm shadow-sm opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                        >
                          + Adicionar ao Painel
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {Object.keys(groupedParts).length === 0 && (
                <div className="text-center py-10 text-slate-500 bg-white/80 rounded-xl border border-slate-200">
                  <svg className="w-10 h-10 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Nenhum componente encontrado.
                </div>
              )}
            </div>
          </div>

          {/* Coluna 2: Montador Visual 2D (Lado Central) */}
          <div className="flex-1 min-w-0">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-white/60 p-6 h-full min-h-[600px] flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Montagem Visual 2D</h2>
                  <p className="text-sm text-slate-500 mt-1">Visualize os componentes encaixados no seu quadro.</p>
                </div>
                <div className="flex flex-col items-end sm:flex-row sm:items-center gap-3">
                  {selectedParts.length > 0 && (
                    <button 
                      onClick={handleClearPanel}
                      className="text-xs flex items-center gap-1.5 text-slate-600 hover:text-red-600 transition-colors font-bold bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm hover:border-red-200 hover:bg-red-50"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      Limpar Painel
                    </button>
                  )}
                  <span className="hidden sm:inline-block text-xs bg-blue-100 text-blue-700 font-bold px-3 py-1.5 rounded-lg border border-blue-200 shadow-sm">
                    {components.length} Peças Internas
                  </span>
                </div>
              </div>

              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex-1 rounded-xl border-2 border-dashed p-4 md:p-8 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 ${isDraggingOver ? 'bg-blue-50/50 border-blue-500 shadow-inner scale-[0.99]' : 'bg-slate-50 border-slate-300'}`}
              >
                {!hasEnclosure ? (
                  <div className="text-center z-10 p-6 pointer-events-none">
                    <div className="w-20 h-20 bg-slate-100 border-2 border-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
                    </div>
                    <p className="text-slate-700 font-bold text-lg mb-2">Inicie a montagem pela Estrutura</p>
                    <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
                      Adicione uma Estrutura (Caixa) clicando no botão ou <strong className="text-blue-600">arrastando</strong> um item do catálogo para esta área!
                    </p>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center gap-6 overflow-y-auto pr-2 custom-scrollbar">
                    {structures.map((structure) => (
                      Array.from({ length: structure.qty }).map((_, sIdx) => (
                        <div key={`${structure.id}-${sIdx}`} className="relative w-full max-w-2xl min-h-[400px] border-[12px] border-slate-700/90 bg-slate-200 rounded-xl p-4 sm:p-6 shadow-2xl flex flex-wrap content-start gap-3 sm:gap-4 transition-all">
                          
                          {/* Label e Controle da Caixa */}
                          <div className="absolute top-0 right-0 bg-slate-700/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-bl-lg z-10 flex items-center gap-3 shadow-sm">
                            {structure.name}
                            <button onClick={() => removePart(structure.id)} className="text-slate-300 hover:text-red-400 transition-colors" title="Remover Estrutura">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12"/></svg>
                            </button>
                          </div>
                          
                          {/* Renderização das peças (Apenas na primeira caixa para simplificar o visual) */}
                          {sIdx === 0 && structure.id === structures[0].id && components.map((item) => (
                            Array.from({ length: item.qty }).map((_, i) => (
                              <div 
                                key={`${item.id}-${i}`} 
                                className="w-16 h-16 sm:w-20 sm:h-20 bg-white border border-slate-300 rounded-lg shadow-sm flex flex-col items-center justify-center p-1.5 group relative transition-transform hover:scale-105 hover:z-10 hover:shadow-lg cursor-pointer"
                                title={item.name}
                              >
                                <img src={item.image} alt={item.name} className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded mix-blend-multiply mb-1" />
                                <span className="text-[8px] sm:text-[9px] leading-[1.1] text-center font-bold text-slate-700 w-full line-clamp-2">{item.name}</span>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); removePart(item.id); }}
                                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                              </div>
                            ))
                          ))}
                          {sIdx === 0 && structure.id === structures[0].id && components.length === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <span className="bg-slate-300/50 text-slate-600 px-4 py-2 rounded-lg font-semibold text-sm">Estrutura Vazia</span>
                            </div>
                          )}
                        </div>
                      ))
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Coluna 3: Resumo / Carrinho (Lado Direito Fixo) */}
          <div className="w-full xl:w-96 shrink-0">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl shadow-slate-200/50 border border-white/60 p-6 sticky top-28">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center justify-between">
                Resumo do Projeto
                <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
                  {totalItemsCount} itens
                </span>
              </h2>

              {selectedParts.length === 0 ? (
                <div className="text-center py-8 text-slate-500 border-2 border-dashed border-slate-200 rounded-xl">
                  <p>Nenhuma peça selecionada ainda.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {selectedParts.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md border border-slate-200 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">{item.name}</p>
                        <p className="text-xs text-blue-600 font-bold mt-0.5">R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
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

              {/* Calculadora de Frete (Simulada) */}
              {selectedParts.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Simular Frete Estimado</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={cep}
                      onChange={(e) => {
                        setCep(e.target.value.replace(/\D/g, '').slice(0, 8));
                        setHasCalculatedShipping(false);
                        setShippingCost(0);
                      }}
                      placeholder="CEP (só números)"
                      className="flex-1 px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm shadow-sm"
                    />
                    <button
                      onClick={handleCalculateShipping}
                      disabled={cep.length !== 8 || isCalculating}
                      className="px-5 py-2 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-sm"
                    >
                      {isCalculating ? 'Calculando...' : 'OK'}
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="flex items-center justify-between mb-4 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                  <div className="flex flex-col w-full">
                    {hasCalculatedShipping ? (
                      <>
                        <div className="flex justify-between items-center text-sm mb-1">
                          <span className="text-slate-600">Subtotal Peças:</span>
                          <span className="font-semibold text-slate-800">R$ {partsTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm mb-2">
                          <span className="text-slate-600">Frete Estimado:</span>
                          <span className="font-semibold text-slate-800">R$ {shippingCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-blue-200/50 mt-1">
                          <span className="text-slate-800 font-bold">Total Geral:</span>
                          <span className="text-xl font-extrabold text-blue-700">
                            R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-2">
                        <span className="text-slate-600 text-sm font-medium">Informe o CEP para visualizar o total estimado.</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Validações para Avançar */}
                {selectedParts.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {!hasEnclosure && (
                      <div className="p-3 bg-orange-50 border border-orange-200 text-orange-800 text-xs rounded-lg flex items-start gap-2 font-medium">
                        <svg className="w-4 h-4 shrink-0 mt-0.5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                        Adicione pelo menos uma Estrutura ou Painel Pronto para avançar.
                      </div>
                    )}
                    {!hasCalculatedShipping && (
                      <div className="p-3 bg-blue-50 border border-blue-200 text-blue-800 text-xs rounded-lg flex items-start gap-2 font-medium">
                        <svg className="w-4 h-4 shrink-0 mt-0.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Obrigatório calcular o frete para visualizar o total e avançar.
                      </div>
                    )}
                  </div>
                )}

                <p className="text-sm text-slate-500 mb-4">
                  Ao avançar, anexaremos esta lista de peças à sua solicitação de cotação para nossa engenharia.
                </p>
                <Link 
                  to={hasEnclosure && hasCalculatedShipping ? "/cotar-painel" : "#"} 
                  state={{ selectedParts, totalValue, cep, shippingCost }}
                  className={`w-full flex items-center justify-center py-3.5 px-4 rounded-xl font-bold text-white transition-all shadow-lg transform hover:-translate-y-0.5 ${
                    selectedParts.length > 0 && hasEnclosure && hasCalculatedShipping
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