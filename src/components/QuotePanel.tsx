import React from 'react';

export const QuotePanel: React.FC = () => {
  return (
    <section className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Cabeçalho da página */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Solicitar Cotação de <span className="text-blue-600">Painel Elétrico</span>
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Preencha os detalhes do seu projeto abaixo. Nossa equipe de engenharia avaliará as informações e entrará em contato com a melhor solução técnica.
          </p>
        </div>

        {/* Card do Formulário */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl shadow-slate-200/50 border border-white/60 overflow-hidden">
          <form className="p-6 sm:p-10 space-y-8" onSubmit={(e) => e.preventDefault()}>
            
            {/* Seção 1: Dados de Contato */}
            <div>
              <h2 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-2 mb-6 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm">1</span>
                Dados de Contato
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nome Completo</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors bg-white/50 focus:bg-white outline-none backdrop-blur-sm" placeholder="João da Silva" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Empresa</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors bg-white/50 focus:bg-white outline-none backdrop-blur-sm" placeholder="Nome da sua Empresa" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">E-mail Corporativo</label>
                  <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors bg-white/50 focus:bg-white outline-none backdrop-blur-sm" placeholder="joao@empresa.com.br" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Telefone / WhatsApp</label>
                  <input type="tel" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors bg-white/50 focus:bg-white outline-none backdrop-blur-sm" placeholder="(00) 00000-0000" />
                </div>
              </div>
            </div>

            {/* Seção 2: Detalhes do Projeto */}
            <div>
              <h2 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-2 mb-6 flex items-center gap-2 mt-10">
                <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm">2</span>
                Detalhes Técnicos do Painel
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo de Aplicação</label>
                  <select defaultValue="" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors bg-white/50 focus:bg-white outline-none appearance-none backdrop-blur-sm">
                    <option value="" disabled>Selecione uma opção...</option>
                    <option value="qgbt">Quadro Geral de Baixa Tensão (QGBT)</option>
                    <option value="ccm">Centro de Controle de Motores (CCM)</option>
                    <option value="automacao">Painel de Automação / CLP</option>
                    <option value="banco_capacitores">Banco de Capacitores</option>
                    <option value="outro">Outro / Não tenho certeza</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Descrição do Projeto</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors bg-white/50 focus:bg-white outline-none resize-none backdrop-blur-sm" 
                    placeholder="Descreva brevemente a finalidade, potência instalada, local de instalação ou qualquer outra especificação relevante..."
                  ></textarea>
                </div>

                {/* Upload de Arquivo UI */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Anexar Projeto Unifilar ou Memorial (Opcional)</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer group">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-slate-400 group-hover:text-blue-500 transition-colors" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-slate-600 justify-center">
                        <span className="relative cursor-pointer bg-transparent rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                          Faça upload de um arquivo
                        </span>
                        <p className="pl-1">ou arraste e solte aqui</p>
                      </div>
                      <p className="text-xs text-slate-500">PDF, DWG, PNG ou JPG até 10MB</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Rodapé do Form / Submit */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
              <p className="text-sm text-slate-500 max-w-sm">
                Seus dados estão seguros e não serão compartilhados.
              </p>
              <button type="submit" className="w-full sm:w-auto px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-0.5 text-lg">
                Enviar Solicitação
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
};