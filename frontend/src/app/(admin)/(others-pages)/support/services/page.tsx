import PageBreadcrumb from "@/components/common/PageBreadCrumb";

import SupportServices from "@/components/support/services/SupportServices";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "One. | Ordens de serviço",
  description:
    "",
  // other metadata
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb 
      pageTitle="Ordens de serviço" 
      action={{
        label: "Adicionar +",
        href: "/calendar",
      }}
      />
      <SupportServices />
    </div>
  );
}
