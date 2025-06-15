import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Billing from "@/components/finance/billing/Billing";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "One. | Boletos",
  description:
    "",
  // other metadata
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb 
      pageTitle="Boletos" 
      action={{
        label: "Adicionar +",
        href: "/finance/billing/create",
      }}
      />
      <Billing />
    </div>
  );
}
