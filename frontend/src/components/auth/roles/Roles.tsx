// app/(dashboard)/users/page.tsx

"use client";


import RolesTable from "@/components/ui/roles/RolesTable";
import { useState } from "react";


export default function Roles() {

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6 space-y-6">
        <RolesTable />
    </div>
  );
}
