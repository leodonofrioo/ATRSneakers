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
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
        <p className="text-gray-600 mb-6">{item.description}</p>
        
        <div className="relative">
          {/* Comparison Container */}
          <div className="flex items-center justify-between gap-4">
            {/* Before Image */}
            <div className="flex-1">
              <div className="relative group">
                <img
                  src={item.beforeImage}
                  alt={`${item.title} - ${item.beforeLabel}`}
                  className="w-full h-48 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {item.beforeLabel}
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex-shrink-0 mx-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full shadow-lg animate-pulse">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* After Image */}
            <div className="flex-1">
              <div className="relative group">
                <img
                  src={item.afterImage}
                  alt={`${item.title} - ${item.afterLabel}`}
                  className="w-full h-48 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
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
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Transformação dos Seus Tênis
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Veja os resultados incríveis dos nossos serviços especializados. 
            Cada tênis recebe o cuidado que merece para voltar como novo.
          </p>
          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Before/After Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {beforeAfterData.map((item) => (
            <BeforeAfterCard key={item.id} item={item} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Pronto para Transformar Seus Tênis?
            </h3>
            <p className="text-gray-600 mb-6">
              Nossos especialistas estão prontos para devolver a vida aos seus calçados favoritos.
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Solicitar Orçamento
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;