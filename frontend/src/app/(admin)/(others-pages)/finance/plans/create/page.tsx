import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Billing from "@/components/finance/billing/Billing";
import Plans from "@/components/finance/plans/Plans";
import PlansCreate from "@/components/ui/finance/plans/PlansCreate";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "One. | Planos de internet",
  description:
    "",
  // other metadata
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb 
      pageTitle="Adicionar" 
      parents={[
        { label: "Planos de internet", href: "/finance/plans" },
        // { label: "João da Silva", href: "/customers/1" }
      ]}
      />
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6 space-y-6">
        <PlansCreate />
      </div>
    </div>
  );
}
