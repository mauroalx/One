import ContractsEdit from "@/components/business/contracts/ContractsEdit";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Billing from "@/components/finance/billing/Billing";
import CustomerDetail from "@/components/ui/business/customers/CustomerDetail";
import PlansEdit from "@/components/ui/finance/plans/PlansEdit";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "One. | Contratos",
  description:
    "",
  // other metadata
};

export default async function page({ params }: { params: { id: string } }) {

  return (
    <div>
      <PageBreadcrumb 
      pageTitle="Editar" 
      parents={[
        { label: "Contratos", href: "/business/contracts" },
        // { label: "João da Silva", href: "/customers/1" }
      ]}
      />
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6 space-y-6">
        <ContractsEdit id={params.id} />
      </div>
    </div>
  );
}
