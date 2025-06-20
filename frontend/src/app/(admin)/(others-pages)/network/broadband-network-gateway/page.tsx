import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BroadbandNetworkGateway from "@/components/network/broadband-network-gateway/BroadbandNetworkGateway";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "One. | Concentradores",
  description:
    "",
  // other metadata
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Concentradores" />
      <BroadbandNetworkGateway />
    </div>
  );
}
