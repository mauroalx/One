import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Billing from "@/components/finance/billing/Billing";
import CustomerDetail from "@/components/ui/business/customers/CustomerDetail";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "One. | Cliente",
  description:
    "",
  // other metadata
};
export default async function page({ params }: { params: { id: string } }) {
  const customerId = params.id;

  return (
    <div>
      <PageBreadcrumb pageTitle={"Cliente #" + customerId} />
      <CustomerDetail params={params}/>
    </div>
  );
}
