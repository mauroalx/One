"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight, Save, Search, PlusCircle } from "lucide-react";
import { permissions } from "@/utils/core"

const RoleCreate: React.FC = () => {
  const [form, setForm] = useState({ name: "", isActive: true });
  const [acl, setAcl] = useState<{ [key: string]: { [key: string]: boolean } }>({});
  const [collapsed, setCollapsed] = useState<{ [key: string]: boolean }>({});
  const [search, setSearch] = useState("");

  const handleCheckbox = (group: string, permission: string, checked: boolean) => {
    setAcl((prev) => ({
      ...prev,
      [group]: {
        ...(prev[group] || {}),
        [permission]: checked,
      },
    }));
  };

  const toggleCollapse = (groupKey: string) => {
    setCollapsed((prev) => ({ ...prev, [groupKey]: !prev[groupKey] }));
  };

  const handleSave = () => {
    console.log("Salvar:", { form, acl });
  };

  const filteredPermissions = permissions.filter((group) => {
    if (!search.trim()) return true;
    const matchGroup = group.groupLabel.toLowerCase().includes(search.toLowerCase());
    const matchAnyAction = group.actions.some((action) =>
      action.label.toLowerCase().includes(search.toLowerCase())
    );
    return matchGroup || matchAnyAction;
  });

  return (
    <div className="space-y-6">
      {/* Container principal */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.03] p-6 space-y-10">
      {/* Header com botão de salvar no novo padrão */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Perfil de acesso
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Configure as permissões de acesso por módulo.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium text-white bg-brand-500 rounded-lg dark:bg-gray-600 hover:bg-brand-600  dark:hover:bg-brand-500 transition"
        >
          <Save className="w-4 h-4" /> &nbsp;Salvar perfil
        </button>
      </div>
       
        {/* Configurações Gerais */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-white">Nome da Role</label>
          <input
            type="text"
            placeholder="Ex: Administrador, Comercial, Financeiro..."
            autoComplete="off"
            autoCapitalize="off"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-sm text-gray-800 dark:text-white shadow-sm"
          />
        </div>

        {/* Filtro de permissões */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-white">Buscar Permissões</label>
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Digite para filtrar..."
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-sm text-gray-800 dark:text-white shadow-sm"
            />
            <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Permissões */}
        <div className="space-y-6">
          {filteredPermissions.map((group) => (
            <div key={group.groupKey} className="rounded-xl border border-gray-200 dark:border-gray-700">
              <div
                className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-white/5 cursor-pointer select-none"
                onClick={() => toggleCollapse(group.groupKey)}
              >
                <h4 className="font-semibold text-gray-800 dark:text-white">{group.groupLabel}</h4>
                {collapsed[group.groupKey] ? (
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </div>
              {!collapsed[group.groupKey] && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-4 bg-white dark:bg-gray-900">
                  {group.actions
                    .filter((action) =>
                      action.label.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((action) => (
                      <label
                        key={action.key}
                        className="flex items-center gap-3 rounded-lg border border-gray-300 dark:border-gray-700 p-3 bg-gray-50 dark:bg-white/5 transition hover:shadow-sm cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          name={action.key}
                          style={{ accentColor: 'var(--brand-500)' }}
                          checked={acl[group.groupKey]?.[action.key] || false}
                          onChange={(e) => handleCheckbox(group.groupKey, action.key, e.target.checked)}
                          className="h-5 w-5 rounded border-gray-300 dark:border-gray-600 text-brand-500 focus:ring-2 focus:ring-brand-500"
                        />
                        <span style={{ outline: '2px solid var(--brand-500)' }} className="text-sm text-gray-700 dark:text-white">{action.label}</span>
                      </label>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleCreate;
