// InventoryCard.tsx
'use client';

import React from 'react';
import { Package, MapPin, Layers3, Boxes } from 'lucide-react';

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  location: string;
  unit: string;
}

interface Props {
  item: InventoryItem;
}

const InventoryCard: React.FC<Props> = ({ item }) => {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
          ID #{item.id}
        </div>
        <div className="text-xs px-3 py-1 rounded-full font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
          {item.category}
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-800 dark:text-white">
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-brand-500" />
          <span className="font-semibold">{item.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Boxes className="w-4 h-4 text-brand-500" />
          <span>{item.quantity} {item.unit}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-brand-500" />
          <span>{item.location}</span>
        </div>
      </div>
    </div>
  );
};

export default InventoryCard;
