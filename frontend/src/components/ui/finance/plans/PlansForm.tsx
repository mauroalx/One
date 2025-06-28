'use client';
import './globals.css'

import React from 'react';

export type PlanFormValues = {
  billing_account_id: string;
  name: string;
  description?: string;
  price: string;
  download_speed: string;
  upload_speed: string;
  auto_block: string;
  status: 'active' | 'inactive';
};

type Props = {
  initialData?: PlanFormValues;
  onSubmit: (data: PlanFormValues) => Promise<void>;
  isSubmitting: boolean;
  billingAccounts: { id: number; name: string }[];
};

export default function PlansForm({ initialData, onSubmit, isSubmitting, billingAccounts }: Props) {
  const [form, setForm] = React.useState<PlanFormValues>(
    initialData || {
      billing_account_id: '',
      name: '',
      description: '',
      price: '',
      download_speed: '',
      upload_speed: '',
      auto_block: '0',
      status: 'active',
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
          {initialData ? 'Editar plano' : 'Novo plano'}
        </h1>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium text-white bg-brand-500 rounded-lg dark:bg-gray-600 hover:bg-brand-600  dark:hover:bg-brand-500 transition disabled:opacity-50"
        >
          {isSubmitting ? 'Salvando...' : initialData ? 'Salvar alterações' : 'Adicionar'}
        </button>
      </div>

      {/* Dados gerais */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.03] p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Dados gerais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              Conta de Cobrança
            </label>
            <select
              name="billing_account_id"
              value={form.billing_account_id}
              onChange={handleChange}
              disabled={isSubmitting}
              required
              className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white"
            >
              <option value="">Selecione...</option>
              {billingAccounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              Nome do Plano
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={isSubmitting}
              required
              placeholder="Ex: Fibra 500 Mega"
              className="input"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              Descrição
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="Texto livre sobre o plano..."
              className="textarea"
            />
          </div>
        </div>
      </div>

      {/* Dados técnicos */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.03] p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Dados técnicos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Download (Mbps)', name: 'download_speed', placeholder: 'Ex: 500' },
            { label: 'Upload (Mbps)', name: 'upload_speed', placeholder: 'Ex: 250' },
            { label: 'Auto Bloqueio (dias)', name: 'auto_block', placeholder: 'Ex: 10' },
            { label: 'Preço (R$)', name: 'price', placeholder: 'Ex: 99.90', step: '0.01' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                {field.label}
              </label>
              <input
                type="number"
                name={field.name}
                value={form[field.name as keyof PlanFormValues]}
                onChange={handleChange}
                disabled={isSubmitting}
                placeholder={field.placeholder}
                step={field.step || '1'}
                className="input"
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              disabled={isSubmitting}
              className="input"
            >
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
            </select>
          </div>
        </div>
      </div>
    </form>
  );
}
