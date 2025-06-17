"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  MessageCircleWarningIcon,
} from "lucide-react";
import { BillingFilter } from "@/components/finance/billing/Billing";
import { Tooltip } from "../../tooltip/Tooltip";


interface BillingItem {
  id: number;
  customer: string;
  dueDate: string;
  status: "pago" | "pendente" | "vencido" | "cancelado";
  amount: number;
  gateway: string;
}

interface Props {
  filters: BillingFilter | null;
}

const mockBillings: BillingItem[] = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  customer: `Cliente ${i + 1}`,
  dueDate: "2025-06-14",
  status: i % 4 === 0 ? "pago" : i % 4 === 1 ? "pendente" : i % 4 === 2 ? "vencido" : "cancelado",
  amount: 49.9 + i,
  gateway: i % 2 === 0 ? "Asaas" : "Gerencianet",
}));

const ITEMS_PER_PAGE = 7;

const BillingTable: React.FC<Props> = ({ filters }) => {
  const [results, setResults] = useState<BillingItem[]>([]);
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof BillingItem>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const filtered = mockBillings.filter((item) =>
    Object.entries(filters ?? {}).every(([key, value]) => {
        if (!value) return true;
        if (key === "status") return item.status === value;
        if (key === "gateway") return item.gateway === value;
        if (key === "customer") return item.customer.toLowerCase().includes(value.toLowerCase());
        return true;
    })
    );
    setResults(filtered);
    setPage(1);
  }, [filters]);

  const sorted = [...results].sort((a, b) => {
    const valA = a[sortKey];
    const valB = b[sortKey];
    if (typeof valA === "number" && typeof valB === "number") {
      return sortOrder === "asc" ? valA - valB : valB - valA;
    }
    return sortOrder === "asc"
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  const paginated = sorted.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);

  const toggleSort = (key: keyof BillingItem) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const statusColor = {
    pago: "sucess",
    pendente: "light",
    vencido: "warning",
    cancelado: "error",
  };

  return (
    <div className="space-y-6 py-4">
      {results.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-800 dark:text-white">
              <thead>
                <tr className="bg-white dark:bg-white/5 text-xs font-semibold text-gray-700 dark:text-white uppercase tracking-wide border-b dark:border-gray-800">
                  <th
                    className="px-4 py-3 cursor-pointer select-none"
                    onClick={() => toggleSort("id")}
                  >
                    <div className="inline-flex items-center gap-1">
                      Código {sortKey === "id" && (sortOrder === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                    </div>
                  </th>
                  <th className="px-4 py-3">Cliente</th>
                  <th className="px-4 py-3">Vencimento</th>
                  <th className="px-4 py-3">Valor</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Gateway</th>
                  <th className="px-4 py-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {paginated.map((b) => (
                  <tr
                    key={b.id}
                    className="hover:bg-gray-50 dark:hover:bg-white/5"
                  >
                    <td className="px-4 py-3">{b.id}</td>
                    <td className="px-4 py-3">{b.customer}</td>
                    <td className="px-4 py-3">{b.dueDate}</td>
                    <td className="px-4 py-3">{formatCurrency(b.amount)}</td>
                    <td className={'px-4 py-3 capitalize font-medium  ' + statusColor[b.status]}>
                        <Tooltip message="Pago com sucesso">
                          <CheckCircle2 color="green"/>
                        </Tooltip>
                        {/* <MessageCircleWarningIcon /> */}
                    </td>
                    <td className="px-4 py-3">{b.gateway}</td>
                    <td className="px-4 py-3 text-right">
                      <button className="inline-flex items-center gap-1 text-sm font-medium text-brand-500 hover:underline">
                        Ver <ArrowRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-2 pt-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Página {page} de {totalPages}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400 px-2">
          {Object.keys(filters ?? {}).length > 0 ? "Nenhuma remessa encontrada." : "Use o filtro acima."}
        </p>
      )}
    </div>
  );
};

export default BillingTable;
