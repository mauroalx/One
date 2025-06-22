"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ExternalLink } from "lucide-react";

// Lazy load do editor para SSR-friendly (melhora o carregamento)
const RichTextEditor = dynamic(() => import("@/components/common/RichTextEditor"), { ssr: false });

const ContractsCardsCreate: React.FC = () => {
  return (
      // Rich Text Editor
      <div> 
        <RichTextEditor />
      </div>
  );
};

export default ContractsCardsCreate;
