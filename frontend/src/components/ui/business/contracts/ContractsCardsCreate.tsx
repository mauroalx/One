"use client";

import React from "react";
import dynamic from "next/dynamic";

import { ContractFormData } from '@/components/ui/business/contracts/ContractsForm';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

// Lazy load do editor para SSR-friendly (melhora o carregamento)
const ContractsForm = dynamic(() => import("@/components/ui/business/contracts/ContractsForm"), { ssr: false });


export default function ContractsCardsCreate() {
  const { token } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: ContractFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/v1/contract/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...data, months: parseInt(data.months), status: 'draft' }),
      });

      if (!res.ok) throw new Error();

      router.push('/business/contracts');
    } catch {
      alert('Erro ao criar contrato.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return <ContractsForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
}


