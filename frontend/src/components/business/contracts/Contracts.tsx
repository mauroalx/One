"use client";

import ContractsCards from "@/components/ui/business/contracts/ContractsCards";
import React, { useState } from "react";


const Contracts: React.FC = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6 space-y-6">
      <ContractsCards />
    </div>
  );
};

export default Contracts;
