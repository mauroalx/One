"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import PlansCard from "@/components/ui/finance/plans/PlansCard";
import PlansFilterHeader from "@/components/ui/finance/plans/PlansFilterHeader";

export interface Plan {
  id: number;
  billing_account_id: number;
  name: string;
  description?: string;
  price: number;
  download_speed: number;
  upload_speed: number;
  auto_block: number;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
}

export default function Plans() {
  const { token } = useAuth();
  const [plans, setPlans] = useState<Plan[]>([]);

  const fetchPlans = async (filters: Record<string, string | number> = {}) => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "") {
        params.append(key, value.toString());
      }
    });

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/v1/finance/plans?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setPlans(data);
    } catch (err) {
      console.error("Erro ao buscar planos:", err);
    }
  };

  useEffect(() => {
    fetchPlans(); // carregar todos inicialmente
  }, []);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6 space-y-6">
      <PlansFilterHeader onSearch={fetchPlans} />
      <PlansCard plans={plans} />
    </div>
  );
}
