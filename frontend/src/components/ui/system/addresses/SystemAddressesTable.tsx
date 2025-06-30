// [1] EXTRAÇÃO COMPLETA: FilterHeader (já feito)
// [2] EXTRAÇÃO: Tabela com paginação
// src/components/ui/system/addresses/SystemAddressesTable.tsx

import React from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Address } from "@/components/system/addresses/SystemAddresses";

interface Props {
  addresses: Address[];
  page: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  onEdit: (item: any) => void;
}

const SystemAddressesTable: React.FC<Props> = ({ addresses, page, pageSize = 5, onPageChange, onEdit }) => {
  const totalPages = Math.ceil(addresses.length / pageSize);
  const paginated = addresses.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-800 dark:text-white">
          <thead>
            <tr className="bg-white dark:bg-white/5 text-xs font-semibold text-gray-700 dark:text-white uppercase tracking-wide border-b dark:border-gray-800">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Cidade</th>
              <th className="px-4 py-3">Bairro</th>
              <th className="px-4 py-3">Rua</th>
              <th className="px-4 py-3 text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {paginated.map((address) => (
              <tr key={address.id} className="hover:bg-gray-50 dark:hover:bg-white/5">
                <td className="px-4 py-3">{address.id}</td>
                <td className="px-4 py-3">{address.state}</td>
                <td className="px-4 py-3">{address.city}</td>
                <td className="px-4 py-3">{address.district}</td>
                <td className="px-4 py-3">{address.name}</td>
                <td className="px-4 py-3 text-right">
                <button
                onClick={() => onEdit?.(address)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                Editar
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2 pt-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">Página {page} de {totalPages}</span>
          <div className="flex gap-1">
            <button
              onClick={() => onPageChange(Math.max(1, page - 1))}
              disabled={page === 1}
              className="p-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onPageChange(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SystemAddressesTable;
