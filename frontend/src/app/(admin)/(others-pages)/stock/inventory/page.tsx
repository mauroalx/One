
import Api from "@/components/auth/api/Api";
import Roles from "@/components/auth/roles/Roles";
import Users from "@/components/auth/users/Users";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Inventory from "@/components/inventory/Inventory";
import WareHouse from "@/components/stock/warehouse/WareHouse";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "One. | Inventário",
  description:
    "",
  // other metadata
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb 
      pageTitle="Inventário"
        action={{
            label: "Adicionar +",
            href: "/stock/inventory/create",
        }}        
       />
      <Inventory />
    </div>
  );
}
