"use client";

import React, { useState } from "react";

export interface UserFilter {
  name?: string;
  email?: string;
  role?: string;
}

interface Props {
  onSearch: (filters: UserFilter) => void;
}

const UsersFilterHeader: React.FC<Props> = ({ onSearch }) => {
  const [filters, setFilters] = useState<UserFilter>({
    name: "",
    email: "",
    role: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[
        { label: "Nome", name: "name", placeholder: "Ana Souza" },
        { label: "Email", name: "email", placeholder: "ana@email.com" },
      ].map((field) => (
        <div className="flex flex-col" key={field.name}>
          <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">{field.label}</label>
          <input
            type="text"
            name={field.name}
            value={filters[field.name as keyof UserFilter] || ""}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
      ))}

      {/* Select de Role */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">Perfil de acesso</label>
        <select
          name="role"
          value={filters.role || ""}
          onChange={handleChange}
          className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          <option value="">Todos</option>
          <option value="admin">Administrador</option>
          <option value="user">Usuário</option>
          <option value="support">Suporte</option>
        </select>
      </div>

      {/* Botão Buscar */}
      <div className="flex items-end">
        <button
          onClick={handleSearch}
          className="h-10 w-full px-6 text-sm font-semibold text-white bg-brand-500 rounded-lg dark:bg-gray-600 hover:bg-brand-600 dark:hover:bg-brand-500 transition"
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default UsersFilterHeader;
