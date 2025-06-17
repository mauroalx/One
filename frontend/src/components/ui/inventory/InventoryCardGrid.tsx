// InventoryCardGrid.tsx
'use client';

import React, { useState } from 'react';
import InventoryCard from './InventoryCard';

const allItems = [
  { id: 1, name: 'ONU FiberXP', category: 'Equipamentos', quantity: 50, location: 'Matriz', unit: 'unidades' },
  { id: 2, name: 'Cabo Óptico 100m', category: 'Cabo de Fibra', quantity: 20, location: 'Filial Fortaleza', unit: 'rolo' },
  { id: 3, name: 'Furadeira Bosch', category: 'Ferramentas', quantity: 5, location: 'Filial Sobral', unit: 'unidades' },
  { id: 4, name: 'Splitter 1x8', category: 'Equipamentos', quantity: 100, location: 'Matriz', unit: 'peças' },
  { id: 5, name: 'Caixa de Emenda', category: 'Equipamentos', quantity: 35, location: 'Matriz', unit: 'unidades' },
  { id: 6, name: 'Roteador TP-Link', category: 'Roteadores', quantity: 40, location: 'Filial Fortaleza', unit: 'unidades' },
];

export default function InventoryCardGrid() {
  const [visibleCount, setVisibleCount] = useState(3);
  const visibleItems = allItems.slice(0, visibleCount);

  return (
    <div className="space-y-6 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {visibleItems.map((item) => (
          <InventoryCard key={item.id} item={item} />
        ))}
      </div>

      {visibleCount < allItems.length && (
        <div className="flex justify-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 3)}
            className="px-6 py-2 rounded-lg text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Carregar mais
          </button>
        </div>
      )}
    </div>
  );
}
