import { TurboToggle } from './TurboToggle';

export const Header = () => {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Layout Mobile: Logo à esquerda, Turbo à direita */}
        <div className="flex justify-between items-center h-32 md:hidden">
          {/* Logo à esquerda no mobile */}
          <div className="flex items-center">
            <img 
              src="/Logo ATR.svg" 
              alt="ATR Sneakers" 
              className="h-20 w-auto"
            />
          </div>

          {/* Turbo Toggle à direita no mobile */}
          <div className="flex items-center">
            <TurboToggle />
          </div>
        </div>

        {/* Layout Desktop: Logo centralizado */}
        <div className="hidden md:flex justify-between items-center h-32">
          {/* Espaço à esquerda para balanceamento */}
          <div className="flex items-center gap-4 w-48">
            {/* Espaço vazio para balancear o layout */}
          </div>

          {/* Logo Centralizado no desktop */}
          <div className="flex-1 flex justify-center">
            <div className="flex items-center">
              <img 
                src="/Logo ATR.svg" 
                alt="ATR Sneakers" 
                className="h-32 w-auto"
              />
            </div>
          </div>

          {/* Controles à direita no desktop */}
          <div className="flex items-center gap-4 w-48 justify-end">
            <TurboToggle />
          </div>
        </div>
      </div>
    </header>
  );
};