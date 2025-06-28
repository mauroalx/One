'use client';

import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PlansForm, { PlanFormValues } from './PlansForm';

export default function PlansEdit({id}: { id: string }) {
  const { token } = useAuth();
  const router = useRouter();


  const [formData, setFormData] = useState<PlanFormValues | null>(null);
  const [billingAccounts, setBillingAccounts] = useState<{ id: number; name: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [planRes, billingRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/v1/finance/plans/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/v1/finance/billing-accounts`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const plan = await planRes.json();
        const accounts = await billingRes.json();

        setFormData({
          billing_account_id: String(plan.billing_account_id),
          name: plan.name,
          description: plan.description || '',
          price: String(plan.price),
          download_speed: String(plan.download_speed),
          upload_speed: String(plan.upload_speed),
          auto_block: String(plan.auto_block),
          status: plan.status,
        });

        setBillingAccounts(accounts);
      } catch (err) {
        console.error('Erro ao carregar dados do plano:', err);
      }
    };

    fetchData();
  }, [id, token]);

  const handleUpdate = async (form: PlanFormValues) => {
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/v1/finance/plans/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Erro ao atualizar plano');

      router.push('/finance/plans');
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  if (!formData) {
    return <div className="text-gray-600 dark:text-white">Carregando...</div>;
  }

  return (
    <PlansForm
      initialData={formData}
      onSubmit={handleUpdate}
      isSubmitting={isSubmitting}
      billingAccounts={billingAccounts}
    />
  );
}
