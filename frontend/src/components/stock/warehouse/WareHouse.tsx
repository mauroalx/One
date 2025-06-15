

"use client";

import Start from "@/components/ui/stock/warehouse/Start";
import WareHouseTable from "@/components/ui/stock/warehouse/WareHouseTable";


export default function WareHouse() {

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6 space-y-6">
        {/* <WareHouseTable /> */}
        <Start />
    </div>
  );
}
