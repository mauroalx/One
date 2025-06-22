"use client";

import React, { useState } from "react";
import { Plus, Pencil, CalendarDays } from "lucide-react";

interface ContractModel {
  id: number;
  name: string;
  type: "PF" | "PJ" | "Customizado";
  months: number;
  createdAt: string;
  updatedAt: string;
}

const mockContracts: ContractModel[] = [
  {
    id: 1,
    name: "Contrato Padrão de Prestação de Serviços Banda Larga Residencial Ultra Plus Master Max 500MB com termos de aceite eletrônico e cláusula adicional de responsabilidade",
    type: "PF",
    months: 12,
    createdAt: "2025-06-10",
    updatedAt: "2025-06-18",
  },
  {
    id: 2,
    name: "Contrato Corporativo Avançado com SLA e Suporte Dedicado",
    type: "PJ",
    months: 24,
    createdAt: "2025-05-02",
    updatedAt: "2025-06-15",
  },
];

const ContractsCards: React.FC = () => {
  const [contracts, setContracts] = useState<ContractModel[]>(mockContracts);

  return (
    <div className="space-y-6">
      <div className="flex justify-start items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Modelos de Contratos
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {contracts.map((contract) => (
          <div
            key={contract.id}
            className="flex flex-col justify-between border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm hover:shadow-md transition h-full"
          >
            {/* Título */}
            <div className="mb-4">
              <div className="flex justify-between items-start">
                <h3
                  className="text-lg font-semibold text-gray-800 dark:text-white truncate max-w-[240px]"
                  title={contract.name}
                >
                  {contract.name}
                </h3>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    contract.type === "PF"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                      : contract.type === "PJ"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                  }`}
                >
                  {contract.type}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Período: {contract.months} meses
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-auto text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                Criado: {contract.createdAt}
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                Atualizado: {contract.updatedAt}
              </div>
            </div>

            {/* Botão */}
            <div className="mt-4 flex justify-end">
              <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-white/10 rounded-lg text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition">
                <Pencil className="w-4 h-4 text-brand-500" /> Editar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContractsCards;
// 