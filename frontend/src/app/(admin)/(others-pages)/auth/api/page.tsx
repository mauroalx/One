
import Api from "@/components/auth/api/Api";
import Roles from "@/components/auth/roles/Roles";
import Users from "@/components/auth/users/Users";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "One. | API",
  description:
    "",
  // other metadata
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb 
      pageTitle="API" 
        action={{
            label: "Adicionar +",
            href: "/auth/api/create",
        }}
      />
      <Api />
    </div>
  );
}
