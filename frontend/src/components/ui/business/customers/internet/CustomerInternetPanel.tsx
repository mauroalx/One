'use client'

import { useState } from "react";
import { CustomerInternetLogins } from "./CustomerInternetLogins";
import { CustomerInternetRadiusLogs } from "./CustomerInternetRadiusLogs";
import { CustomerInternetContractsList } from "./CustomerInternetContractsList";

const internetTabs = [
  { key: "logins", label: "Logins" },
  { key: "radius", label: "Radius" },
  { key: "devices", label: "Equipamentos" },
  { key: "contracts", label: "Contratos" },
];


// Componente principal de Internet
export const CustomerInternetPanel: React.FC = () => {
  const [activeInternetTab, setActiveInternetTab] = useState("logins");

  return (
    <div className="space-y-6">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {internetTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveInternetTab(tab.key)}
            className={`px-5 py-2 text-sm font-medium transition border-b-2 -mb-px ${
              activeInternetTab === tab.key
                ? "border-brand-500 text-brand-500"
                : "border-transparent text-gray-700 dark:text-white/80 hover:text-brand-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>
        {activeInternetTab === "logins" && <CustomerInternetLogins />}
        {activeInternetTab === "radius" && <CustomerInternetRadiusLogs />}
        {activeInternetTab === "contracts" && <CustomerInternetContractsList />}
        {/* {activeInternetTab === "devices" && <CustomerInternetDevices />} */}
      </div>
    </div>
  );
};
