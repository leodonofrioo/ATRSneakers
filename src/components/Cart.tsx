import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../hooks/useCart';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export const Cart = ({ isOpen, onClose, onCheckout }: CartProps) => {
  const { items, updateQuantity, removeItem, getSubtotal, clearCart } = useCart();

  if (!isOpen) return null;

  const subtotal = getSubtotal();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Cart Panel - Flutuante na parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 w-full bg-white shadow-2xl rounded-t-3xl max-h-[80vh] overflow-hidden">
        <div className="flex flex-col max-h-[80vh]">
          {/* Header com indicador de arrastar */}
          <div className="flex flex-col items-center p-4 border-b">
            <div className="w-12 h-1 bg-gray-300 rounded-full mb-3"></div>
            <div className="flex items-center justify-between w-full">
              <h2 className="text-lg font-semibold text-[#004D62]">Seu Carrinho</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingBag className="h-16 w-16 mb-4" />
                <p className="text-lg font-medium">Carrinho vazio</p>
                <p className="text-sm">Adicione serviços para continuar</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => {
                  const TURBO_FEE = 30.00;
                  const basePrice = item.service.price;
                  const finalPrice = item.turboEnabled ? basePrice + TURBO_FEE : basePrice;
                  
                  return (
                    <div key={`${item.service.id}-${item.turboEnabled}`} className={`rounded-xl p-4 ${
                      item.turboEnabled ? 'bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200' : 'bg-[#F6F8FB]'
                    }`}>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#004D62]">{item.service.name}</h3>
                          <div className="flex items-center gap-2">
                            {item.turboEnabled ? (
                              <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                                ⚡ TURBO
                              </span>
                            ) : (
                              <span className="text-xs bg-gray-500 text-white px-2 py-1 rounded-full">
                                NORMAL
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.service.id, item.turboEnabled)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.service.id, item.turboEnabled, item.quantity - 1)}
                            className="p-1 hover:bg-white rounded-full transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.service.id, item.turboEnabled, item.quantity + 1)}
                            className="p-1 hover:bg-white rounded-full transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-semibold text-[#004D62]">
                            R$ {(finalPrice * item.quantity).toFixed(2).replace('.', ',')}
                          </div>
                          <div className="text-xs text-gray-500">
                            R$ {finalPrice.toFixed(2).replace('.', ',')} cada
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-[#004D62]">Subtotal:</span>
                <span className="text-lg font-bold text-[#004D62]">
                  R$ {subtotal.toFixed(2).replace('.', ',')}
                </span>
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={onCheckout}
                  className="w-full bg-[#FF9800] hover:bg-[#F57C00] text-white py-3 rounded-xl font-semibold transition-colors duration-200"
                >
                  Finalizar Pedido
                </button>
                
                <button
                  onClick={clearCart}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-xl font-medium transition-colors duration-200"
                >
                  Limpar Carrinho
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};