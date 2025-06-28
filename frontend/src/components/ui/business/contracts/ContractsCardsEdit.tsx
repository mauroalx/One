"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";

import { ContractFormData } from '@/components/ui/business/contracts/ContractsForm';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

// Lazy load do editor para SSR-friendly (melhora o carregamento)
const ContractsForm = dynamic(() => import("@/components/ui/business/contracts/ContractsForm"), { ssr: false });


export default function ContractsEdit({ id }: { id: string }) {
  const router = useRouter();
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialData, setInitialData] = useState<ContractFormData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/v1/contract/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error('Falha ao carregar contrato');
        const data = await res.json();

        setInitialData({
          name: data.name,
          type: data.type,
          months: String(data.months),
          content: data.content,
          status: data.status,
        });
      } catch (err) {
        console.error(err);
        alert('Erro ao buscar dados do contrato.');
        router.push('/business/contracts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, router, token]);

  const handleSubmit = async (form: ContractFormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/v1/contract/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...form,
            months: parseInt(form.months),
          }),
        }
      );

      if (!res.ok) throw new Error();

      router.push('/business/contracts');
    } catch {
      alert('Erro ao atualizar contrato.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !initialData) {
    return <div className="text-gray-700 dark:text-white">Carregando contrato...</div>;
  }

  return (
    <ContractsForm
      initialData={initialData}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
}