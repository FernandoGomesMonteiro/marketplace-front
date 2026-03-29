import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

type SelectedPart = { id: string; name: string; price: number; qty: number; image: string; category: string; };

export const UserDashboard: React.FC = () => {
  const location = useLocation();
  const { user: initialUser, selectedParts = [], totalValue = 0 } = location.state || {};

  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(initialUser);

  // Mapeamento do valor do select para um nome mais amigável
  const applicationMap: Record<string, string> = {
    qgbt: 'Quadro Geral de Baixa Tensão (QGBT)',
    ccm: 'Centro de Controle de Motores (CCM)',
    automacao: 'Painel de Automação / CLP',
    banco_capacitores: 'Banco de Capacitores',
    outro: 'Outro / Não especificado'
  };

  // Se o usuário acessar a página direto sem enviar o formulário, mostramos um aviso
  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Nenhuma cotação encontrada.</h2>
        <p className="text-slate-600 mb-6">Parece que você ainda não enviou uma solicitação de cotação.</p>
        <Link to="/montar-painel" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
          Fazer Cotação Agora
        </Link>
      </div>
    );
  }

  const handleSave = () => {
    setIsEditing(false);
    // Simulação de salvamento
    alert('Dados da solicitação atualizados com sucesso!');
  };

  const structures = selectedParts.filter((p: SelectedPart) => p.category === 'Estrutura (Caixas)' || p.category === 'Painéis Prontos');
  const components = selectedParts.filter((p: SelectedPart) => p.category !== 'Estrutura (Caixas)' && p.category !== 'Painéis Prontos');

  return (
    <section className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-6xl mx-auto">
        
        {/* Cabeçalho do Dashboard */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Olá, <span className="text-blue-600">{user.name.split(' ')[0]}</span>!
            </h1>
            <p className="text-slate-600 mt-1">Acompanhe abaixo o status e os detalhes da sua solicitação.</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {isEditing ? (
              <button onClick={handleSave} className="flex items-center justify-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-green-600 transition-colors shadow-sm">
                Salvar Alterações
              </button>
            ) : (
              <button onClick={() => setIsEditing(true)} className="flex items-center justify-center gap-2 bg-blue-100 text-blue-700 px-5 py-2.5 rounded-xl font-bold hover:bg-blue-200 transition-colors shadow-sm">
                Editar Dados
              </button>
            )}
            <button 
              onClick={() => alert("Simulação: Gerando arquivo PDF com o resumo da cotação...")}
              className="flex items-center justify-center gap-2 bg-white border-2 border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-bold hover:border-orange-500 hover:text-orange-600 transition-colors shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Baixar PDF
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Coluna da Esquerda (Informações Gerais) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Status do Pedido */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/60 p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                Status da Cotação
              </h2>
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 font-medium">
                Recebida com Sucesso! Nossa engenharia já está analisando seu projeto e entrará em contato em breve.
              </div>
            </div>

            {/* Dados do Cliente */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/60 p-6">
              <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">Dados Cadastrais</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                <div className="col-span-1 sm:col-span-2">
                  <p className="text-sm text-slate-500 font-medium mb-1">Nome Completo</p>
                  {isEditing ? (
                    <input type="text" value={user.name} onChange={e => setUser({...user, name: e.target.value})} className="w-full px-3 py-2 border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none rounded-lg" />
                  ) : (
                    <p className="text-slate-900 font-semibold">{user.name}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-1">Empresa</p>
                  {isEditing ? (
                    <input type="text" value={user.company} onChange={e => setUser({...user, company: e.target.value})} className="w-full px-3 py-2 border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none rounded-lg" />
                  ) : (
                    <p className="text-slate-900 font-semibold">{user.company}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-1">E-mail</p>
                  {isEditing ? (
                    <input type="email" value={user.email} onChange={e => setUser({...user, email: e.target.value})} className="w-full px-3 py-2 border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none rounded-lg" />
                  ) : (
                    <p className="text-slate-900 font-semibold">{user.email}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-1">Telefone</p>
                  {isEditing ? (
                    <input type="text" value={user.phone} onChange={e => setUser({...user, phone: e.target.value})} className="w-full px-3 py-2 border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none rounded-lg" />
                  ) : (
                    <p className="text-slate-900 font-semibold">{user.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Dados Técnicos */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/60 p-6">
              <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">Requisitos do Projeto</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-1">Tipo de Aplicação</p>
                  {isEditing ? (
                    <select value={user.applicationType} onChange={e => setUser({...user, applicationType: e.target.value})} className="w-full px-3 py-2 border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none rounded-lg bg-white">
                      <option value="qgbt">Quadro Geral de Baixa Tensão (QGBT)</option>
                      <option value="ccm">Centro de Controle de Motores (CCM)</option>
                      <option value="automacao">Painel de Automação / CLP</option>
                      <option value="banco_capacitores">Banco de Capacitores</option>
                      <option value="outro">Outro / Não tenho certeza</option>
                    </select>
                  ) : (
                    <p className="text-slate-900 font-semibold">{applicationMap[user.applicationType] || user.applicationType}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-1">Descrição Técnica</p>
                  {isEditing ? (
                    <textarea rows={4} value={user.description} onChange={e => setUser({...user, description: e.target.value})} className="w-full px-3 py-2 border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none rounded-lg resize-none" />
                  ) : (
                    <p className="text-slate-800 bg-slate-50 p-4 rounded-lg border border-slate-100 mt-1 whitespace-pre-wrap">
                      {user.description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Desenho do Projeto (Visualizador 2D) */}
            {structures.length > 0 && (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/60 p-6">
                <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">Desenho do Painel (2D)</h2>
                <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="w-full flex flex-col items-center gap-6 overflow-y-auto custom-scrollbar">
                    {structures.map((structure: SelectedPart) => (
                      Array.from({ length: structure.qty }).map((_, sIdx) => (
                        <div key={`${structure.id}-${sIdx}`} className="relative w-full max-w-lg min-h-[300px] border-[8px] border-slate-700/90 bg-slate-200 rounded-lg p-3 shadow-xl flex flex-wrap content-start gap-2">
                          
                          {/* Label da Caixa */}
                          <div className="absolute top-0 right-0 bg-slate-700/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10 shadow-sm">
                            {structure.name}
                          </div>
                          
                          {/* Renderização das peças */}
                          {sIdx === 0 && structure.id === structures[0].id && components.map((item: SelectedPart) => (
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
                          {sIdx === 0 && structure.id === structures[0].id && components.length === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <span className="bg-slate-300/50 text-slate-600 px-3 py-1 rounded-md font-semibold text-xs">Estrutura Vazia</span>
                            </div>
                          )}
                        </div>
                      ))
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Coluna da Direita (Resumo Financeiro e Peças) */}
          <div className="lg:col-span-1 space-y-8">
            
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl shadow-slate-200/50 border border-white/60 p-6 sticky top-28">
              <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">
                Resumo da Pré-seleção
              </h2>
              
              {selectedParts.length > 0 ? (
                <>
                  <ul className="space-y-3 mb-6 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                    {selectedParts.map((part: SelectedPart) => (
                      <li key={part.id} className="flex justify-between items-start text-sm bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <div className="flex gap-2 items-start">
                          <span className="bg-slate-200 text-slate-700 font-bold px-1.5 py-0.5 rounded text-xs mt-0.5">{part.qty}x</span>
                          <span className="text-slate-700 font-medium leading-tight">{part.name}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                    <span className="text-sm text-slate-600 block mb-1">Total Estimado das Peças:</span>
                    <span className="text-2xl font-extrabold text-blue-700 block">
                      R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-4 text-center">
                    *Orçamento final será enviado em breve incluindo frete e montagem.
                  </p>
                </>
              ) : (
                <div className="text-center py-6 text-slate-500 bg-slate-50 rounded-lg border border-slate-100">
                  <p>Nenhuma peça foi pré-selecionada.</p>
                  <p className="text-xs mt-2">Nossa engenharia fará o dimensionamento completo pelo seu memorial descritivo.</p>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};