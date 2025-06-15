// app/(dashboard)/users/page.tsx

"use client";

import UsersFilterHeader from "@/components/ui/users/UsersFilterHeader";
import UsersTable from "@/components/ui/users/UsersTable";
import { useState } from "react";

export interface UserFilter {
  name?: string;
  email?: string;
  role?: string;
}

export default function Users() {
  const [filters, setFilters] = useState<UserFilter | null>(null);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6 space-y-6">
      <UsersFilterHeader onSearch={setFilters} />
      <UsersTable filters={filters} />
    </div>
  );
}
