import React, { useState } from 'react';

// Tipos para simular os dados do banco
type SelectedPart = { id: string; name: string; price: number; qty: number; category: string; image: string; };

type Quote = {
  id: string;
  date: string;
  status: 'Nova' | 'Em Análise' | 'Respondida';
  customer: {
    name: string;
    company: string;
    email: string;
    phone: string;
  };
  project: {
    applicationType: string;
    description: string;
  };
  parts: SelectedPart[];
  totalValue: number;
};

// Dados simulados de clientes que já pediram cotação
const mockQuotes: Quote[] = [
  {
    id: 'COT-2023-001',
    date: '24/10/2023 - 14:30',
    status: 'Nova',
    customer: {
      name: 'Carlos Oliveira',
      company: 'Indústria Têxtil Fios S/A',
      email: 'carlos.compras@fios-sa.com.br',
      phone: '(11) 98765-4321'
    },
    project: {
      applicationType: 'qgbt',
      description: 'Precisamos de um QGBT para ampliação do galpão principal. Potência instalada de aprox 300kW, entrada trifásica 380V.'
    },
    parts: [
      { id: 'cx-2', name: 'Quadro Metálico 800x600x250mm', price: 580.00, qty: 1, category: 'Estrutura (Caixas)', image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=150&q=80' },
      { id: 'dj-1', name: 'Disjuntor Geral Tripolar 63A', price: 120.50, qty: 3, category: 'Proteção', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=150&q=80' }
    ],
    totalValue: 941.50
  },
  {
    id: 'COT-2023-002',
    date: '23/10/2023 - 09:15',
    status: 'Em Análise',
    customer: {
      name: 'Mariana Santos',
      company: 'TechFood Alimentos',
      email: 'engenharia@techfood.com',
      phone: '(47) 99123-4567'
    },
    project: {
      applicationType: 'automacao',
      description: 'Painel de automação para controle de 3 esteiras transportadoras e 2 misturadores. Segue memorial descritivo em anexo.'
    },
    parts: [
      { id: 'cx-1', name: 'Quadro Metálico 600x400x200mm', price: 350.00, qty: 1, category: 'Estrutura (Caixas)', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&q=80' },
      { id: 'clp-1', name: 'CLP Básico 12 Entradas / 8 Saídas', price: 890.00, qty: 1, category: 'Acionamento & Controle', image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=150&q=80' },
      { id: 'inv-1', name: 'Inversor de Frequência 3CV', price: 1450.00, qty: 5, category: 'Acionamento & Controle', image: 'https://images.unsplash.com/photo-1537498425277-c283d32ef9db?w=150&q=80' },
      { id: 'ct-1', name: 'Contator de Potência 18A', price: 95.90, qty: 10, category: 'Acionamento & Controle', image: 'https://images.unsplash.com/photo-1580901369227-2c938c037803?w=150&q=80' }
    ],
    totalValue: 9449.00
  }
];

const applicationMap: Record<string, string> = {
  qgbt: 'Quadro Geral de Baixa Tensão (QGBT)',
  ccm: 'Centro de Controle de Motores (CCM)',
  automacao: 'Painel de Automação / CLP',
  banco_capacitores: 'Banco de Capacitores',
  outro: 'Outro / Não especificado'
};

export const AdminDashboard: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleWhatsApp = (phone: string, quoteId: string) => {
    const numericPhone = phone.replace(/\D/g, '');
    const message = encodeURIComponent(`Olá! Sou da TechB2B. Recebemos sua solicitação de cotação (${quoteId}) e gostaríamos de falar sobre o seu projeto.`);
    window.open(`https://wa.me/55${numericPhone}?text=${message}`, '_blank');
  };

  return (
    <section className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-6xl mx-auto">
        
        {/* Cabeçalho */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Painel Administrativo
            </h1>
            <p className="text-slate-600 mt-1">Gestão de cotações e solicitações de clientes.</p>
          </div>
        </div>

        {/* Lista de Cotações */}
        <div className="space-y-6">
          {mockQuotes.map((quote) => {
            const isExpanded = expandedId === quote.id;
            
            const structures = quote.parts.filter(p => p.category === 'Estrutura (Caixas)' || p.category === 'Painéis Prontos');
            const components = quote.parts.filter(p => p.category !== 'Estrutura (Caixas)' && p.category !== 'Painéis Prontos');

            return (
              <div key={quote.id} className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* Resumo do Card (Sempre Visível) */}
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-bold text-slate-800 text-lg">{quote.id}</span>
                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${quote.status === 'Nova' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                          {quote.status}
                        </span>
                        <span className="text-sm text-slate-500">{quote.date}</span>
                      </div>
                      <p className="text-slate-700 font-medium">{quote.customer.name} <span className="text-slate-400 font-normal">| {quote.customer.company}</span></p>
                      <p className="text-sm text-slate-500 mt-1">{applicationMap[quote.project.applicationType]}</p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                      <button onClick={() => toggleExpand(quote.id)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors">
                        {isExpanded ? 'Esconder Detalhes' : 'Ver Detalhes'}
                      </button>
                      <button onClick={() => handleWhatsApp(quote.customer.phone, quote.id)} className="px-4 py-2 flex items-center gap-2 bg-green-500 text-white rounded-lg text-sm font-bold hover:bg-green-600 transition-colors shadow-sm shadow-green-500/30">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.827z"/></svg>
                        WhatsApp
                      </button>
                      <button onClick={() => alert(`Simulação: Gerando e baixando PDF da cotação ${quote.id}`)} className="px-4 py-2 flex items-center gap-2 bg-slate-800 text-white rounded-lg text-sm font-bold hover:bg-slate-900 transition-colors shadow-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        PDF
                      </button>
                    </div>
                  </div>
                </div>

                {/* Detalhes Expandidos */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 bg-slate-50/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                      <div>
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">Dados de Contato</h3>
                        <p className="text-sm text-slate-600 mb-1"><span className="font-semibold text-slate-700">E-mail:</span> {quote.customer.email}</p>
                        <p className="text-sm text-slate-600 mb-1"><span className="font-semibold text-slate-700">Telefone:</span> {quote.customer.phone}</p>
                        
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mt-6 mb-3">Descrição Técnica</h3>
                        <p className="text-sm text-slate-600 bg-white p-3 rounded-lg border border-slate-200 leading-relaxed">
                          {quote.project.description}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3 flex justify-between">
                          <span>Peças Pré-selecionadas</span>
                          <span className="text-blue-600">Total Est.: R$ {quote.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                        </h3>
                        {quote.parts.length > 0 ? (
                          <ul className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                            {quote.parts.map(part => (
                              <li key={part.id} className="text-sm bg-white p-2 rounded-lg border border-slate-200 flex justify-between items-center">
                                <span className="text-slate-700"><span className="font-bold text-slate-500 mr-2">{part.qty}x</span>{part.name}</span>
                                <span className="font-semibold text-slate-800">R$ {(part.price * part.qty).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-slate-500 italic bg-white p-3 rounded-lg border border-slate-200">Nenhuma peça foi pré-selecionada pelo cliente.</p>
                        )}
                      </div>
                    </div>

                    {/* Desenho do Projeto (Visualizador 2D) */}
                    {structures.length > 0 && (
                      <div className="mt-8 pt-6 border-t border-slate-200">
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Desenho Pré-selecionado (2D)</h3>
                        <div className="bg-slate-100/50 rounded-xl border border-slate-200 p-4 flex flex-col items-center justify-center relative overflow-hidden">
                          <div className="w-full flex flex-col items-center gap-6 overflow-y-auto custom-scrollbar">
                            {structures.map((structure) => (
                              Array.from({ length: structure.qty }).map((_, sIdx) => (
                                <div key={`${structure.id}-${sIdx}`} className="relative w-full max-w-lg min-h-[300px] border-[8px] border-slate-700/90 bg-slate-200 rounded-lg p-3 shadow-xl flex flex-wrap content-start gap-2">
                                  
                                  {/* Label da Caixa */}
                                  <div className="absolute top-0 right-0 bg-slate-700/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10 shadow-sm">
                                    {structure.name}
                                  </div>
                                  
                                  {/* Renderização das peças */}
                                  {sIdx === 0 && structure.id === structures[0].id && components.map((item) => (
                                    Array.from({ length: item.qty }).map((_, i) => (
                                      <div 
                                        key={`${item.id}-${i}`} 
                                        className="w-12 h-12 sm:w-16 sm:h-16 bg-white border border-slate-300 rounded shadow-sm flex flex-col items-center justify-center p-1 relative"
                                        title={item.name}
                                      >
                                        {item.image && <img src={item.image} alt={item.name} className="w-6 h-6 sm:w-8 sm:h-8 object-cover rounded mix-blend-multiply mb-0.5" />}
                                        <span className="text-[6px] sm:text-[8px] leading-[1.1] text-center font-bold text-slate-700 w-full line-clamp-2">{item.name}</span>
                                      </div>
                                    ))
                                  ))}
                                </div>
                              ))
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};