import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Billing from "@/components/finance/billing/Billing";
import BillingAccounts from "@/components/finance/billing/BillingAccounts";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "One. | Contas de cobrança",
  description:
    "",
  // other metadata
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Contas de cobrança" />
      <BillingAccounts />
    </div>
  );
}
