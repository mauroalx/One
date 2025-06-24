"use client";
import { CustomerFilter } from "@/components/business/customers/Customers";
import React, { useState } from "react";

interface Props {
  onSearch: (filters: CustomerFilter) => void;
}

const CustomersFilterHeader: React.FC<Props> = ({ onSearch }) => {
  const [filters, setFilters] = useState<CustomerFilter>({
    name: "",
    email: "",
    cpfcnpj: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">Nome</label>
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleChange}
          placeholder="João Silva"
          className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">Email</label>
        <input
          type="text"
          name="email"
          value={filters.email}
          onChange={handleChange}
          placeholder="joao@email.com"
          className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">CPF/CNPJ</label>
        <input
          type="text"
          name="cpfcnpj"
          value={filters.cpfcnpj}
          onChange={handleChange}
          placeholder="000.000.000-00"
          className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      <div className="flex items-end">
        <button
          onClick={handleSearch}
          className="h-10 w-full px-6 text-sm font-semibold text-white bg-brand-500 rounded-lg dark:bg-gray-600 hover:bg-brand-600 transition"
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default CustomersFilterHeader;
