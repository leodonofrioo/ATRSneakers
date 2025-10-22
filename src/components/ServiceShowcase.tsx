import React, { useState, useEffect } from 'react';
import { Service } from '../types';
import { useCart } from '../hooks/useCart';
import { useTurboMode } from '../hooks/useTurboMode';
import { Plus } from 'lucide-react';

interface ServiceShowcaseProps {
  service: Service;
}

export const ServiceShowcase = ({ service }: ServiceShowcaseProps) => {
  const { addItem } = useCart();
  const { isEnabled: isTurboEnabled } = useTurboMode();
  const [isShowingAfter, setIsShowingAfter] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Imagens antes e depois baseadas no ID do serviço
  const beforeImage = `/src/assets/mock/servico${service.id.split('-')[0]}-antes.jpg`;
  const afterImage = `/src/assets/mock/servico${service.id.split('-')[0]}-depois.jpg`;

  // Efeito para alternar automaticamente entre antes e depois
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (!isPaused) {
      interval = setInterval(() => {
        setIsShowingAfter(prev => !prev);
      }, 2000); // Alterna a cada 2 segundos, com transição de 0.5s
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPaused]);

  const handleAddToCart = () => {
    addItem(service, isTurboEnabled);
  };

  const TURBO_FEE = 30.00;
  const finalPrice = isTurboEnabled ? service.price + TURBO_FEE : service.price;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'lavagem':
        return 'bg-cyan-100 text-cyan-800';
      case 'protecao':
        return 'bg-blue-100 text-blue-800';
      case 'renovacao':
        return 'bg-green-100 text-green-800';
      case 'reconstrucao':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Área de imagem com animação */}
      <div className="relative h-80 overflow-hidden">
        {/* Indicadores de Antes/Depois */}
        <div className="absolute top-4 left-4 z-10 flex space-x-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            !isShowingAfter ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}>
            ANTES
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            isShowingAfter ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}>
            DEPOIS
          </span>
        </div>
        
        {/* Imagens com transição */}
        <div 
          className="relative w-full h-full cursor-pointer"
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div 
            className="absolute inset-0 bg-center bg-cover transition-opacity duration-500"
            style={{ 
              backgroundImage: `url(${beforeImage})`,
              opacity: isShowingAfter ? 0 : 1
            }}
          />
          <div 
            className="absolute inset-0 bg-center bg-cover transition-opacity duration-500"
            style={{ 
              backgroundImage: `url(${afterImage})`,
              opacity: isShowingAfter ? 1 : 0
            }}
          />
        </div>
      </div>
      
      {/* Conteúdo do serviço */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(service.category)}`}>
              {service.category.toUpperCase()}
            </span>
            <h3 className="text-2xl font-bold text-[#004D62] mt-2">{service.name}</h3>
            <p className="text-gray-600 mt-1">{service.description}</p>
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h4 className="font-semibold text-[#004D62] mb-3">Inclui:</h4>
          <ul className="space-y-2">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Preço e Botão */}
        <div className="flex justify-between items-center mt-6">
          <div>
            <div className="flex items-center gap-2">
              {isTurboEnabled && (
                <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                  ⚡ TURBO
                </span>
              )}
            </div>
            <div className="text-2xl font-bold text-[#004D62]">
              R$ {finalPrice.toFixed(2).replace('.', ',')}
            </div>
          </div>
          
          <button
            onClick={handleAddToCart}
            className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center ${
              isTurboEnabled
                ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg'
                : 'bg-[#4DD0E1] hover:bg-[#26C6DA] text-white'
            }`}
          >
            <Plus className="h-5 w-5 mr-1" />
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};