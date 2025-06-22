import Contracts from "@/components/business/contracts/Contracts";
import Customers from "@/components/business/customers/Customers";
import Calendar from "@/components/calendar/Calendar";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "One. | Contratos",
  description:
    "",
  // other metadata
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb 
      pageTitle="Contratos"
      action={{
        label: "Adicionar +",
        href: "/business/contracts/create",
      }}
       />
      <Contracts />
    </div>
  );
}
