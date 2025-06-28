// components/ui/finance/plans/PlansFilterHeader.tsx
'use client';

import React, { useState } from 'react';

interface PlansFilterHeaderProps {
  onSearch: (filters: {
    name: string;
    status: string;
    minDownload: string;
    maxPrice: string;
  }) => void;
}

const PlansFilterHeader: React.FC<PlansFilterHeaderProps> = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    name: '',
    status: '',
    minDownload: '',
    maxPrice: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearch = () => {
    onSearch(filters); // envia para o componente pai
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm space-y-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
        Filtros
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">
            Nome do Plano
          </label>
          <input
            type="text"
            name="name"
            value={filters.name}
            onChange={handleChange}
            placeholder="Ex: Plano Turbo"
            className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">
            Status
          </label>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="">Todos</option>
            <option value="active">Ativo</option>
            <option value="inactive">Desativado</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">
            Mínimo de Download (Mb)
          </label>
          <input
            type="number"
            name="minDownload"
            value={filters.minDownload}
            onChange={handleChange}
            placeholder="Ex: 200"
            className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">
            Preço Máximo (R$)
          </label>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="Ex: 100"
            className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={handleSearch}
          className="h-10 px-6 text-sm font-semibold text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition"
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default PlansFilterHeader;
