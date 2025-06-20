"use client";

import React, { useState } from "react";
import { Plus, Pencil, ToggleLeft, ToggleRight, Info } from "lucide-react";

interface BillingAccount {
  id: number;
  gateway: string;
  idClienteGateway: string;
  parametros: {
    juros: number;
    multa: number;
  };
  ativo: boolean;
  atualizadoEm: string;
}

const mockAccounts: BillingAccount[] = [
  {
    id: 1,
    gateway: "Asaas",
    idClienteGateway: "ASAAS-123456",
    parametros: {
      juros: 2,
      multa: 5,
    },
    ativo: true,
    atualizadoEm: "2025-06-18 14:33",
  },
  {
    id: 2,
    gateway: "Gerencianet",
    idClienteGateway: "GN-789456",
    parametros: {
      juros: 1,
      multa: 3,
    },
    ativo: false,
    atualizadoEm: "2025-06-15 09:18",
  },
];

const BillingAccountsBoard: React.FC = () => {
  const [accounts, setAccounts] = useState<BillingAccount[]>(mockAccounts);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Gerenciamento
        </h2>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-500 text-white text-sm font-medium dark:bg-gray-600 dark:hover:bg-brand-500 hover:bg-brand-600 transition">
          <Plus className="w-4 h-4" /> Nova Conta
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {accounts.map((acc) => (
          <div
            key={acc.id}
            className="flex flex-col justify-between border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-500 text-white font-bold text-lg">
                  {acc.gateway[0]}
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-800 dark:text-white">
                    {acc.gateway}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {acc.idClienteGateway}
                  </div>
                </div>
              </div>
              <div>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    acc.ativo
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                >
                  {acc.ativo ? "Ativo" : "Inativo"}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-brand-500" />
                <span>
                  Juros: <strong>{acc.parametros.juros}%</strong> | Multa: <strong>{acc.parametros.multa}%</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                Última atualização: {acc.atualizadoEm}
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-white/10 rounded-lg text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition">
                <Pencil className="w-4 h-4 text-brand-500" /> Editar
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-white/10 rounded-lg text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition">
                {acc.ativo ? (
                  <ToggleRight className="w-4 h-4 text-brand-500" />
                ) : (
                  <ToggleLeft className="w-4 h-4 text-brand-500" />
                )}
                {acc.ativo ? "Desativar" : "Ativar"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillingAccountsBoard;
