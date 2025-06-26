

"use client";

import PlansCard from "@/components/ui/finance/plans/PlansCard";
import PlansFilterHeader from "@/components/ui/finance/plans/PlansFilterHeader";


export default function Plans() {

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6 space-y-6">
        <PlansFilterHeader />
        <PlansCard />
    </div>
  );
}
