'use client';

import React, { useState } from 'react';

const mockBillingAccounts = [
  { id: 1, name: 'Conta Principal' },
  { id: 2, name: 'Conta Secundária' },
  { id: 3, name: 'Conta de Testes' },
];

export default function PlansCreate() {
  const [form, setForm] = useState({
    billing_account_id: '',
    name: '',
    description: '',
    price: '',
    download_speed: '',
    upload_speed: '',
    auto_block: '0',
    status: 'active',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', form);
    // Aqui vai a chamada para o backend
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header com botão de salvar */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Novo plano</h1>
        <button
          type="submit"
          className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium text-white bg-brand-500 rounded-lg dark:bg-gray-600 hover:bg-brand-600  dark:hover:bg-brand-500 transition"
        >
          Adicionar
        </button>
      </div>

      {/* Seção: Dados Gerais */}
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
              required
              className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">Selecione...</option>
              {mockBillingAccounts.map((acc) => (
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
              required
              placeholder="Ex: Fibra 500 Mega"
              className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
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
              placeholder="Texto livre sobre o plano, benefícios, observações..."
              className="w-full h-28 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>
      </div>

      {/* Seção: Dados Técnicos */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.03] p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Dados técnicos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              Download (Mbps)
            </label>
            <input
              type="number"
              name="download_speed"
              value={form.download_speed}
              onChange={handleChange}
              required
              placeholder="Ex: 500"
              className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              Upload (Mbps)
            </label>
            <input
              type="number"
              name="upload_speed"
              value={form.upload_speed}
              onChange={handleChange}
              required
              placeholder="Ex: 250"
              className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              Auto Bloqueio (dias)
            </label>
            <input
              type="number"
              name="auto_block"
              value={form.auto_block}
              onChange={handleChange}
              placeholder="Ex: 10"
              className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              Preço (R$)
            </label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              placeholder="Ex: 99.90"
              className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
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
