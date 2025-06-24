"use client";

import React, { useEffect, useState } from "react";
import { Plus, Pencil, CalendarDays } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface ContractModel {
  id: number;
  name: string;
  type: string; // agora pode ser enum futuro
  months: number;
  content: string;
  status: string;
  created_at: string;
  updated_at: string;
}


const ContractsCards: React.FC = () => {
  const [contracts, setContracts] = useState<ContractModel[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/v1/contract/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Erro ao buscar contratos");
        const data = await res.json();
        setContracts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchContracts();
  }, []);

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
                Criado: {new Date(contract.created_at).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                Atualizado: {new Date(contract.updated_at).toLocaleDateString()}
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