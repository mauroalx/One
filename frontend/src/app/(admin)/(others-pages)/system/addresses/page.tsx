import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import SystemAddresses from "@/components/system/addresses/SystemAddresses";


import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "One. | Endereços do sistema",
  description:
    "",
  // other metadata
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb 
      pageTitle="Endereços do sistema" 
      />
      <SystemAddresses />
    </div>
  );
}
