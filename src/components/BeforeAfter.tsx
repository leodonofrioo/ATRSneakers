import React from 'react';
import { ArrowRight } from 'lucide-react';

interface BeforeAfterItem {
  id: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
}

const beforeAfterData: BeforeAfterItem[] = [
  {
    id: 'lavagem',
    title: 'Lavagem Profissional',
    description: 'Remoção completa de sujeira e manchas',
    beforeImage: '/Tenis-Sujo.png',
    afterImage: '/Tenis-Limpo.png',
    beforeLabel: 'Antes',
    afterLabel: 'Depois'
  },
  {
    id: 'hidratacao',
    title: 'Hidratação de Couro',
    description: 'Restauração e proteção do couro ressecado',
    beforeImage: '/Coura-ressecado.png',
    afterImage: '/Couro-hidratado.png',
    beforeLabel: 'Ressecado',
    afterLabel: 'Hidratado'
  },
  {
    id: 'desintoxicacao',
    title: 'Desintoxicação da Entressola',
    description: 'Eliminação do amarelado e restauração da cor original',
    beforeImage: '/Tenis-Amarelado.png',
    afterImage: '/Tenis-Desamarelado.png',
    beforeLabel: 'Amarelado',
    afterLabel: 'Restaurado'
  }
];

const BeforeAfterCard: React.FC<{ item: BeforeAfterItem }> = ({ item }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{item.description}</p>
        
        <div className="relative">
          {/* Comparison Container - Stack vertically on mobile */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            {/* Before Image - Formato quadrado (1:1) */}
            <div className="w-full sm:flex-1">
              <div className="relative group">
                <div 
                  className="w-full rounded-lg shadow-md overflow-hidden"
                  style={{ aspectRatio: '1 / 1' }}
                >
                  <img
                    src={item.beforeImage}
                    alt={`${item.title} - ${item.beforeLabel}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute bottom-2 left-2 bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  {item.beforeLabel}
                </div>
              </div>
            </div>

            {/* Arrow - Rotate for mobile */}
            <div className="flex-shrink-0 mx-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 sm:p-3 rounded-full shadow-lg animate-pulse">
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white transform sm:transform-none rotate-90 sm:rotate-0" />
              </div>
            </div>

            {/* After Image - Formato quadrado (1:1) */}
            <div className="w-full sm:flex-1">
              <div className="relative group">
                <div 
                  className="w-full rounded-lg shadow-md overflow-hidden"
                  style={{ aspectRatio: '1 / 1' }}
                >
                  <img
                    src={item.afterImage}
                    alt={`${item.title} - ${item.afterLabel}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute bottom-2 right-2 bg-green-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  {item.afterLabel}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BeforeAfter: React.FC = () => {
  return (
    <section className="py-8 sm:py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Renove Seus Tênis Como Nunca Antes
          </h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Transformamos tênis desgastados em peças impecáveis. Nossa expertise garante resultados surpreendentes que superam suas expectativas.
          </p>
          <div className="mt-4 sm:mt-6 w-16 sm:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Before/After Cards - Single column on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {beforeAfterData.map((item) => (
            <BeforeAfterCard key={item.id} item={item} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8 sm:mt-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              Pronto para Transformar Seus Tênis?
            </h3>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Nossos especialistas estão prontos para devolver a vida aos seus calçados favoritos.
            </p>
            <button 
              onClick={() => {
                const message = "Olá! Gostaria de solicitar um orçamento para renovação dos meus tênis. Poderia me ajudar?";
                const whatsappUrl = `https://wa.me/5511934129273?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg min-h-[48px] text-sm sm:text-base"
            >
              Renovar Tênis Agora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;