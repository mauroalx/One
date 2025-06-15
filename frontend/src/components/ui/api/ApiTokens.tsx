// components/ui/api/ApiTokens.tsx
"use client";

import React, { useState } from "react";
import { ArrowRight, Copy, PlusCircle, Trash2 } from "lucide-react";
import Badge from "../badge/Badge";


interface Token {
  id: number;
  label: string;
  value: string;
  createdAt: string;
  revoked: boolean;
}

const mockTokens: Token[] = [
  {
    id: 1,
    label: "Token Admin",
    value: "abc123456789xyz987654321def",
    createdAt: "2024-05-12",
    revoked: false,
  },
  {
    id: 2,
    label: "Token Público",
    value: "def098765432abc123456789ghi",
    createdAt: "2024-06-01",
    revoked: true,
  },
];

const ApiTokens: React.FC = () => {
  const [tokens, setTokens] = useState<Token[]>(mockTokens);

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  const handleRevoke = (id: number) => {
    setTokens((prev) =>
      prev.map((t) => (t.id === id ? { ...t, revoked: true } : t))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Tokens de API
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Gerencie seus tokens de autenticação
          </p>
        </div>
        <button className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
          <PlusCircle className="w-4 h-4" /> Novo Token
        </button>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-4">
        <Badge>
          Total: {tokens.length}
        </Badge>
        <Badge>
          Ativos: {tokens.filter((t) => !t.revoked).length}
        </Badge>
        <Badge>
          Revogados: {tokens.filter((t) => t.revoked).length}
        </Badge>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-800 dark:text-white">
          <thead>
            <tr className="bg-white dark:bg-white/5 text-xs font-semibold text-gray-700 dark:text-white uppercase tracking-wide border-b dark:border-gray-800">
              <th className="px-4 py-3">Identificador</th>
              <th className="px-4 py-3">Token</th>
              <th className="px-4 py-3">Criado em</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tokens.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-white/5">
                <td className="px-4 py-3 font-medium">{t.label}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs">
                      {t.value.slice(0, 6)}...{t.value.slice(-6)}
                    </span>
                    <button
                      onClick={() => handleCopy(t.value)}
                      className="text-brand-500 hover:underline"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3">{t.createdAt}</td>
                <td className="px-4 py-3">
                  <Badge
    
                  >
                    {t.revoked ? "Revogado" : "Ativo"}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  {!t.revoked && (
                    <button
                      onClick={() => handleRevoke(t.id)}
                      className="inline-flex items-center gap-1 text-sm text-red-500 hover:underline"
                    >
                      Revogar <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApiTokens;
