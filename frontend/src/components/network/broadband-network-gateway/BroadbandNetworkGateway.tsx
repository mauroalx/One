

"use client";

import BroadbandNetworkGatewayBoard from "@/components/ui/network/broadband-network-gateway/BroadbandNetworkGatewayBoard";
import { useState } from "react";


export default function BroadbandNetworkGateway() {

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6 space-y-6">
        <BroadbandNetworkGatewayBoard />
    </div>
  );
}
