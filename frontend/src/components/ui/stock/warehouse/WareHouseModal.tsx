'use client';
import React from 'react';
import { Modal } from '../../modal';
import type { Dispatch, SetStateAction } from 'react';
import { Warehouse } from './WareHouseTable';


interface Props {
  editing: Warehouse | null;
  setEditing: Dispatch<SetStateAction<Warehouse | null>>;
  handleSave: () => void;
}

export default function WareHouseModal({ editing, setEditing, handleSave }: Props) {
    return (
        <Modal isOpen={!!editing} onClose={() => setEditing(null)}>
        <div className="p-6 max-w-xl mx-auto space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Editar Unidade
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">Nome</label>
                <input
                type="text"
                value={editing?.name || ""}
                onChange={(e) =>
                    setEditing((prev: any) =>
                    prev ? { ...prev, name: e.target.value } : prev
                    )
                }
                placeholder="Nome da unidade"
                className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">Cidade</label>
                <input
                type="text"
                value={editing?.city || ""}
                onChange={(e) =>
                    setEditing((prev: any) =>
                    prev ? { ...prev, city: e.target.value } : prev
                    )
                }
                placeholder="Ex: Fortaleza"
                className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">Status</label>
                <select
                value={editing?.active ? "1" : "0"}
                onChange={(e) =>
                    setEditing((prev: any) =>
                    prev ? { ...prev, active: e.target.value === "1" } : prev
                    )
                }
                className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                <option value="1">Ativa</option>
                <option value="0">Inativa</option>
                </select>
            </div>
            </div>
            <div className="flex justify-end pt-4 gap-3">
            <button
                onClick={() => setEditing(null)}
                className="h-10 px-5 text-sm font-medium text-gray-600 bg-gray-200 rounded-lg dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
            >
                Cancelar
            </button>
            <button
                onClick={handleSave}
                className="h-10 px-5 text-sm font-semibold text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition"
            >
                Salvar
            </button>
            </div>
        </div>
        </Modal>

    );
}