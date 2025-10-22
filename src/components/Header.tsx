import { useState } from 'react';

export const Header = () => {
  const [logoSrc, setLogoSrc] = useState('/Logo ATR.svg');
  const [logoError, setLogoError] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);

  const handleLogoError = () => {
    console.log('Logo error for path:', logoSrc);
    
    if (logoSrc === '/Logo ATR.svg') {
      console.log('Trying /public/Logo ATR.svg');
      setLogoSrc('/public/Logo ATR.svg');
    } else if (logoSrc === '/public/Logo ATR.svg') {
      console.log('Trying ./Logo ATR.svg');
      setLogoSrc('./Logo ATR.svg');
    } else if (logoSrc === './Logo ATR.svg') {
      console.log('Trying ./public/Logo ATR.svg');
      setLogoSrc('./public/Logo ATR.svg');
    } else {
      console.log('All logo paths failed, using text fallback');
      setLogoError(true);
    }
  };

  const handleLogoLoad = () => {
    console.log('Logo loaded successfully:', logoSrc);
    setLogoLoaded(true);
  };

  return (
    <header className="bg-gradient-to-b from-white to-white/0 min-h-[120px] max-h-[200px] h-[clamp(120px,16vw,200px)] flex items-center justify-center px-4">
      {/* Apenas o logo centralizado */}
      <div className="flex items-center justify-center">
        {!logoError ? (
          <img 
            src={logoSrc}
            alt="ATR Logo" 
            className={`h-32 w-auto transition-all duration-300 ${
              logoLoaded ? 'opacity-100' : 'opacity-0'
            } filter brightness-110 contrast-110 drop-shadow-sm hover:drop-shadow-md`}
            style={{
              filter: 'brightness(1.1) contrast(1.1) drop-shadow(0 1px 2px rgba(0,0,0,0.1))',
              WebkitFilter: 'brightness(1.1) contrast(1.1) drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
            }}
            onError={handleLogoError}
            onLoad={handleLogoLoad}
          />
        ) : (
          <div className="h-32 flex items-center justify-center px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-4xl rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            ATR
          </div>
        )}
      </div>
    </header>
  );
};