"use client";

import React, { useState } from "react";
import { PlusCircle, Trash2, CheckCircle2, MapPin, Pencil, CheckCircle, XCircle } from "lucide-react";
import Badge from "../../badge/Badge";
import { Modal } from "../../modal";
import WareHouseModal from "./WareHouseModal";

export interface Warehouse {
  id: number;
  name: string;
  city: string;
  createdAt: string;
  active: boolean;
}

const mockWarehouses: Warehouse[] = [
  {
    id: 1,
    name: "Unidade Central",
    city: "São Paulo",
    createdAt: "2024-05-12",
    active: true,
  },
  {
    id: 2,
    name: "Unidade Regional",
    city: "Recife",
    createdAt: "2024-06-01",
    active: false,
  },
];

const WarehouseTable: React.FC = () => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>(mockWarehouses);
  const [editing, setEditing] = useState<Warehouse | null>(null);

  const handleDeactivate = (id: number) => {
    setWarehouses((prev) =>
      prev.map((w) => (w.id === id ? { ...w, active: false } : w))
    );
  };

  const handleReactivate = (id: number) => {
    setWarehouses((prev) =>
      prev.map((w) => (w.id === id ? { ...w, active: true } : w))
    );
  };

  const handleSave = () => {
    if (!editing) return;
    setWarehouses((prev) =>
      prev.map((w) => (w.id === editing.id ? editing : w))
    );
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Unidades de Estoque
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Gerencie os centros de armazenamento e suas localidades.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
          <PlusCircle className="w-4 h-4" /> Nova Unidade
        </button>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-4">
        <Badge>Total: {warehouses.length}</Badge>
        <Badge>Ativas: {warehouses.filter((w) => w.active).length}</Badge>
        <Badge>Inativas: {warehouses.filter((w) => !w.active).length}</Badge>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-800 dark:text-white">
          <thead>
            <tr className="bg-white dark:bg-white/5 text-xs font-semibold text-gray-700 dark:text-white uppercase tracking-wide border-b dark:border-gray-800">
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Cidade</th>
              <th className="px-4 py-3">Materiais</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {warehouses.map((w) => (
              <tr key={w.id} className="hover:bg-gray-50 dark:hover:bg-white/5">
                <td className="px-4 py-3 font-medium text-brand-500 hover:underline cursor-pointer">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  {w.name}
                </td>
                <td className="px-4 py-3">{w.city}</td>
                <td className="px-4 py-3">0</td>
                <td className="px-4 py-3">
                  <Badge>{w.active ? "Ativa" : "Inativa"}</Badge>
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button
                    onClick={() => setEditing(w)}
                    className="text-blue-500 hover:underline inline-flex items-center gap-1"
                  >
                    <Pencil className="w-4 h-4" /> 
                  </button>
                  {w.active ? (
                    <button
                      onClick={() => handleDeactivate(w.id)}
                      className="text-red-500 hover:underline inline-flex items-center gap-1"
                    >
                      <XCircle className="w-4 h-4" /> 
                    </button>
                  ) : (
                    <button
                      onClick={() => handleReactivate(w.id)}
                      className="text-green-600 hover:underline inline-flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-4 h-4" /> 
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Edição */}
      <WareHouseModal
        editing={editing}
        setEditing={setEditing}
        handleSave={handleSave}
      />
    </div>
  );
};

export default WarehouseTable;
