import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Service } from '../types';
import { useTurboMode } from '../hooks/useTurboMode';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  const { isEnabled: isTurboEnabled, getDeliveryText } = useTurboMode();
  const [isHovered, setIsHovered] = useState(false);

  const TURBO_FEE = 30.00;
  const basePrice = service.price;
  const finalPrice = isTurboEnabled ? basePrice + TURBO_FEE : basePrice;

  const handleScheduleTransformation = () => {
    const message = `Olá! Gostaria de agendar o serviço "${service.name}" ${isTurboEnabled ? 'com modo turbo' : ''} para meus tênis. Valor: R$ ${finalPrice.toFixed(2).replace('.', ',')}`;
    const whatsappUrl = `https://wa.me/5511934129273?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

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
    <div 
      className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full min-h-[450px] sm:min-h-[500px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Conteúdo Superior - Flexível */}
      <div className="flex-1 flex flex-col">
        {/* Header do Card */}
        <div className="flex justify-between items-start mb-3 sm:mb-4">
          <div className="w-full">
            <span className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getCategoryColor(service.category)}`}>
              {service.category.toUpperCase()}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-[#004D62] mt-2">{service.name}</h3>
            <p className="text-sm sm:text-base text-gray-600 mt-1">{service.description}</p>
          </div>
        </div>

        {/* Features - Ocupa espaço restante */}
        <div className="flex-1 mb-4 sm:mb-6">
          <h4 className="font-semibold text-[#004D62] mb-2 sm:mb-3 text-sm sm:text-base">Inclui:</h4>
          <ul className="space-y-1 sm:space-y-2">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-start text-xs sm:text-sm text-gray-700">
                <span className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5">✓</span>
                <span className="leading-tight">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Seção Inferior Fixa - Preço e Botão */}
      <div className="mt-auto">
        <div className="space-y-3">
          <div className={`p-3 sm:p-4 rounded-xl transition-all duration-300 ${
            isTurboEnabled 
              ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200' 
              : 'bg-[#F6F8FB]'
          }`}>
            <div className="flex justify-between items-center mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {isTurboEnabled && (
                    <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                      ⚡ TURBO
                    </span>
                  )}
                </div>
                
                <div className="text-xl sm:text-2xl font-bold text-[#004D62]">
                  R$ {finalPrice.toFixed(2).replace('.', ',')}
                </div>
              </div>
            </div>
            
            <button
              onClick={() => {
                const message = "Olá! Gostaria de solicitar um orçamento para renovação dos meus tênis. Poderia me ajudar?";
                const whatsappUrl = `https://wa.me/5511934129273?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
              }}
              className={`w-full py-3 sm:py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base min-h-[48px] ${
                isTurboEnabled
                  ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg'
                  : 'bg-[#25D366] hover:bg-[#20BA5A] text-white'
              }`}
            >
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
              Renovar Tênis Agora
            </button>
          </div>
        </div>

        {/* Prazo Dinâmico */}
        <div className="mt-3 sm:mt-4 text-center">
          <span className={`text-xs sm:text-sm transition-all duration-300 ${
            isTurboEnabled 
              ? 'text-blue-600 font-semibold' 
              : 'text-gray-500'
          }`}>
            {isTurboEnabled ? '⚡' : '⏱️'} {getDeliveryText()}
          </span>
          {isTurboEnabled && (
            <div className="mt-1">
              <span className="text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded-full">
                Modo Turbo Ativo
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};