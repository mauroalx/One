"use client";

import ContractsCards from "@/components/ui/business/contracts/ContractsCards";
import ContractsCardsCreate from "@/components/ui/business/contracts/ContractsCardsCreate";
import React, { useState } from "react";


const ContractsCreate: React.FC = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6 space-y-6">
      <ContractsCardsCreate />
    </div>
  );
};

export default ContractsCreate;
