
import RolesCreate from "@/components/auth/roles/create/RolesCreate";
import Roles from "@/components/auth/roles/Roles";
import Users from "@/components/auth/users/Users";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import RoleCreate from "@/components/ui/roles/RoleCreate";
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
      pageTitle="Adicionar" 
      parents={[
        { label: "Perfis de acesso", href: "/auth/roles" },
        // { label: "João da Silva", href: "/customers/1" }
      ]}
      />
      <RoleCreate />
    </div>
  );
}
