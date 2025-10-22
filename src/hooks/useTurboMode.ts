import { useState, useEffect, useCallback } from 'react';

interface TurboModeState {
  isEnabled: boolean;
  deliveryTime: string;
  deliveryDays: number;
}

const TURBO_STORAGE_KEY = 'atr-turbo-mode';
const TURBO_EVENT = 'turbo-mode-changed';

export const useTurboMode = () => {
  const [turboState, setTurboState] = useState<TurboModeState>(() => {
    // Inicializar com sessionStorage se disponível
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem(TURBO_STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          return {
            isEnabled: parsed.isEnabled || false,
            deliveryTime: parsed.isEnabled ? '48 horas' : '7 dias',
            deliveryDays: parsed.isEnabled ? 2 : 7
          };
        } catch {
          // Se houver erro no parse, usar valores padrão
        }
      }
    }
    
    return {
      isEnabled: false,
      deliveryTime: '7 dias',
      deliveryDays: 7
    };
  });

  // Função para alternar o modo turbo
  const toggleTurboMode = useCallback(() => {
    setTurboState(prevState => {
      const newState = {
        isEnabled: !prevState.isEnabled,
        deliveryTime: !prevState.isEnabled ? '48 horas' : '7 dias',
        deliveryDays: !prevState.isEnabled ? 2 : 7
      };

      // Persistir no sessionStorage
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(TURBO_STORAGE_KEY, JSON.stringify(newState));
        
        // Emitir evento global para sincronização
        const event = new CustomEvent(TURBO_EVENT, {
          detail: newState
        });
        window.dispatchEvent(event);
      }

      return newState;
    });
  }, []);

  // Função para definir o estado do turbo mode
  const setTurboMode = useCallback((enabled: boolean) => {
    const newState = {
      isEnabled: enabled,
      deliveryTime: enabled ? '48 horas' : '7 dias',
      deliveryDays: enabled ? 2 : 7
    };

    setTurboState(newState);

    // Persistir no sessionStorage
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(TURBO_STORAGE_KEY, JSON.stringify(newState));
      
      // Emitir evento global para sincronização
      const event = new CustomEvent(TURBO_EVENT, {
        detail: newState
      });
      window.dispatchEvent(event);
    }
  }, []);

  // Escutar mudanças do evento global
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleTurboChange = (event: CustomEvent<TurboModeState>) => {
      setTurboState(event.detail);
    };

    window.addEventListener(TURBO_EVENT, handleTurboChange as EventListener);

    return () => {
      window.removeEventListener(TURBO_EVENT, handleTurboChange as EventListener);
    };
  }, []);

  // Função para obter texto formatado do prazo
  const getDeliveryText = useCallback(() => {
    return turboState.isEnabled 
      ? '🚀 ENTREGA EM 48H!' 
      : 'Entrega padrão: 7 dias';
  }, [turboState.isEnabled]);

  // Função para obter texto de economia
  const getSavingsText = useCallback(() => {
    return turboState.isEnabled 
      ? '⚡ 5 DIAS MAIS RÁPIDO!' 
      : 'Ative para acelerar 5 dias';
  }, [turboState.isEnabled]);

  // Função para obter classe CSS baseada no estado
  const getTurboClass = useCallback(() => {
    return turboState.isEnabled ? 'turbo-active' : 'turbo-inactive';
  }, [turboState.isEnabled]);

  return {
    isEnabled: turboState.isEnabled,
    deliveryTime: turboState.deliveryTime,
    deliveryDays: turboState.deliveryDays,
    toggleTurboMode,
    setTurboMode,
    getDeliveryText,
    getSavingsText,
    getTurboClass
  };
};

export default useTurboMode;