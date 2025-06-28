'use client';

import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PlansForm, { PlanFormValues } from './PlansForm';

export default function PlansCreate() {
  const { token } = useAuth();
  const router = useRouter();

  const [billingAccounts, setBillingAccounts] = useState<{ id: number; name: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/v1/finance/billing-accounts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setBillingAccounts(data);
      } catch (err) {
        console.error("Erro ao buscar contas de cobrança:", err);
      }
    };

    fetchAccounts();
  }, [token]);

  const handleSubmit = async (form: PlanFormValues) => {
    setIsSubmitting(true);
    const payload = {
      ...form,
      billing_account_id: Number(form.billing_account_id),
      price: parseFloat(form.price),
      download_speed: parseInt(form.download_speed),
      upload_speed: parseInt(form.upload_speed),
      auto_block: parseInt(form.auto_block),
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/v1/finance/plans`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Erro ao criar plano');

      router.push('/finance/plans');
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <PlansForm
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      billingAccounts={billingAccounts}
    />
  );
}
