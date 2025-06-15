
import Users from "@/components/auth/users/Users";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "One. | Usuários",
  description:
    "",
  // other metadata
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb 
      pageTitle="Usuários" 
      action={{
        label: "Adicionar +",
        href: "/users/create",
      }}
      />
      <Users />
    </div>
  );
}
