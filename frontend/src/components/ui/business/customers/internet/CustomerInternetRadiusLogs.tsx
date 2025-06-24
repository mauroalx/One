import React, { useState } from "react";
import { CalendarDays, Search, ChevronLeft, ChevronRight } from "lucide-react";

interface RadiusLog {
  user: string;
  mac: string;
  connected: string;
  disconnected: string;
  ip: string;
  nasPort: string;
  nasIp: string;
  cgnatPublicIp: string;
  cgnatStartPort: string;
  cgnatEndPort: string;
  protocol: string;
  disconnectReason: string;
}

const radiusLogs: RadiusLog[] = [
  {
    user: "aldeirmariadosreis",
    mac: "50:f9:58:0c:20:a7",
    connected: "2025-06-19 18:33:40",
    disconnected: "-",
    ip: "100.64.7.77",
    nasPort: "slot=0;subslot=6;port=1;vlanid=305;",
    nasIp: "164.163.178.32",
    cgnatPublicIp: "170.150.209.77",
    cgnatStartPort: "30256",
    cgnatEndPort: "31263",
    protocol: "PPP",
    disconnectReason: "",
  },
  {
    user: "aldeirmariadosreis",
    mac: "50:f9:58:0c:20:a7",
    connected: "2025-06-19 10:57:20",
    disconnected: "2025-06-19 18:30:41",
    ip: "100.64.7.77",
    nasPort: "slot=0;subslot=6;port=1;vlanid=305;",
    nasIp: "164.163.178.32",
    cgnatPublicIp: "170.150.209.77",
    cgnatStartPort: "30256",
    cgnatEndPort: "31263",
    protocol: "PPP",
    disconnectReason: "Lost-Carrier",
  },
  // aqui depois tu pode alimentar com mais registros reais
];

export const CustomerInternetRadiusLogs: React.FC = () => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const totalPages = Math.ceil(radiusLogs.length / pageSize);
  const paginatedLogs = radiusLogs.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-6">
      {/* Header de filtros */}
      <div className="flex items-center gap-4">
        <div className="relative w-72">
          <input
            type="text"
            placeholder="Buscar por usuário, IP, MAC..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-300">Período:</span>
          <input type="date" className="rounded-lg border px-3 py-1 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-sm text-gray-800 dark:text-white" />
          <span>-</span>
          <input type="date" className="rounded-lg border px-3 py-1 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-sm text-gray-800 dark:text-white" />
        </div>
      </div>

      {/* Tabela com collapse */}
      <div className="w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full text-sm text-left text-gray-800 dark:text-white">
          <thead className="bg-white dark:bg-white/5 text-xs font-semibold text-gray-700 dark:text-white uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3">Usuário</th>
              <th className="px-4 py-3">MAC</th>
              <th className="px-4 py-3">IP</th>
              <th className="px-4 py-3">NAS IP</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {paginatedLogs.map((log, idx) => {
              const realIndex = (page - 1) * pageSize + idx;
              return (
                <React.Fragment key={realIndex}>
                  <tr className="hover:bg-gray-50 dark:hover:bg-white/5">
                    <td className="px-4 py-3 font-mono text-xs">{log.user}</td>
                    <td className="px-4 py-3 font-mono text-xs">{log.mac}</td>
                    <td className="px-4 py-3 font-mono text-xs">{log.ip}</td>
                    <td className="px-4 py-3 font-mono text-xs">{log.nasIp}</td>
                    <td className="px-4 py-3 text-right">
                      <button 
                        className="text-blue-500 text-xs"
                        onClick={() => setExpandedRow(expandedRow === realIndex ? null : realIndex)}
                      >
                        {expandedRow === realIndex ? "Esconder" : "Detalhes"}
                      </button>
                    </td>
                  </tr>

                  {expandedRow === realIndex && (
                    <tr>
                      <td colSpan={5} className="px-4 py-3 bg-gray-50 dark:bg-gray-800">
                        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                          <div><b>Conectou:</b> {log.connected}</div>
                          <div><b>Desconectou:</b> {log.disconnected}</div>
                          <div><b>NAS Port:</b> {log.nasPort}</div>
                          <div><b>CGNAT IP:</b> {log.cgnatPublicIp}</div>
                          <div><b>Porta Início:</b> {log.cgnatStartPort}</div>
                          <div><b>Porta Fim:</b> {log.cgnatEndPort}</div>
                          <div><b>Protocolo:</b> {log.protocol}</div>
                          <div><b>Motivo Desc.:</b> {log.disconnectReason || "-"}</div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
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
    </div>
  );
};
