"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

interface Role {
  id: number;
  name: string;
  userCount: number;
  permissions: string[];
  isDefault?: boolean;
}

const mockRoles: Role[] = [
  {
    id: 1,
    name: "Administrador",
    userCount: 3,
    permissions: ["clientes:ver", "clientes:editar", "usuarios:ver", "usuarios:editar"],
    isDefault: true,
  },
  {
    id: 2,
    name: "Suporte",
    userCount: 5,
    permissions: ["clientes:ver", "chamados:ver"],
  },
  {
    id: 3,
    name: "Financeiro",
    userCount: 2,
    permissions: ["boletos:ver", "boletos:editar"],
  },
];

const RolesTable: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    setRoles(mockRoles);
  }, []);

  return (
    <div className="space-y-6 py-4">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-800 dark:text-white">
          <thead>
            <tr className="bg-white dark:bg-white/5 text-xs font-semibold text-gray-700 dark:text-white uppercase tracking-wide border-b dark:border-gray-800">
              <th className="px-4 py-3">Código</th>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Usuários</th>
              <th className="px-4 py-3">Permissões</th>
              <th className="px-4 py-3 text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {roles.map((role) => (
              <tr key={role.id} className="hover:bg-gray-50 dark:hover:bg-white/5">
                <td className="px-4 py-3">{role.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {role.name}
                    {role.isDefault && (
                      <span className="text-xs bg-brand-500/10 text-brand-700 dark:text-brand-300 px-2 py-0.5 rounded-full">
                        Padrão do sistema
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">{role.userCount}</td>
                <td className="px-4 py-3">
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {role.permissions.length} permissões
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="inline-flex items-center gap-1 text-sm font-medium text-brand-500 hover:underline">
                    Ver
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RolesTable;
