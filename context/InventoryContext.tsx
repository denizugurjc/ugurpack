// context/InventoryContext.tsx
import React, { createContext, useContext, useState } from "react";

export type Card = {
  id: string;
  name: string;
  image: any;
  description?: string;
  rarity: string;
  count?: number;
};

type InventoryContextType = {
  cards: Card[];
  addCard: (card: Card) => void;
};

const InventoryContext = createContext<InventoryContextType | undefined>(
  undefined
);

export const InventoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cards, setCards] = useState<Card[]>([]);

  const addCard = (newCard: Card) => {
    setCards((prev) => {
      const existing = prev.find((card) => card.id === newCard.id);
      if (existing) {
        return prev.map((card) =>
          card.id === newCard.id
            ? { ...card, count: (card.count || 1) + 1 }
            : card
        );
      } else {
        return [...prev, { ...newCard, count: 1 }];
      }
    });
  };

  return (
    <InventoryContext.Provider value={{ cards, addCard }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context)
    throw new Error("useInventory must be used within InventoryProvider");
  return context;
};
