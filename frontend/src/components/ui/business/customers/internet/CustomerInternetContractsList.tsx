"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type CustomerContract = {
  id: number;
  plan_name: string;
  login_pppoe: string;
  final_text: string;
  text_hash: string;
  signed_at: string | null;
  created_at: string;
};

export const CustomerInternetContractsList: React.FC = () => {
  const { id } = useParams();
  const [contracts, setContracts] = useState<CustomerContract[]>([]);

  useEffect(() => {
    const fetchContracts = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/v1/contract/customer/${id}`);
      const data = await res.json();
      setContracts(data);
    };

    fetchContracts();
  }, [id]);

  return (
    <div className="space-y-4">
        {/* TODO: permitir abertura do contrato em outra página, exibindo os documentos referente */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {contracts.map((contract) => (
                <div
                key={contract.id}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm min-h-[170px] flex flex-col space-y-4"
                >
                {/* Cabeçalho com título e status */}
                <div className="flex items-start justify-between">
                    <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                    Contrato #{contract.id}
                    </h2>
                    <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        contract.signed_at
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    }`}
                    >
                    {contract.signed_at ? "Assinado" : "Pendente"}
                    </span>
                </div>

                {/* Conteúdo */}
                <div className="space-y-3">
                    {/* Login e Data em linha */}
                    <div className="flex justify-between items-start gap-4">
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Login PPPoE</p>
                        <p className="text-sm font-medium text-brand-600 break-all">{contract.login_pppoe}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Criado em</p>
                        <p className="text-sm text-gray-800 dark:text-white">
                        {new Date(contract.created_at).toLocaleDateString("pt-BR")}
                        </p>
                    </div>
                    </div>
                </div>

                {/* Botão de download */}
                <div className="pt-4 mt-auto border-t border-gray-100 dark:border-gray-700">
                    <a
                    href={`${process.env.NEXT_PUBLIC_BACKEND_API}/v1/contract/${contract.id}/download`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-brand-600 hover:underline font-semibold"
                    >
                    📄 Baixar contrato (.docx)
                    </a>
                </div>

                {/* Rodapé com hash do contrato */}
                <div className="mt-2 text-xs text-gray-400 dark:text-gray-500 flex justify-between items-center">
                <span className="truncate">
                    Hash: <span className="font-mono">{contract.text_hash.slice(0, 24)}...</span>
                </span>
                <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(contract.text_hash)}
                    title="Copiar hash completo"
                    className="ml-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" fill="none"/>
                    <rect x="3" y="3" width="13" height="13" rx="2" ry="2" stroke="currentColor" fill="none"/>
                    </svg>
                </button>
                </div>
            </div>

        ))}
        </div>
    </div>
  );
};
