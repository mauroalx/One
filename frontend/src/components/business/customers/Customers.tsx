"use client";
import CustomersFilterHeader from "@/components/ui/business/customers/CustomersFilterHeader";
import CustomersTable from "@/components/ui/business/customers/CustomersTable";
import React, { useState } from "react";

export interface CustomerFilter {
  name: string;
  email: string;
  cpfcnpj: string;

  // futuros:
  // status?: string;
  // serial?: string;
  // login?: string;
  // mac?: string;
}

const Customers: React.FC = () => {
  const [filters, setFilters] = useState<CustomerFilter | null>(null);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6 space-y-6">
      <CustomersFilterHeader onSearch={setFilters} />
      <CustomersTable filters={filters} />
    </div>
  );
};

export default Customers;
