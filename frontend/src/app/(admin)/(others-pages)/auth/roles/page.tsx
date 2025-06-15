
import Roles from "@/components/auth/roles/Roles";
import Users from "@/components/auth/users/Users";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "One. | Perfis de acesso",
  description:
    "",
  // other metadata
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb 
      pageTitle="Perfis de acesso" 
        action={{
            label: "Adicionar +",
            href: "/auth/roles/create",
        }}
      />
      <Roles />
    </div>
  );
}
