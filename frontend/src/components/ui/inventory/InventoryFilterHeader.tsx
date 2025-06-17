// InventoryFilterHeader.tsx
'use client';

import React, { useState } from 'react';

const categoryOptions = ['Equipamentos', 'Ferramentas', 'Cabo de Fibra', 'Roteadores'];
const locationOptions = ['Matriz', 'Filial Fortaleza', 'Filial Sobral'];

const InventoryFilterHeader: React.FC = () => {
  const [filters, setFilters] = useState({
    name: '',
    category: '',
    location: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearch = () => {
    console.log(filters);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Filtrar Itens do Almoxarifado
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">
            Nome do Item
          </label>
          <input
            type="text"
            name="name"
            value={filters.name}
            onChange={handleChange}
            placeholder="Ex: ONU FiberXP"
            className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">
            Categoria
          </label>
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="">Todas</option>
            {categoryOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">
            Localização
          </label>
          <select
            name="location"
            value={filters.location}
            onChange={handleChange}
            className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="">Todas</option>
            {locationOptions.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={handleSearch}
            className="h-10 w-full px-6 text-sm font-semibold text-white bg-brand-500 rounded-lg dark:bg-gray-700 hover:bg-brand-600 dark:hover:bg-gray-600 transition"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryFilterHeader;