import { useState } from 'react';
import { useTurboMode } from '../hooks/useTurboMode';

// Ícone de raio moderno para o FAB
const LightningIcon = ({ className = "w-6 h-6", isActive = false }: { className?: string; isActive?: boolean }) => (
  <svg 
    className={`${className} transition-all duration-300 ${isActive ? 'text-white drop-shadow-sm' : 'text-slate-600'}`} 
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M13 2L3 14h6l-2 8 10-12h-6l2-8z" />
  </svg>
);

export const TurboToggle = () => {
  const { isEnabled, toggleTurboMode, getDeliveryText, getSavingsText } = useTurboMode();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-[1000] group">
        {/* Tooltip Profissional - ALINHADO À DIREITA */}
        {showTooltip && (
          <div className="absolute bottom-full right-0 mb-3 w-72 p-4 bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-xl shadow-2xl border border-slate-700/50 backdrop-blur-sm transform transition-all duration-300 ease-out">
            {/* Seta do tooltip - AJUSTADA PARA DIREITA */}
            <div className="absolute top-full right-6 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-slate-800"></div>
            
            <div className="space-y-3">
              {/* Cabeçalho */}
              <div className="flex items-center gap-2">
                <LightningIcon className="w-5 h-5 text-emerald-400" isActive={true} />
                <h3 className="text-white font-semibold text-sm">Modo Turbo</h3>
              </div>
              
              {/* Status */}
              <div className="flex items-center gap-2">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isEnabled 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                    : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                }`}>
                  {isEnabled ? 'ATIVO' : 'INATIVO'}
                </div>
              </div>
              
              {/* Informações */}
              <div className="space-y-2 text-xs text-slate-300">
                <p className="flex items-center justify-between">
                  <span>Entrega:</span>
                  <span className="text-white font-medium">
                    {isEnabled ? 'até 48h' : 'até 7 dias'}
                  </span>
                </p>
                <p className="flex items-center justify-between">
                  <span>Economia:</span>
                  <span className="text-emerald-400 font-medium">5 dias</span>
                </p>
              </div>
            </div>
          </div>
        )}



        {/* Texto informativo sobre entrega AO LADO ESQUERDO do botão */}
        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 text-left z-10">
          <div className={`
            px-4 py-2 rounded-lg text-sm font-semibold shadow-lg border-2 backdrop-blur-sm
            transition-all duration-300 inline-block
            ${isEnabled 
              ? 'bg-emerald-100 text-emerald-800 border-emerald-300 shadow-emerald-200/50' 
              : 'bg-orange-100 text-orange-800 border-orange-300 shadow-orange-200/50'
            }
          `}>
            <div className="flex items-center gap-2">
              <span className="text-lg">
                {isEnabled ? '⚡' : '📦'}
              </span>
              <span className="font-bold">
                {isEnabled ? 'Entrega em até 48h' : 'Entrega em até 7 dias'}
              </span>
            </div>
          </div>
        </div>

        {/* Botão Principal FAB */}
        <button
          onClick={toggleTurboMode}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          className={`
            relative w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl
            transition-all duration-500 ease-out
            transform hover:scale-110 active:scale-95
            focus:outline-none focus:ring-4 focus:ring-offset-2
            ${isEnabled 
              ? 'bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 hover:from-emerald-300 hover:via-emerald-400 hover:to-teal-500 focus:ring-emerald-400/50 shadow-emerald-500/30' 
              : 'bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600 hover:from-orange-400 hover:via-orange-500 hover:to-red-500 focus:ring-slate-400/50 shadow-slate-500/30'
            }
          `}
          aria-label={`Modo Turbo ${isEnabled ? 'ativo' : 'inativo'} - Clique para ${isEnabled ? 'desativar' : 'ativar'}`}
          aria-pressed={isEnabled}
        >
          {/* Efeito de brilho interno */}
          <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
          
          {/* Ícone central */}
          <div className="flex items-center justify-center h-full">
            <LightningIcon 
              className={`w-7 h-7 sm:w-8 sm:h-8 transition-all duration-300 ${
                isEnabled ? 'text-white animate-pulse' : 'text-white/90'
              }`} 
              isActive={isEnabled} 
            />
          </div>

          {/* Animação de ondas quando ativo */}
          {isEnabled && (
            <>
              <div className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping"></div>
              <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-pulse"></div>
            </>
          )}
        </button>

        {/* Badge de Status */}
        <div className={`
          absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-bold
          transition-all duration-300 transform
          ${isEnabled 
            ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg animate-bounce' 
            : 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
          }
        `}>
          {isEnabled ? '⚡' : '💤'}
        </div>

        {/* Partículas decorativas quando ativo */}
        {isEnabled && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping opacity-75"></div>
            <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse opacity-60"></div>
            <div className="absolute top-1/2 -left-2 w-1 h-1 bg-emerald-300 rounded-full animate-bounce opacity-50"></div>
          </div>
        )}
      </div>

      {/* CSS customizado para responsividade mobile */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media (max-width: 640px) {
            .fixed.bottom-6.right-6 {
              bottom: 1rem !important;
              right: 1rem !important;
            }
          }
          
          @media (max-width: 480px) {
            .fixed.bottom-6.right-6 {
              bottom: 0.75rem !important;
              right: 0.75rem !important;
            }
          }
        `
      }} />
    </>
  );
};