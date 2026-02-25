import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Wedding } from '../types';

interface WeddingContextType {
  selectedWedding: Wedding | null;
  selectWedding: (wedding: Wedding) => void;
  clearSelection: () => void;
}

const WeddingContext = createContext<WeddingContextType | undefined>(undefined);

export const WeddingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedWedding, setSelectedWedding] = useState<Wedding | null>(null);

  const selectWedding = (wedding: Wedding) => {
    setSelectedWedding(wedding);
  };

  const clearSelection = () => {
    setSelectedWedding(null);
  };

  return (
    <WeddingContext.Provider value={{ selectedWedding, selectWedding, clearSelection }}>
      {children}
    </WeddingContext.Provider>
  );
};

export const useWedding = () => {
  const context = useContext(WeddingContext);
  if (!context) {
    throw new Error('useWedding must be used within WeddingProvider');
  }
  return context;
};
