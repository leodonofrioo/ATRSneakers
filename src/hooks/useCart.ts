import { useState, useEffect } from 'react';
import { CartItem, Service } from '../types';

const CART_STORAGE_KEY = 'atr-cart';

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Carregar itens do localStorage na inicialização
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
      }
    }
  }, []);

  // Salvar no localStorage sempre que os itens mudarem
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (service: Service, turboEnabled: boolean = false) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.service.id === service.id && item.turboEnabled === turboEnabled
      );

      if (existingItem) {
        return prevItems.map(item =>
          item.service.id === service.id && item.turboEnabled === turboEnabled
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { service, turboEnabled, quantity: 1 }];
    });
  };

  const removeItem = (serviceId: string, turboEnabled: boolean) => {
    setItems(prevItems =>
      prevItems.filter(
        item => !(item.service.id === serviceId && item.turboEnabled === turboEnabled)
      )
    );
  };

  const updateQuantity = (serviceId: string, turboEnabled: boolean, quantity: number) => {
    if (quantity <= 0) {
      removeItem(serviceId, turboEnabled);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.service.id === serviceId && item.turboEnabled === turboEnabled
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    const TURBO_FEE = 30.00;
    return items.reduce((total, item) => {
      const basePrice = item.service.price;
      const finalPrice = item.turboEnabled ? basePrice + TURBO_FEE : basePrice;
      return total + (finalPrice * item.quantity);
    }, 0);
  };

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemCount,
    getSubtotal
  };
};