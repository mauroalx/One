import CustomersCreate from "@/components/business/customers/CustomerCreate";
import Customers from "@/components/business/customers/Customers";
import Calendar from "@/components/calendar/Calendar";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "One. | Clientes",
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
        { label: "Clientes", href: "/business/customers" },
        // { label: "João da Silva", href: "/customers/1" }
      ]}
      />
      <CustomersCreate />
    </div>
  );
}
