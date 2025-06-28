// Integração completa da página de contas de cobrança (billing accounts) com backend
"use client";

import React, { useEffect, useState } from "react";
import { Plus, Pencil, ToggleLeft, ToggleRight, Info } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import BillingAccountModal from "./BillingAccountModal";

export type BillingAccount = {
  id: number;
  name: string;
  provider: string;

  fine_percent: number;
  fine_type: 'daily' | 'monthly';

  interest_percent: number;
  interest_type: 'daily' | 'monthly';

  status: 'active' | 'inactive' | 'archived';
  created_at: string;
  updated_at: string;
};

const BillingAccountsBoard: React.FC = () => {
  const { token } = useAuth();
  const [accounts, setAccounts] = useState<BillingAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<BillingAccount | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchAccounts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/v1/finance/billing-accounts`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Erro ao buscar contas de cobrança");

      const data = await res.json();
      setAccounts(data);
    } catch (err) {
      console.error("Erro ao buscar contas de cobrança:", err);
    }
  };

  const toggleStatus = async (id: number, isActive: boolean) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/v1/finance/billing-accounts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ status: isActive ? "inactive" : "active" })
      });
      if (!res.ok) throw new Error("Erro ao atualizar status");
      fetchAccounts();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleSave = async (data: Partial<BillingAccount>) => {
    const isEdit = !!data.id;
    const method = isEdit ? "PUT" : "POST";
    const url = isEdit
      ? `${process.env.NEXT_PUBLIC_BACKEND_API}/v1/finance/billing-accounts/${data.id}`
      : `${process.env.NEXT_PUBLIC_BACKEND_API}/v1/finance/billing-accounts`;

    // Remove fields that should not be sent to the backend
    const { id, created_at, updated_at, ...payload } = data;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erro ao salvar conta");

      await fetchAccounts();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Erro ao salvar conta:", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Gerenciamento
        </h2>
        <button
          onClick={() => {
            setSelectedAccount(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-500 text-white text-sm font-medium dark:bg-gray-600 dark:hover:bg-brand-500 hover:bg-brand-600 transition"
        >
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
                  {acc.name[0].toUpperCase()}
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-800 dark:text-white">
                    {acc.name.toUpperCase()}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    #{acc.id}
                  </div>
                </div>
              </div>
              <div>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    acc.status === "active"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                >
                  {acc.status === "active" ? "Ativo" : "Inativo"}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-brand-500" />
                <span>
                  Juros: <strong>{acc.fine_percent}%</strong> | Multa: <strong>{acc.interest_percent}%</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                Última atualização: {new Date(acc.updated_at).toLocaleString()}
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => {
                  setSelectedAccount(acc);
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-white/10 rounded-lg text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition"
              >
                <Pencil className="w-4 h-4 text-brand-500" /> Editar
              </button>
              <button
                onClick={() => toggleStatus(acc.id, acc.status === "active")}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-white/10 rounded-lg text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition"
              >
                {acc.status === "active" ? (
                  <ToggleRight className="w-4 h-4 text-brand-500" />
                ) : (
                  <ToggleLeft className="w-4 h-4 text-brand-500" />
                )}
                {acc.status === "active" ? "Desativar" : "Ativar"}
              </button>
            </div>
          </div>
        ))}
      </div>

    <BillingAccountModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      billingAccount={selectedAccount ?? undefined}
      onSave={handleSave}
    />
    </div>
  );
};

export default BillingAccountsBoard;
