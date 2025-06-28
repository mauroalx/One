"use client";

import ContractsCards from "@/components/ui/business/contracts/ContractsCards";
import ContractsCardsCreate from "@/components/ui/business/contracts/ContractsCardsCreate";
import ContractsCardsEdit from "@/components/ui/business/contracts/ContractsCardsEdit";
import React, { useState } from "react";


interface ContractsEditProps {
  id: string;
}

const ContractsEdit: React.FC<ContractsEditProps> = ({ id }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6 space-y-6">
      <ContractsCardsEdit id={id} />
    </div>
  );
};

export default ContractsEdit;
