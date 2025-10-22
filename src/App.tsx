import { useState } from 'react';
import { Header } from './components/Header';
import { ServiceCard } from './components/ServiceCard';
import { ServiceShowcase } from './components/ServiceShowcase';
import { Cart } from './components/Cart';
import { CheckoutForm } from './components/CheckoutForm';
import { TurboToggle } from './components/TurboToggle';
import BeforeAfter from './components/BeforeAfter';
import { services } from './data/services';

// Adicionar estilos CSS personalizados para perspectiva 3D
const customStyles = `
  .perspective-1000 {
    perspective: 1000px;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-float-delayed {
    animation: float 6s ease-in-out infinite;
    animation-delay: 2s;
  }
  
  /* Scroll suave para toda a página */
  html {
    scroll-behavior: smooth;
  }
  
  /* Otimizações para touch */
  button, a {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }
`;

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F8FB] to-[#E3F2FD]">
      {/* Injetar estilos personalizados */}
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      {/* Enhanced 3D Background Bubbles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Logo centralizado no topo - Responsivo */}
        <div className="absolute top-4 sm:top-8 left-1/2 transform -translate-x-1/2 z-20">
          <img 
            src="/Logo ATR.svg" 
            alt="ATR Logo" 
            className="h-12 sm:h-16 w-auto opacity-20 filter brightness-0 invert"
          />
        </div>
        
        {/* Bolhas 3D com efeitos aprimorados - Reduzidas para mobile */}
         <div className="absolute top-1/4 left-1/4 w-20 sm:w-32 h-20 sm:h-32 bg-gradient-to-br from-[#4DD0E1] to-[#26C6DA] rounded-full opacity-20 shadow-2xl animate-float"></div>
         <div className="absolute top-3/4 right-1/4 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-br from-[#FF9800] to-[#F57C00] rounded-full opacity-20 shadow-xl animate-float-delayed"></div>
         <div className="absolute top-1/2 left-3/4 w-24 sm:w-40 h-24 sm:h-40 bg-gradient-to-br from-[#004D62] to-[#00344A] rounded-full opacity-15 shadow-2xl animate-float"></div>
         
         {/* Bolhas adicionais para mais profundidade - Ocultas em mobile muito pequeno */}
         <div className="hidden sm:block absolute top-1/6 right-1/3 w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full opacity-10 shadow-lg animate-float-delayed"></div>
         <div className="hidden sm:block absolute bottom-1/4 left-1/6 w-28 h-28 bg-gradient-to-br from-green-400 to-green-600 rounded-full opacity-15 shadow-xl animate-float"></div>
      </div>

      {/* Header */}
      <Header />

      {/* TurboToggle FAB - Integrado globalmente */}
      <TurboToggle />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Before/After Transformation Section */}
        <BeforeAfter />

        {/* Services Cards Section - Organizados por Categoria */}
        <section className="py-8 sm:py-12 lg:py-16 px-3 sm:px-4 bg-white/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#004D62] mb-3 sm:mb-4">
                Nossos Serviços
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                Escolha o serviço ideal para seus tênis e agende sua transformação
              </p>
            </div>

            {/* 🧽 PLANOS DE LAVAGEM */}
            <div className="mb-12 sm:mb-16">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-[#4DD0E1] mb-2 flex items-center justify-center gap-2 sm:gap-3">
                  <span className="text-2xl sm:text-3xl">🧽</span>
                  PLANOS DE LAVAGEM
                </h3>
                <div className="w-16 sm:w-24 h-1 bg-[#4DD0E1] mx-auto rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch">
                {services.filter(service => service.category === 'lavagem').map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>

            {/* 🛡️ PROTEÇÃO */}
            <div className="mb-12 sm:mb-16">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-[#004D62] mb-2 flex items-center justify-center gap-2 sm:gap-3">
                  <span className="text-2xl sm:text-3xl">🛡️</span>
                  PROTEÇÃO
                </h3>
                <div className="w-16 sm:w-24 h-1 bg-[#004D62] mx-auto rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch">
                {services.filter(service => service.category === 'protecao').map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>

            {/* ✨ RENOVAÇÃO */}
            <div className="mb-12 sm:mb-16">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-[#10B981] mb-2 flex items-center justify-center gap-2 sm:gap-3">
                  <span className="text-2xl sm:text-3xl">✨</span>
                  RENOVAÇÃO
                </h3>
                <div className="w-16 sm:w-24 h-1 bg-[#10B981] mx-auto rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch">
                {services.filter(service => service.category === 'renovacao').map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>

            {/* 🔧 RECONSTRUÇÃO */}
            <div className="mb-12 sm:mb-16">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-[#8B5CF6] mb-2 flex items-center justify-center gap-2 sm:gap-3">
                  <span className="text-2xl sm:text-3xl">🔧</span>
                  RECONSTRUÇÃO
                </h3>
                <div className="w-16 sm:w-24 h-1 bg-[#8B5CF6] mx-auto rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-stretch">
                {services.filter(service => service.category === 'reconstrucao').map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-8 sm:py-12 lg:py-16 px-3 sm:px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#004D62] mb-3 sm:mb-4">
                Por que Escolher a ATR?
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#4DD0E1] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl">🧽</span>
                </div>
                <h3 className="font-semibold text-[#004D62] mb-2 text-sm sm:text-base">Limpeza Profissional</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Técnicas avançadas e produtos especializados</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#FF9800] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl">⚡</span>
                </div>
                <h3 className="font-semibold text-[#004D62] mb-2 text-sm sm:text-base">Entrega Rápida</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Prazo padrão de 7 dias ou turbo em 48h</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#4DD0E1] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl">🛡️</span>
                </div>
                <h3 className="font-semibold text-[#004D62] mb-2 text-sm sm:text-base">Proteção Premium</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Impermeabilização e tratamentos especiais</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#FF9800] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl">📱</span>
                </div>
                <h3 className="font-semibold text-[#004D62] mb-2 text-sm sm:text-base">Agendamento Fácil</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Agende via WhatsApp de forma rápida e prática</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-8 sm:py-12 lg:py-16 px-3 sm:px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#004D62] mb-3 sm:mb-4">
              Pronto para Transformar seus Tênis?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 px-4">
              Entre em contato via WhatsApp e agende sua transformação
            </p>
            <a
              href="https://wa.me/5511934129273?text=Olá! Gostaria de solicitar um orçamento para renovação dos meus tênis. Poderia me ajudar?"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-colors duration-200 shadow-lg hover:shadow-xl min-h-[48px] flex items-center justify-center gap-2"
            >
              <span className="text-lg sm:text-xl">📱</span>
              Renovar Tênis Agora
            </a>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-8 sm:py-12 lg:py-16 px-3 sm:px-4 bg-gradient-to-br from-[#004D62] to-[#00344A] text-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                📍 Nossa Localização
              </h2>
              <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto px-4">
                Venha nos visitar em Santo André - SP
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              {/* Informações da Empresa */}
              <div className="space-y-6 sm:space-y-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#4DD0E1] rounded-full flex items-center justify-center">
                      <span className="text-xl sm:text-2xl">🏢</span>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">ATR Sneakers</h3>
                      <p className="text-[#4DD0E1] font-medium text-sm sm:text-base">Especialistas em Transformação</p>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#4DD0E1]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-[#4DD0E1] text-sm sm:text-base">📍</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Endereço</h4>
                        <p className="text-blue-100 leading-relaxed">
                          Av. João Ramalho, 459 Loja 12<br />
                          Vila Assunção, Santo André - SP
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#4DD0E1]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-[#4DD0E1] text-sm sm:text-base">🏙️</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1 text-sm sm:text-base">Cidade</h4>
                        <p className="text-blue-100 text-sm sm:text-base">Santo André - São Paulo</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#4DD0E1]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-[#4DD0E1] text-sm sm:text-base">📱</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1 text-sm sm:text-base">WhatsApp</h4>
                        <p className="text-blue-100 text-sm sm:text-base">(11) 93412-9273</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call-to-Actions para Localização */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <a
                    href="https://maps.google.com/?q=Av.+João+Ramalho,+459+Loja+12+-+Vila+Assunção,+Santo+André+-+SP"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 sm:gap-3 bg-[#4285F4] hover:bg-[#3367D6] text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base min-h-[48px]"
                  >
                    <span className="text-lg sm:text-xl">🗺️</span>
                    Ver no Google Maps
                  </a>
                  
                  <a
                    href="https://waze.com/ul?q=Av.+João+Ramalho,+459+Loja+12+-+Vila+Assunção,+Santo+André+-+SP"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 sm:gap-3 bg-[#00D4FF] hover:bg-[#00B8E6] text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base min-h-[48px]"
                  >
                    <span className="text-lg sm:text-xl">🚗</span>
                    Abrir no Waze
                  </a>
                </div>
              </div>

              {/* Visual da Localização */}
              <div className="relative">
                <div className="bg-gradient-to-br from-[#4DD0E1]/20 to-[#26C6DA]/20 rounded-2xl p-6 sm:p-8 border border-[#4DD0E1]/30 backdrop-blur-sm">
                  <div className="text-center space-y-4 sm:space-y-6">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-[#4DD0E1] to-[#26C6DA] rounded-full flex items-center justify-center mx-auto shadow-2xl">
                      <span className="text-3xl sm:text-5xl">📍</span>
                    </div>
                    
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                        Santo André - SP
                      </h3>
                      <p className="text-[#4DD0E1] font-medium text-base sm:text-lg">
                        Vila Assunção
                      </p>
                      <p className="text-blue-100 mt-2 text-sm sm:text-base">
                        Av. João Ramalho, 459 - Loja 12
                      </p>
                    </div>

                    <div className="flex justify-center space-x-3 sm:space-x-4">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#4DD0E1] rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#4DD0E1] rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#4DD0E1] rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>

                {/* Elementos decorativos */}
                <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-[#4DD0E1] rounded-full opacity-60 animate-bounce"></div>
                <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 w-4 h-4 sm:w-6 sm:h-6 bg-[#26C6DA] rounded-full opacity-40 animate-bounce" style={{animationDelay: '1s'}}></div>
              </div>
            </div>

            {/* Destaque para Santo André */}
            <div className="mt-8 sm:mt-16 text-center">
              <div className="inline-flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm rounded-full px-6 sm:px-8 py-3 sm:py-4 border border-white/20">
                <span className="text-xl sm:text-2xl">🏙️</span>
                <span className="text-base sm:text-xl font-bold text-white">
                  Atendemos em Santo André e Região do ABC
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
