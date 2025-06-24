"use client";
import { CustomerFilter } from "@/components/business/customers/Customers";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface Props {
  filters: CustomerFilter | null;
}

interface Customer {
  id: number;
  full_name: string;
  document: string;
  email: string;
  // Campos mockados que não existem ainda:
  login?: string;
  serial?: string;
  mac?: string;
  status?: string;
}

const ITEMS_PER_PAGE = 7;
type SortKey = keyof Customer;

const CustomersTable: React.FC<Props> = ({ filters }) => {
  const [results, setResults] = useState<Customer[]>([]);
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const { token } = useAuth();

  const fetchData = async () => {
    try {
      const query = new URLSearchParams();

      if (filters?.name) query.append("full_name", filters.name);
      if (filters?.email) query.append("email", filters.email);
      if (filters?.cpfcnpj) query.append("document", filters.cpfcnpj);

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/v1/customer/?${query.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
      });

      if (!res.ok) throw new Error("Erro ao buscar clientes");

      const data: Customer[] = await res.json();
      setResults(data);
      setPage(1);
    } catch (err) {
      console.error("Erro ao buscar:", err);
      setResults([]);
    }
  };

  useEffect(() => {
    if (filters) {
      fetchData();
    }
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

  const paginated = sorted.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="space-y-6 py-4">
      {results.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-800 dark:text-white">
              <thead>
                <tr className="bg-white dark:bg-white/5 text-xs font-semibold text-gray-700 dark:text-white uppercase tracking-wide border-b dark:border-gray-800">
                  <th className="px-4 py-3 cursor-pointer select-none" onClick={() => toggleSort("id")}>
                    <div className="inline-flex items-center gap-1">
                      Código {sortKey === "id" ? (sortOrder === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />) : null}
                    </div>
                  </th>
                  <th className="px-4 py-3 cursor-pointer select-none" onClick={() => toggleSort("full_name")}>
                    <div className="inline-flex items-center gap-1">
                      Nome {sortKey === "full_name" ? (sortOrder === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />) : null}
                    </div>
                  </th>
                  <th className="px-4 py-3">CPF/CNPJ</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {paginated.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-white/5">
                    <td className="px-4 py-3">{c.id}</td>
                    <td className="px-4 py-3">{c.full_name}</td>
                    <td className="px-4 py-3">{c.document}</td>
                    <td className="px-4 py-3">{c.email}</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => { window.location.href = `/business/customers/${c.id}` }} className="inline-flex items-center gap-1 text-sm font-medium text-brand-500 hover:underline">
                        Ver
                        <ArrowRight className="w-4 h-4" />
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
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400 px-2">
          {filters ? "Nenhum cliente encontrado." : "Use o filtro acima."}
        </p>
      )}
    </div>
  );
};

export default CustomersTable;
