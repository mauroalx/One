

"use client";

import BillingFilterHeader from "@/components/ui/finance/billing/BillingFilterHeader";
import BillingTable from "@/components/ui/finance/billing/BillingTable";
import { useState } from "react";


export interface BillingFilter {
  customer?: string; // <- renomeado de customerId para customer
  status?: string;
  gateway?: string;
  startDate?: string;
  endDate?: string;
}


export default function Billing() {
  const [filters, setFilters] = useState<BillingFilter | null>(null);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6 space-y-6">
        <BillingFilterHeader onSearch={setFilters}/>
        <BillingTable filters={filters} />
    </div>
  );
}
