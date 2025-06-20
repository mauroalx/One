"use client";

import React, { useState } from "react";
import { Plus, Pencil, Settings, Trash2, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

interface GatewayItem {
  id: number;
  name: string;
  ipAddress: string;
  vendor: string;
  status: "online" | "degraded" | "offline";
}

const mockGateways: GatewayItem[] = [
  { id: 1, name: "NAS Principal", ipAddress: "192.168.10.1", vendor: "Mikrotik", status: "online" },
  { id: 2, name: "Backup POP-1", ipAddress: "192.168.20.1", vendor: "Huawei NE8K", status: "online" },
  { id: 3, name: "NAS POP Centro", ipAddress: "10.10.0.1", vendor: "Juniper", status: "degraded" },
  { id: 4, name: "Infra Edge B", ipAddress: "172.16.5.1", vendor: "Huawei NE8K", status: "online" },
  { id: 5, name: "Roteador CGNAT", ipAddress: "100.64.0.1", vendor: "Mikrotik", status: "offline" },
  { id: 6, name: "POP Zona Leste", ipAddress: "192.168.30.1", vendor: "Mikrotik", status: "online" },
  { id: 7, name: "Core Backup", ipAddress: "10.0.0.2", vendor: "Juniper", status: "online" },
  { id: 8, name: "Edge West", ipAddress: "172.16.6.1", vendor: "Huawei NE8K", status: "degraded" },
  { id: 9, name: "POP Extra", ipAddress: "192.168.40.1", vendor: "Mikrotik", status: "offline" },
  { id: 10, name: "Infra Backup 2", ipAddress: "172.16.7.1", vendor: "Juniper", status: "online" },
];

const ITEMS_PER_PAGE = 6;

const BroadbandNetworkGatewayBoard: React.FC = () => {
  const [gateways] = useState<GatewayItem[]>(mockGateways);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const loadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const statusBadge = (status: GatewayItem["status"]) => {
    switch (status) {
      case "online":
        return (
          <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-2 py-1 rounded-full text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" /> Online
          </div>
        );
      case "degraded":
        return (
          <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded-full text-xs font-semibold">
            <AlertTriangle className="w-4 h-4" /> Degradado
          </div>
        );
      case "offline":
        return (
          <div className="flex items-center gap-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 px-2 py-1 rounded-full text-xs font-semibold">
            <XCircle className="w-4 h-4" /> Offline
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center">
        {/* <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Concentradores (NAS)</h2> */}
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-500 text-white text-sm font-medium dark:bg-gray-600 dark:hover:bg-brand-500 hover:bg-brand-600 transition">
          <Plus className="w-4 h-4" /> Novo NAS
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {gateways.slice(0, visibleCount).map((gateway) => (
          <div
            key={gateway.id}
            className="flex flex-col justify-between border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-500 text-white text-lg font-bold">
                  {gateway.name.charAt(0)}
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-800 dark:text-white">
                    {gateway.name}
                  </div>
                  <div className="mt-1 flex gap-2 text-xs font-medium">
                    <span className="bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white px-2 py-1 rounded-full">
                      {gateway.vendor}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {gateway.ipAddress}
                  </div>
                </div>
              </div>
              {statusBadge(gateway.status)}
            </div>

            <div className="mt-4 flex justify-start gap-2">
              <button className="flex items-center gap-1 px-3 py-2 bg-gray-100 dark:bg-white/10 rounded-lg text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition">
                <Pencil className="w-4 h-4 text-brand-500" /> Editar
              </button>
              {/* <button className="flex items-center gap-1 px-3 py-2 bg-gray-100 dark:bg-white/10 rounded-lg text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition">
                <Settings className="w-4 h-4 text-brand-500" /> Monitorar
              </button> */}
              <button className="flex items-center gap-1 px-3 py-2 bg-red-100 dark:bg-red-900 rounded-lg text-sm font-medium text-red-800 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-700 transition">
                <Trash2 className="w-4 h-4" /> Remover
              </button>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < gateways.length && (
        <div className="flex justify-center">
          <button onClick={loadMore} className="px-6 py-2 rounded-lg text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition">
            Carregar mais
          </button>
        </div>
      )}
    </div>
  );
};

export default BroadbandNetworkGatewayBoard;
