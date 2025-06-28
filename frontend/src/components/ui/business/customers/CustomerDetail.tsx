// app/(dashboard)/customers/[id]/page.tsx

"use client";

import React, { useState } from "react";
import CustomerDetailGeneral from "./CustomerDetailGeneral";
import { CustomerInternetPanel } from "./internet/CustomerInternetPanel";

const tabs = [
  { key: "info", label: "Dados gerais" },
  { key: "internet", label: "Internet" },
  { key: "finance", label: "Financeiro" },
  { key: "support", label: "Atendimentos" },
];

export default function CustomerDetail({id}: { id: string }) {
  const customerId = id; // Use this ID to fetch customer data if needed
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div className="flex flex-col md:flex-row rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] min-h-[400px]">
      {/* Vertical Tabs */}
      <aside className="w-full md:w-52 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800">
        <nav className="flex md:flex-col gap-2 p-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
                className={`text-sm px-4 py-2 rounded-md text-left transition font-medium ${
                activeTab === tab.key
                    ? "bg-brand-500 text-white"
                    : "text-gray-700 dark:text-white/80 hover:bg-gray-100 dark:hover:bg-white/5"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Tab Content */}
      <main className="flex-1 p-6">
        {activeTab === "info" && (
          <div>
            {/* <h3 className="text-lg font-semibold mb-2">Informações gerais</h3> */}
            {/* Conteúdo futuro */}
            <CustomerDetailGeneral />
          </div>
        )}
        {activeTab === "internet" && (
          <div className="w-full min-w-[200px]  mx-auto">
            {/* <h3 className="text-lg font-semibold mb-2">Informações de Internet</h3> */}
            {/* Conteúdo futuro */}
            <CustomerInternetPanel />
          </div>
        )}
        {activeTab === "finance" && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Resumo Financeiro</h3>
            {/* Conteúdo futuro */}
          </div>
        )}
        {activeTab === "support" && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Atendimentos do Cliente</h3>
            {/* Conteúdo futuro */}
          </div>
        )}
      </main>
    </div>
  );
}
