import { useState } from 'react';
import { MapPin, Truck, CreditCard, MessageCircle } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { CustomerInfo, DeliveryInfo, PaymentInfo, OrderSummary } from '../types';

interface CheckoutFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutForm = ({ isOpen, onClose }: CheckoutFormProps) => {
  const { items, getSubtotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    email: ''
  });
  
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    type: 'pickup'
  });
  
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: 'pix'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const subtotal = getSubtotal();
  const deliveryFee = deliveryInfo.type === 'delivery' ? 15.00 : 0;
  const total = subtotal + deliveryFee;

  const validateStep = (stepNumber: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepNumber === 1) {
      if (!customerInfo.name.trim()) {
        newErrors.name = 'Nome é obrigatório';
      }
      if (!customerInfo.phone.trim()) {
        newErrors.phone = 'Telefone é obrigatório';
      } else if (!/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(customerInfo.phone)) {
        newErrors.phone = 'Formato: (11) 99999-9999';
      }
    }

    if (stepNumber === 2 && deliveryInfo.type === 'delivery') {
      if (!deliveryInfo.address?.street.trim()) {
        newErrors.street = 'Rua é obrigatória';
      }
      if (!deliveryInfo.address?.number.trim()) {
        newErrors.number = 'Número é obrigatório';
      }
      if (!deliveryInfo.address?.neighborhood.trim()) {
        newErrors.neighborhood = 'Bairro é obrigatório';
      }
      if (!deliveryInfo.address?.city.trim()) {
        newErrors.city = 'Cidade é obrigatória';
      }
      if (!deliveryInfo.address?.zipCode.trim()) {
        newErrors.zipCode = 'CEP é obrigatório';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const formatZipCode = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const generateWhatsAppMessage = (): string => {
    const orderSummary: OrderSummary = {
      items,
      subtotal,
      deliveryFee,
      total,
      customer: customerInfo,
      delivery: deliveryInfo,
      payment: paymentInfo
    };

    let message = `🧽 *PEDIDO ATR SNEAKERS* 🧽\n\n`;
    
    // Informações do cliente
    message += `👤 *Cliente:* ${orderSummary.customer.name}\n`;
    message += `📱 *Telefone:* ${orderSummary.customer.phone}\n`;
    if (orderSummary.customer.email) {
      message += `📧 *Email:* ${orderSummary.customer.email}\n`;
    }
    message += `\n`;

    // Itens do pedido
    message += `🛍️ *SERVIÇOS SOLICITADOS:*\n`;
    orderSummary.items.forEach((item, index) => {
      const TURBO_FEE = 30.00;
      const basePrice = item.service.price;
      const finalPrice = item.turboEnabled ? basePrice + TURBO_FEE : basePrice;
      
      message += `${index + 1}. ${item.service.name} (${item.turboEnabled ? 'TURBO' : 'NORMAL'})\n`;
      message += `   Quantidade: ${item.quantity}x\n`;
      message += `   Valor unitário: R$ ${finalPrice.toFixed(2).replace('.', ',')}\n`;
      message += `   Subtotal: R$ ${(finalPrice * item.quantity).toFixed(2).replace('.', ',')}\n\n`;
    });

    // Informações de entrega
    if (orderSummary.delivery.type === 'delivery') {
      message += `🚚 *ENTREGA:*\n`;
      message += `📍 Endereço: ${orderSummary.delivery.address?.street}, ${orderSummary.delivery.address?.number}\n`;
      if (orderSummary.delivery.address?.complement) {
        message += `   Complemento: ${orderSummary.delivery.address.complement}\n`;
      }
      message += `   Bairro: ${orderSummary.delivery.address?.neighborhood}\n`;
      message += `   Cidade: ${orderSummary.delivery.address?.city}\n`;
      message += `   CEP: ${orderSummary.delivery.address?.zipCode}\n`;
      message += `   Taxa de entrega: R$ ${orderSummary.deliveryFee.toFixed(2).replace('.', ',')}\n\n`;
    } else {
      message += `🏪 *RETIRADA:* No local da ATR Sneakers\n\n`;
    }

    // Resumo financeiro
    message += `💰 *RESUMO FINANCEIRO:*\n`;
    message += `   Subtotal: R$ ${orderSummary.subtotal.toFixed(2).replace('.', ',')}\n`;
    if (orderSummary.deliveryFee > 0) {
      message += `   Taxa de entrega: R$ ${orderSummary.deliveryFee.toFixed(2).replace('.', ',')}\n`;
    }
    message += `   *TOTAL: R$ ${orderSummary.total.toFixed(2).replace('.', ',')}*\n\n`;

    // Forma de pagamento
    message += `💳 *PAGAMENTO:* ${orderSummary.payment.method === 'pix' ? 'PIX' : 'Link de Pagamento'}\n\n`;

    message += `✨ Obrigado por escolher a ATR Sneakers! ✨`;

    return message;
  };

  const handleSendWhatsApp = () => {
    if (!validateStep(3)) return;

    const message = generateWhatsAppMessage();
    const phoneNumber = '5511934129273';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    clearCart();
    onClose();
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    setErrors({});
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Form Panel */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-[#004D62]">Finalizar Pedido</h2>
            <div className="flex mt-4 space-x-2">
              {[1, 2, 3].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`flex-1 h-2 rounded-full ${
                    stepNumber <= step ? 'bg-[#4DD0E1]' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Step 1: Informações do Cliente */}
          {step === 1 && (
            <div className="p-6">
              <h3 className="text-lg font-semibold text-[#004D62] mb-4">Suas Informações</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#4DD0E1] focus:border-transparent ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Digite seu nome completo"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone (WhatsApp) *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ 
                      ...customerInfo, 
                      phone: formatPhoneNumber(e.target.value) 
                    })}
                    className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#4DD0E1] focus:border-transparent ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="(11) 99999-9999"
                    maxLength={15}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email (opcional)
                  </label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4DD0E1] focus:border-transparent"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Entrega */}
          {step === 2 && (
            <div className="p-6">
              <h3 className="text-lg font-semibold text-[#004D62] mb-4">Entrega</h3>
              
              {/* Tipo de Entrega */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setDeliveryInfo({ type: 'pickup' })}
                  className={`p-4 border-2 rounded-xl flex flex-col items-center space-y-2 transition-colors ${
                    deliveryInfo.type === 'pickup'
                      ? 'border-[#4DD0E1] bg-[#4DD0E1]/10'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <MapPin className="h-8 w-8 text-[#004D62]" />
                  <span className="font-medium">Retirada</span>
                  <span className="text-sm text-gray-600">Grátis</span>
                </button>

                <button
                  onClick={() => setDeliveryInfo({ type: 'delivery' })}
                  className={`p-4 border-2 rounded-xl flex flex-col items-center space-y-2 transition-colors ${
                    deliveryInfo.type === 'delivery'
                      ? 'border-[#4DD0E1] bg-[#4DD0E1]/10'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Truck className="h-8 w-8 text-[#004D62]" />
                  <span className="font-medium">Delivery</span>
                  <span className="text-sm text-gray-600">R$ 15,00</span>
                </button>
              </div>

              {/* Endereço (se delivery) */}
              {deliveryInfo.type === 'delivery' && (
                <div className="space-y-4">
                  <h4 className="font-medium text-[#004D62]">Endereço de Entrega</h4>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rua *</label>
                      <input
                        type="text"
                        value={deliveryInfo.address?.street || ''}
                        onChange={(e) => setDeliveryInfo({
                          ...deliveryInfo,
                          address: { ...deliveryInfo.address!, street: e.target.value }
                        })}
                        className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#4DD0E1] focus:border-transparent ${
                          errors.street ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Nome da rua"
                      />
                      {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Número *</label>
                      <input
                        type="text"
                        value={deliveryInfo.address?.number || ''}
                        onChange={(e) => setDeliveryInfo({
                          ...deliveryInfo,
                          address: { ...deliveryInfo.address!, number: e.target.value }
                        })}
                        className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#4DD0E1] focus:border-transparent ${
                          errors.number ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="123"
                      />
                      {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Complemento</label>
                    <input
                      type="text"
                      value={deliveryInfo.address?.complement || ''}
                      onChange={(e) => setDeliveryInfo({
                        ...deliveryInfo,
                        address: { ...deliveryInfo.address!, complement: e.target.value }
                      })}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4DD0E1] focus:border-transparent"
                      placeholder="Apartamento, bloco, etc."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bairro *</label>
                      <input
                        type="text"
                        value={deliveryInfo.address?.neighborhood || ''}
                        onChange={(e) => setDeliveryInfo({
                          ...deliveryInfo,
                          address: { ...deliveryInfo.address!, neighborhood: e.target.value }
                        })}
                        className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#4DD0E1] focus:border-transparent ${
                          errors.neighborhood ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Nome do bairro"
                      />
                      {errors.neighborhood && <p className="text-red-500 text-sm mt-1">{errors.neighborhood}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cidade *</label>
                      <input
                        type="text"
                        value={deliveryInfo.address?.city || ''}
                        onChange={(e) => setDeliveryInfo({
                          ...deliveryInfo,
                          address: { ...deliveryInfo.address!, city: e.target.value }
                        })}
                        className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#4DD0E1] focus:border-transparent ${
                          errors.city ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Nome da cidade"
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CEP *</label>
                    <input
                      type="text"
                      value={deliveryInfo.address?.zipCode || ''}
                      onChange={(e) => setDeliveryInfo({
                        ...deliveryInfo,
                        address: { ...deliveryInfo.address!, zipCode: formatZipCode(e.target.value) }
                      })}
                      className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#4DD0E1] focus:border-transparent ${
                        errors.zipCode ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="00000-000"
                      maxLength={9}
                    />
                    {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Pagamento e Resumo */}
          {step === 3 && (
            <div className="p-6">
              <h3 className="text-lg font-semibold text-[#004D62] mb-4">Pagamento e Resumo</h3>
              
              {/* Forma de Pagamento */}
              <div className="mb-6">
                <h4 className="font-medium text-[#004D62] mb-3">Forma de Pagamento</h4>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setPaymentInfo({ method: 'pix' })}
                    className={`p-4 border-2 rounded-xl flex flex-col items-center space-y-2 transition-colors ${
                      paymentInfo.method === 'pix'
                        ? 'border-[#4DD0E1] bg-[#4DD0E1]/10'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <CreditCard className="h-8 w-8 text-[#004D62]" />
                    <span className="font-medium">PIX</span>
                  </button>

                  <button
                    onClick={() => setPaymentInfo({ method: 'link' })}
                    className={`p-4 border-2 rounded-xl flex flex-col items-center space-y-2 transition-colors ${
                      paymentInfo.method === 'link'
                        ? 'border-[#4DD0E1] bg-[#4DD0E1]/10'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <MessageCircle className="h-8 w-8 text-[#004D62]" />
                    <span className="font-medium">Link de Pagamento</span>
                  </button>
                </div>
              </div>

              {/* Resumo do Pedido */}
              <div className="bg-[#F6F8FB] rounded-xl p-4 mb-6">
                <h4 className="font-medium text-[#004D62] mb-3">Resumo do Pedido</h4>
                
                {items.map((item) => {
                  const TURBO_FEE = 30.00;
                  const basePrice = item.service.price;
                  const finalPrice = item.turboEnabled ? basePrice + TURBO_FEE : basePrice;
                  
                  return (
                    <div key={`${item.service.id}-${item.turboEnabled}`} className="flex justify-between items-center py-2">
                      <div>
                        <span className="font-medium">{item.service.name}</span>
                        <span className="text-sm text-gray-600 ml-2">
                          ({item.turboEnabled ? 'TURBO' : 'NORMAL'}) x{item.quantity}
                        </span>
                      </div>
                      <span className="font-medium">
                        R$ {(finalPrice * item.quantity).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  );
                })}
                
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between items-center py-1">
                    <span>Subtotal:</span>
                    <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  
                  {deliveryFee > 0 && (
                    <div className="flex justify-between items-center py-1">
                      <span>Taxa de entrega:</span>
                      <span>R$ {deliveryFee.toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center py-2 font-bold text-lg border-t">
                    <span>Total:</span>
                    <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="p-6 border-t flex justify-between">
            <div className="flex space-x-3">
              {step > 1 && (
                <button
                  onClick={prevStep}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Voltar
                </button>
              )}
              
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>

            {step < 3 ? (
              <button
                onClick={nextStep}
                className="px-8 py-2 bg-[#4DD0E1] hover:bg-[#26C6DA] text-white rounded-xl font-semibold transition-colors"
              >
                Próximo
              </button>
            ) : (
              <button
                onClick={handleSendWhatsApp}
                className="px-8 py-2 bg-[#FF9800] hover:bg-[#F57C00] text-white rounded-xl font-semibold transition-colors flex items-center space-x-2"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Enviar pelo WhatsApp</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};