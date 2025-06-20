

"use client";

import NetworkRadiusLogsList from "@/components/ui/network/radius-logs/NetworkRadiusLogs";
import { useState } from "react";


export default function NetworkRadiusLogs() {

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6 space-y-6">
        <NetworkRadiusLogsList />
    </div>
  );
}
