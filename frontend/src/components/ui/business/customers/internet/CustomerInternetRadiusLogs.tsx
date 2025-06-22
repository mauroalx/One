import { CalendarDays, Search } from "lucide-react";

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
];

export const CustomerInternetRadiusLogs: React.FC = () => {
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

      {/* TABELA NATIVA */}
<div className="w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
  <table className="w-full text-sm text-left text-gray-800 dark:text-white table-fixed">
    <thead className="bg-white dark:bg-white/5 text-xs font-semibold text-gray-700 dark:text-white uppercase tracking-wide">
      <tr>
        <th className="px-4 py-3 w-[160px]">Usuário</th>
        <th className="px-4 py-3 w-[140px]">MAC</th>
        <th className="px-4 py-3 w-[160px]">Conectou</th>
        <th className="px-4 py-3 w-[160px]">Desconectou</th>
        <th className="px-4 py-3 w-[140px]">IP</th>
        <th className="px-4 py-3 w-[220px]">NAS Port</th>
        <th className="px-4 py-3 w-[140px]">NAS IP</th>
        <th className="px-4 py-3 w-[140px]">CGNAT IP</th>
        <th className="px-4 py-3 w-[100px]">Porta Início</th>
        <th className="px-4 py-3 w-[100px]">Porta Fim</th>
        <th className="px-4 py-3 w-[100px]">Protocolo</th>
        <th className="">Motivo Desc.</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
      {radiusLogs.map((log, idx) => (
        <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-white/5">
          <td className="px-4 py-3 truncate">{log.user}</td>
          <td className="px-4 py-3 truncate">{log.mac}</td>
          <td className="px-4 py-3 truncate">{log.connected}</td>
          <td className="px-4 py-3 truncate">{log.disconnected}</td>
          <td className="px-4 py-3 truncate">{log.ip}</td>
          <td className="px-4 py-3 truncate">{log.nasPort}</td>
          <td className="px-4 py-3 truncate">{log.nasIp}</td>
          <td className="px-4 py-3 truncate">{log.cgnatPublicIp}</td>
          <td className="px-4 py-3 truncate">{log.cgnatStartPort}</td>
          <td className="px-4 py-3 truncate">{log.cgnatEndPort}</td>
          <td className="px-4 py-3 truncate">{log.protocol}</td>
          <td className="">{log.disconnectReason || "-"}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};
