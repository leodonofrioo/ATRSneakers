import React, { useState } from 'react';

interface ServiceAnimationProps {
  serviceCategory: 'lavagem' | 'protecao' | 'renovacao' | 'reconstrucao';
  isHovered: boolean;
}

export const ServiceAnimation = ({ serviceCategory, isHovered }: ServiceAnimationProps) => {
  const getAnimationContent = () => {
    switch (serviceCategory) {
      case 'lavagem':
        return (
          <div className="relative w-full h-32 overflow-hidden rounded-xl bg-gradient-to-br from-cyan-50 to-cyan-100">
            {/* Tênis Base */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`relative transition-all duration-1000 ${isHovered ? 'transform scale-110' : ''}`}>
                {/* Tênis Shape */}
                <div className={`w-20 h-12 rounded-full transition-all duration-1000 ${
                  isHovered 
                    ? 'bg-white shadow-lg border-2 border-cyan-200' 
                    : 'bg-gradient-to-r from-gray-700 to-gray-800'
                }`}>
                  {/* Detalhes do tênis */}
                  <div className={`absolute top-2 left-3 w-3 h-3 rounded-full transition-all duration-1000 ${
                    isHovered ? 'bg-cyan-500' : 'bg-gray-600'
                  }`}></div>
                  <div className={`absolute top-4 left-6 w-8 h-1 rounded transition-all duration-1000 ${
                    isHovered ? 'bg-gray-200' : 'bg-gray-500'
                  }`}></div>
                </div>
                
                {/* Bolhas de limpeza */}
                {isHovered && (
                  <>
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-cyan-300 rounded-full animate-bounce opacity-70"
                        style={{
                          left: `${15 + i * 7}px`,
                          top: `${10 + (i % 3) * 8}px`,
                          animationDelay: `${i * 0.1}s`,
                          animationDuration: '1s'
                        }}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
            
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
              <span className="text-xs font-medium text-gray-600">
                {isHovered ? '🧽 Limpo!' : '🦠 Sujo'}
              </span>
            </div>
          </div>
        );
        
      case 'protecao':
        return (
          <div className="relative w-full h-32 overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-blue-100">
            {/* Tênis Base */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`relative transition-all duration-1000 ${isHovered ? 'transform scale-110' : ''}`}>
                {/* Tênis Shape */}
                <div className={`w-20 h-12 rounded-full transition-all duration-1000 ${
                  isHovered 
                    ? 'bg-white shadow-lg border-2 border-blue-200' 
                    : 'bg-gradient-to-r from-gray-600 to-gray-700'
                }`}>
                  {/* Detalhes do tênis */}
                  <div className={`absolute top-2 left-3 w-3 h-3 rounded-full transition-all duration-1000 ${
                    isHovered ? 'bg-blue-500' : 'bg-gray-500'
                  }`}></div>
                  <div className={`absolute top-4 left-6 w-8 h-1 rounded transition-all duration-1000 ${
                    isHovered ? 'bg-gray-200' : 'bg-gray-400'
                  }`}></div>
                </div>
                
                {/* Gotas de proteção */}
                {isHovered && (
                  <>
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-70"
                        style={{
                          left: `${20 + i * 8}px`,
                          top: `${15 + (i % 2) * 10}px`,
                          animationDelay: `${i * 0.1}s`,
                          animationDuration: '0.8s'
                        }}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
            
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
              <span className="text-xs font-medium text-gray-600">
                {isHovered ? '🛡️ Protegido!' : '💧 Vulnerável'}
              </span>
            </div>
          </div>
        );
        
      case 'renovacao':
        return (
          <div className="relative w-full h-32 overflow-hidden rounded-xl bg-gradient-to-br from-green-50 to-green-100">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`relative transition-all duration-1500 ${isHovered ? 'transform scale-110' : ''}`}>
                {/* Tênis Shape */}
                <div className={`w-20 h-12 rounded-full transition-all duration-1500 ${
                  isHovered 
                    ? 'bg-white shadow-xl' 
                    : 'bg-gradient-to-r from-yellow-700 to-yellow-800'
                }`}>
                  {/* Detalhes do tênis */}
                  <div className={`absolute top-2 left-3 w-3 h-3 rounded-full transition-all duration-1500 ${
                    isHovered ? 'bg-green-500' : 'bg-yellow-600'
                  }`}></div>
                  <div className={`absolute top-4 left-6 w-8 h-1 rounded transition-all duration-1500 ${
                    isHovered ? 'bg-gray-200' : 'bg-yellow-500'
                  }`}></div>
                  
                  {/* Efeito de renovação */}
                  {isHovered && (
                    <div className="absolute inset-0 bg-white opacity-0 rounded-full animate-pulse"></div>
                  )}
                </div>
                
                {/* Ondas de renovação */}
                {isHovered && (
                  <>
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute inset-0 border-2 border-green-300 rounded-full opacity-0 animate-ping"
                      ></div>
                    ))}
                  </>
                )}
              </div>
            </div>
            
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
              <span className="text-xs font-medium text-gray-600">
                {isHovered ? '✨ Renovado!' : '🟡 Amarelado'}
              </span>
            </div>
          </div>
        );
        
      case 'reconstrucao':
        return (
          <div className="relative w-full h-32 overflow-hidden rounded-xl bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`relative transition-all duration-2000 ${isHovered ? 'transform scale-110' : ''}`}>
                {/* Tênis Shape */}
                <div className={`w-20 h-12 rounded-full transition-all duration-2000 ${
                  isHovered 
                    ? 'bg-gradient-to-r from-purple-100 to-purple-200 shadow-2xl' 
                    : 'bg-gradient-to-r from-gray-800 to-gray-900'
                }`}>
                  {/* Detalhes do tênis */}
                  <div className={`absolute top-2 left-3 w-3 h-3 rounded-full transition-all duration-2000 ${
                    isHovered ? 'bg-purple-400 shadow-md' : 'bg-gray-600'
                  }`}></div>
                  <div className={`absolute top-4 left-6 w-8 h-1 rounded transition-all duration-2000 ${
                    isHovered ? 'bg-purple-200 shadow-sm' : 'bg-gray-500'
                  }`}></div>
                  
                  {/* Efeito de reconstrução */}
                  {isHovered && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 rounded-full animate-pulse"></div>
                      <div className="absolute -top-1 -left-1 w-22 h-14 border border-purple-200 rounded-full opacity-50 animate-pulse"></div>
                    </>
                  )}
                </div>
                
                {/* Partículas de reconstrução */}
                {isHovered && (
                  <>
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-purple-400 rounded-full animate-bounce opacity-70"
                        style={{
                          left: `${15 + i * 6}px`,
                          top: `${10 + (i % 3) * 8}px`,
                          animationDelay: `${i * 0.15}s`,
                          animationDuration: '1.2s'
                        }}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
            
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
              <span className="text-xs font-medium text-gray-600">
                {isHovered ? '🔧 Reconstruído!' : '💔 Danificado'}
              </span>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="mb-4">
      {getAnimationContent()}
      

    </div>
  );
};