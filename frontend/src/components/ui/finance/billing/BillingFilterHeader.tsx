// components/business/billing/BillingFilterHeader.tsx
"use client";

import { BillingFilter } from "@/components/finance/billing/Billing";
import React, { useState } from "react";


interface Props {
  onSearch: (filters: BillingFilter) => void;
}

const BillingFilterHeader: React.FC<Props> = ({ onSearch }) => {
  const [filters, setFilters] = useState<BillingFilter>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">
          Código do Cliente
        </label>
        <input
          type="text"
          name="customerId"
          placeholder="Ex: 12345"
          value={filters.customer || ""}
          onChange={handleChange}
          className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">
          Status
        </label>
        <select
          name="status"
          value={filters.status || ""}
          onChange={handleChange}
          className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="">Todos</option>
          <option value="paid">Pago</option>
          <option value="pending">Pendente</option>
          <option value="overdue">Vencido</option>
          <option value="cancelled">Cancelado</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">
          Fonte
        </label>
        <select
          name="gateway"
          value={filters.gateway || ""}
          onChange={handleChange}
          className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="">Todos</option>
          <option value="1">Gerencianet</option>
          <option value="2">Asaas</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">
          Data Inicial
        </label>
        <input
          type="date"
          name="startDate"
          value={filters.startDate || ""}
          onChange={handleChange}
          className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">
          Data Final
        </label>
        <input
          type="date"
          name="endDate"
          value={filters.endDate || ""}
          onChange={handleChange}
          className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      <div className="flex items-end">
        <button
          onClick={() => onSearch(filters)}
          className="h-10 w-full px-6 text-sm font-semibold text-white bg-brand-500 rounded-lg dark:bg-gray-600 hover:bg-brand-600 transition"
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default BillingFilterHeader;
