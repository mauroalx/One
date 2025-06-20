import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BroadbandNetworkGateway from "@/components/network/broadband-network-gateway/BroadbandNetworkGateway";
import NetworkRadiusLogs from "@/components/network/radius-logs/NetworkRadiusLogs";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "One. | Logs radius",
  description:
    "",
  // other metadata
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Logs radius" />
      <NetworkRadiusLogs />
    </div>
  );
}
