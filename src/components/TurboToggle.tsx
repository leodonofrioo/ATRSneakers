import React, { memo, useState } from 'react';
import { useTurboMode } from '../hooks/useTurboMode';

interface TurboToggleProps {
  className?: string;
}

const LightningIcon = memo(() => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-all duration-300 ease-in-out"
  >
    <path
      d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));

LightningIcon.displayName = 'LightningIcon';

export const TurboToggle = memo(({ className = '' }: TurboToggleProps) => {
  const { isEnabled, toggleTurboMode, getDeliveryText, getSavingsText } = useTurboMode();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleToggle = () => {
    toggleTurboMode();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleTurboMode();
    }
  };

  return (
    <div className={`relative flex items-center gap-6 ${className}`}>
      {/* Container Principal com Tooltip */}
      <div 
        className="relative min-w-[180px]"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute bottom-full right-0 mb-2 w-72 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-xl z-50 transform transition-all duration-200">
            <div className="font-semibold text-yellow-400 mb-1">
              🚀 MODO TURBO ATIVADO!
            </div>
            <div className="text-gray-200">
              {isEnabled 
                ? "Seus tênis chegam em apenas 48 horas! Economia de 5 dias na entrega." 
                : "Ative o Modo Turbo e receba seus tênis 5 DIAS MAIS RÁPIDO! De 7 dias para apenas 48 horas."
              }
            </div>
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        )}

        {/* Informações do Modo Turbo */}
        <div className="flex flex-col items-end gap-1 pr-2">
          {/* Badge de Economia */}
          {!isEnabled && (
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse shadow-lg whitespace-nowrap">
              💥 ECONOMIZE 5 DIAS!
            </div>
          )}
          
          {/* Badge Ativo */}
          {isEnabled && (
            <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce whitespace-nowrap">
              ✅ ATIVO!
            </div>
          )}
          
          {/* Título */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200 whitespace-nowrap">
              MODO TURBO
            </span>
          </div>
          
          {/* Status da Entrega */}
          <span className={`text-xs font-semibold whitespace-nowrap ${
            isEnabled 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-gray-600 dark:text-gray-400'
          }`}>
            {getDeliveryText()}
          </span>
          
          {/* Texto de Economia */}
          <span className={`text-xs font-bold whitespace-nowrap ${
            isEnabled 
              ? 'text-yellow-600 dark:text-yellow-400 animate-pulse' 
              : 'text-orange-600 dark:text-orange-400'
          }`}>
            {getSavingsText()}
          </span>
        </div>
      </div>

      {/* Switch Toggle com Mais Espaço */}
      <button
        type="button"
        role="switch"
        aria-checked={isEnabled}
        aria-label={`Modo Turbo ${isEnabled ? 'ativado' : 'desativado'}. ${getDeliveryText()}`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={`
          relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 
          transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-offset-2
          transform hover:scale-105 active:scale-95 shadow-lg ml-4
          ${isEnabled 
            ? 'bg-gradient-to-r from-green-400 to-blue-500 border-yellow-400 shadow-green-500/50 focus:ring-green-400' 
            : 'bg-gradient-to-r from-gray-300 to-gray-400 border-gray-300 hover:from-orange-300 hover:to-red-400 focus:ring-orange-400 shadow-gray-400/30'
          }
        `}
      >
        {/* Slider */}
        <span
          className={`
            pointer-events-none inline-block h-6 w-6 transform rounded-full shadow-lg 
            ring-2 ring-white transition-all duration-300 ease-in-out flex items-center justify-center
            ${isEnabled 
              ? 'translate-x-6 bg-gradient-to-br from-yellow-300 to-orange-400 shadow-xl' 
              : 'translate-x-1 bg-white'
            }
          `}
        >
          {/* Ícone */}
          {isEnabled && (
            <div className="text-red-600">
              <LightningIcon />
            </div>
          )}
        </span>

        {/* Efeito de brilho quando ativado */}
        {isEnabled && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-green-400 opacity-20 animate-pulse" />
        )}
      </button>

      {/* Descrição oculta para screen readers */}
      <span className="sr-only">
        {isEnabled 
          ? 'Modo Turbo ativado: entrega em 48 horas com taxa adicional'
          : 'Modo Turbo desativado: entrega padrão em 7 dias úteis'
        }
      </span>
    </div>
  );
});

TurboToggle.displayName = 'TurboToggle';

export default TurboToggle;