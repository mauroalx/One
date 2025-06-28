'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useParams } from 'next/navigation';

type Plan = { id: number; name: string };
type Contract = { id: number; name: string };

type CustomerInternetLoginCreateProps = {
  onCancel: () => void;
  onSuccess: () => void;
};

export const CustomerInternetLoginCreate: React.FC<CustomerInternetLoginCreateProps> = ({
  onCancel,
  onSuccess,
}) => {
  const { token } = useAuth();
  const { id: customerId } = useParams();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [plansRes, contractsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/v1/finance/plans`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/v1/contract`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        const plansData = await plansRes.json();
        const contractsData = await contractsRes.json();
        setPlans(plansData);
        setContracts(contractsData);
      } catch (err) {
        console.error('Erro ao carregar planos e contratos:', err);
      }
    };

    fetchOptions();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      customer_id: Number(customerId),
      plan_id: Number(form.plan_id.value),
      contract_id: Number(form.contract_id.value),
      login_pppoe: form.login_pppoe.value,
      password_pppoe: form.password_pppoe.value,
      subscriber_password: form.subscriber_password.value,
      description: form.description.value || null,
      status: form.status.value,
    };

    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/v1/customer/services`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Erro ao criar serviço');
      onSuccess();
    } catch (err) {
      console.error('Erro ao criar serviço:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onCancel}
          className="flex items-center text-sm font-medium text-gray-600 dark:text-white hover:text-brand-500 transition"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Voltar
        </button>
        {/* <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Novo serviço de internet</h2> */}
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Dados técnicos */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">Dados técnicos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="plan_id" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Plano</label>
              <select
                name="plan_id"
                id="plan_id"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value="">Selecione...</option>
                {plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>{plan.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="contract_id" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Contrato base</label>
              <select
                name="contract_id"
                id="contract_id"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value="">Selecione...</option>
                {contracts.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Autenticação PPPoE */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">Autenticação PPPoE</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="login_pppoe" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Login PPPoE</label>
              <input
                type="text"
                name="login_pppoe"
                id="login_pppoe"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="password_pppoe" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Senha PPPoE</label>
              <input
                type="password"
                name="password_pppoe"
                id="password_pppoe"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="subscriber_password" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Senha do Assinante</label>
              <input
                type="password"
                name="subscriber_password"
                id="subscriber_password"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Status</label>
              <select
                name="status"
                id="status"
                defaultValue="active"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value="active">Ativo</option>
                <option value="suspended">Suspenso</option>
                <option value="canceled">Cancelado</option>
              </select>
            </div>
          </div>
        </div>

        {/* Observações */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Observações (opcional)</label>
          <textarea
            name="description"
            id="description"
            rows={3}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 transition"
          >
            {loading ? 'Salvando...' : 'Criar serviço'}
          </button>
        </div>
      </form>
    </div>
  );
};
