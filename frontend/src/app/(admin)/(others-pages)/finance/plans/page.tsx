import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Billing from "@/components/finance/billing/Billing";
import Plans from "@/components/finance/plans/Plans";
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
      pageTitle="Planos de internet" 
      action={{
        label: "Adicionar +",
        href: "/finance/plans/create",
      }}
      />
      <Plans />
    </div>
  );
}
