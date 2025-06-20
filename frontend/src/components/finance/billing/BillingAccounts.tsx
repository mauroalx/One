

"use client";

import BillingAccountsBoard from "@/components/ui/finance/billing/BillingAccountsBoard";
import { useState } from "react";


export default function BillingAccounts() {

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6 space-y-6">
        <BillingAccountsBoard />
    </div>
  );
}
