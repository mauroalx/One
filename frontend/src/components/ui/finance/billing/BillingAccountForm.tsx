import React, { useEffect, useState } from "react";
import { BillingAccount } from "./BillingAccountsBoard";

interface BillingAccountFormProps {
  billingAccount?: BillingAccount;
  onSave: (data: Partial<BillingAccount>) => void;
  onCancel: () => void;
}

const BillingAccountForm: React.FC<BillingAccountFormProps> = ({ billingAccount, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<BillingAccount>>({
    name: "",
    provider: "",
    fine_percent: 0,
    fine_type: "daily",
    interest_percent: 0,
    interest_type: "daily",
    status: "active"
  });

  const [providers, setProviders] = useState<{ id: string; label: string }[]>([]);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/v1/finance/payment_providers`);
      const data = await res.json();
      setProviders(data);
    };
    fetchProviders();
  }, []);

  useEffect(() => {
    if (billingAccount) setFormData(billingAccount);
  }, [billingAccount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name.includes("percent") ? parseFloat(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white">Nome</label>
        <input
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white">Provedor</label>
        <select
            name="provider"
            value={formData.provider || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            required
        >
            <option value="">Selecione</option>
            {providers.map((p) => (
            <option key={p.id} value={p.id}>
                {p.label}
            </option>
            ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Juros (%)</label>
          <input
            type="number"
            step="0.01"
            name="interest_percent"
            value={formData.interest_percent || 0}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Tipo de Juros</label>
          <select
            name="interest_type"
            value={formData.interest_type || "daily"}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            <option value="daily">Diário</option>
            <option value="monthly">Mensal</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Multa (%)</label>
          <input
            type="number"
            step="0.01"
            name="fine_percent"
            value={formData.fine_percent || 0}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">Tipo de Multa</label>
          <select
            name="fine_type"
            value={formData.fine_type || "daily"}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            <option value="daily">Diário</option>
            <option value="monthly">Mensal</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white">Status</label>
        <select
          name="status"
          value={formData.status || "active"}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        >
          <option value="active">Ativo</option>
          <option value="inactive">Inativo</option>
          <option value="archived">Arquivado</option>
        </select>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm bg-gray-200 dark:bg-white/10 rounded-md hover:bg-gray-300 dark:hover:bg-white/20"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm bg-brand-500 text-white rounded-md hover:bg-brand-600"
        >
          Salvar
        </button>
      </div>
    </form>
  );
};

export default BillingAccountForm;
