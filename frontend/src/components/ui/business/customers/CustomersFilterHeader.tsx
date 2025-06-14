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
    status: "",
    serial: "",
    login: "",
    mac: "",
    cpfcnpj: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { label: "Nome", name: "name", placeholder: "João Silva" },
        { label: "Email", name: "email", placeholder: "joao@email.com" },
        { label: "Status", name: "status", type: "select" },
        { label: "Serial", name: "serial", placeholder: "123456789" },
        { label: "Login", name: "login", placeholder: "joaosilva" },
        { label: "MAC", name: "mac", placeholder: "AA:BB:CC:DD:EE:FF" },
        { label: "CPF/CNPJ", name: "cpfcnpj", placeholder: "000.000.000-00" },
      ].map((field) => (
        <div className="flex flex-col" key={field.name}>
          <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">{field.label}</label>
          {field.type === "select" ? (
            <select
              name={field.name}
              value={(filters as any)[field.name]}
              onChange={handleChange}
              className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">Todos</option>
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
            </select>
          ) : (
            <input
              type="text"
              name={field.name}
              value={(filters as any)[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          )}
        </div>
      ))}
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
