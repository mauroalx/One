import Contracts from "@/components/business/contracts/Contracts";
import ContractsCreate from "@/components/business/contracts/ContractsCreate";
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
      pageTitle="Adicionar" 
      parents={[
        { label: "Contratos", href: "/business/contracts" },
        // { label: "João da Silva", href: "/customers/1" }
      ]}
      />
      <ContractsCreate />
    </div>
  );
}
