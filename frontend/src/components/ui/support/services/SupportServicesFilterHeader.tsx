'use client';

import React, { useState } from 'react';

const technicianOptions = [
  'Carlos Lima',
  'Ana Costa',
  'Pedro Rocha',
  'Bruno Dias',
  'Fernanda Luz',
];

const serviceTypeOptions = [
  'Instalação de Fibra',
  'Manutenção de Roteador',
  'Upgrade de Plano',
  'Reparo de Fibra',
  'Instalação de Antena',
];

const SupportServicesFilterHeader: React.FC = () => {
  const [filters, setFilters] = useState({
    client: '',
    technician: '',
    status: '',
    serviceType: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearch = () => {
    // lógica de busca
    console.log(filters);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Filtrar Ordens de Serviço
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">
            Cliente
          </label>
          <input
            type="text"
            name="client"
            value={filters.client}
            onChange={handleChange}
            placeholder="Ex: João Silva"
            className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">
            Técnico
          </label>
          <select
            name="technician"
            value={filters.technician}
            onChange={handleChange}
            className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="">Todos</option>
            {technicianOptions.map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">
            Tipo de Atendimento
          </label>
          <select
            name="serviceType"
            value={filters.serviceType}
            onChange={handleChange}
            className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="">Todos</option>
            {serviceTypeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
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
            <option value="in_service">Em Serviço</option>
            <option value="rescheduled">Reagendada</option>
            <option value="completed">Concluída</option>
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

export default SupportServicesFilterHeader;
