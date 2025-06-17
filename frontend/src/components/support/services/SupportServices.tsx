

"use client";

import SupportServiceDetailsDrawer from "@/components/ui/support/services/SupportServiceDetailsDrawer";
import SupportServiceCardGrid from "@/components/ui/support/services/SupportServicesCardGrid";
import SupportServicesFilterHeader from "@/components/ui/support/services/SupportServicesFilterHeader";

export default function SupportServices() {

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6 ">
      <SupportServicesFilterHeader />
      <SupportServiceCardGrid />
    </div>
  );
}
