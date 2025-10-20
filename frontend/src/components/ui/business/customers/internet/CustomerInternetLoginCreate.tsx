'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, ArrowRight, CheckCircle, Cog, Lock, MapPin } from 'lucide-react';

import { useAuth } from '@/context/AuthContext';
import { useCustomToast } from '@/hooks/useCustomToast';

type Plan = { id: number; name: string };
type Contract = { id: number; name: string };

const schema = z.object({
  plan_id: z.coerce.number().refine((val) => typeof val === 'number' && !isNaN(val), {
    message: 'Campo obrigatório',
  }),
  contract_id: z.coerce.number().refine((val) => typeof val === 'number' && !isNaN(val), {
    message: 'Campo obrigatório',
  }),
  login_pppoe: z.string().min(1, { message: 'Campo obrigatório' }),
  password_pppoe: z.string().min(1, { message: 'Campo obrigatório' }),
  subscriber_password: z.string().min(1, { message: 'Campo obrigatório' }),
  status: z.string().min(1, { message: 'Campo obrigatório' }),
  address: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export const CustomerInternetLoginCreate = ({
  onCancel,
  onSuccess,
}: {
  onCancel: () => void;
  onSuccess: () => void;
}) => {
  const { token } = useAuth();
  const { id: customerId } = useParams();
  const { showToast } = useCustomToast();

  const [plans, setPlans] = useState<Plan[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchData = async () => {
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
        console.error('Erro ao buscar dados:', err);
      }
    };

    fetchData();
  }, [token]);

  const steps = [
    { title: 'Dados Técnicos', icon: <Cog className="w-4 h-4" /> },
    { title: 'Autenticação', icon: <Lock className="w-4 h-4" /> },
    { title: 'Endereço', icon: <MapPin className="w-4 h-4" /> },
    { title: 'Confirmação', icon: <CheckCircle className="w-4 h-4" /> },
  ];

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (formData: FormData) => {
    try {
      setLoading(true);
      const payload = { customer_id: Number(customerId), ...formData };

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/v1/customer/services`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Erro na requisição');

      showToast('Serviço criado com sucesso!', 'success');
      onSuccess();
    } catch (err) {
      console.error(err);
      showToast('Erro ao criar serviço', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Topo */}
      <div className="flex items-center gap-3">
        <button onClick={onCancel} className="flex items-center text-sm text-gray-600 dark:text-white hover:text-brand-500">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Voltar
        </button>
      </div>

      {/* Stepper */}
      <div className="w-full flex items-center justify-between gap-0 pb-6">
        {steps.map((s, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center w-full max-w-[100px] shrink-0">
              <div
                className={`w-9 h-9 flex items-center justify-center rounded-full border-2 z-10
                ${index === step
                    ? 'bg-brand-500 text-white border-brand-500'
                    : index < step
                      ? 'bg-green-500 text-white border-green-500'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-500 border-gray-300 dark:border-gray-600'}`}
              >
                {s.icon}
              </div>
              <span className="mt-2 text-xs text-center text-gray-700 dark:text-gray-200 truncate max-w-[90px]">{s.title}</span>
            </div>
            {index < steps.length - 1 && <div className="flex-1 h-0.5 bg-gray-300 dark:bg-gray-600 mx-2" />}
          </React.Fragment>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {step === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Plano" error={errors.plan_id?.message}>
              <select {...register('plan_id')} className={getInputClass(errors.plan_id)}>
                <option value="">Selecione...</option>
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Contrato" error={errors.contract_id?.message}>
              <select {...register('contract_id')} className={getInputClass(errors.contract_id)}>
                <option value="">Selecione...</option>
                {contracts.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </Field>
          </div>
        )}

        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="Login PPPoE" error={errors.login_pppoe?.message}>
              <input type="text" {...register('login_pppoe')} className={getInputClass(errors.login_pppoe)} />
            </Field>
            <Field label="Senha PPPoE" error={errors.password_pppoe?.message}>
              <input type="password" {...register('password_pppoe')} className={getInputClass(errors.password_pppoe)} />
            </Field>
            <Field label="Senha do Assinante" error={errors.subscriber_password?.message}>
              <input type="password" {...register('subscriber_password')} className={getInputClass(errors.subscriber_password)} />
            </Field>
            <Field label="Status" error={errors.status?.message}>
              <select {...register('status')} defaultValue="active" className={getInputClass(errors.status)}>
                <option value="active">Ativo</option>
                <option value="suspended">Suspenso</option>
                <option value="canceled">Cancelado</option>
              </select>
            </Field>
          </div>
        )}

        {step === 2 && (
          <Field label="Endereço (simulado)">
            <input type="text" {...register('address')} className={inputClass} placeholder="Rua Exemplo, 123" />
          </Field>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <p className="text-sm text-gray-700 dark:text-white">Confira os dados antes de criar o serviço:</p>
            <ul className="text-sm space-y-1 text-gray-800 dark:text-white">
              <li>Plano ID: {getValues('plan_id')}</li>
              <li>Contrato ID: {getValues('contract_id')}</li>
              <li>Login PPPoE: {getValues('login_pppoe')}</li>
              <li>Endereço: {getValues('address')}</li>
              <li>Status: {getValues('status')}</li>
            </ul>
          </div>
        )}

        {/* Navegação */}
        <div className="flex justify-between pt-6">
          {step > 0 ? (
            <button type="button" onClick={prevStep} className={btnBack}>
              Voltar
            </button>
          ) : <div />}
          {step < steps.length - 1 ? (
            <button type="button" onClick={nextStep} className={btnPrimary}>
              Próximo
            </button>
          ) : (
            <button type="submit" disabled={loading} className={btnSubmit}>
              {loading ? 'Salvando...' : 'Criar serviço'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

// Subcomponentes reutilizáveis
const Field = ({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) => (
  <div>
    <label className={labelClass}>{label}</label>
    {children}
    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
  </div>
);

// Estilos utilitários
const getInputClass = (error?: any) =>
  `w-full px-4 py-2 rounded-lg border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} 
   bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none`;

const inputClass =
  'w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none';

const labelClass = 'block text-sm font-medium text-gray-700 dark:text-white mb-1';

const btnPrimary =
  'px-4 py-2 rounded-lg bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 transition';

const btnSubmit =
  'px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition';

const btnBack =
  'px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition';
