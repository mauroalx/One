'use client';
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import SectionHeader from "./CustomerSectionHeader";

type EditSection = 'general' | 'contact' | 'address';

type Customer = {
  id: number;
  type: string;
  full_name: string;
  trade_name?: string;
  legal_name?: string;
  document: string;
  rg?: string;
  mother_name?: string;
  father_name?: string;
  email: string;
  phone?: string;
  mobile1?: string;
  mobile2?: string;
  fax?: string;
  address_street: string;
  address_number: string;
  address_complement?: string;
  address_neighborhood: string;
  address_city: string;
  address_state: string;
  address_zipcode: string;
  created_at?: string;
  updated_at?: string;
};

export default function CustomerDetailGeneral() {
  const { id } = useParams();
  const { token } = useAuth(); // Assuming you have a useAuth hook to get the token
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [form, setForm] = useState<Partial<Customer>>({});
  const [editMode, setEditMode] = useState<Record<EditSection, boolean>>({
    general: false,
    contact: false,
    address: false,
  });

  const toggleEdit = (section: EditSection, state?: boolean) => {
    setEditMode(prev => ({
      ...prev,
      [section]: state !== undefined ? state : !prev[section],
    }));
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:opacity-50";

  useEffect(() => {
    const fetchCustomer = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/v1/customer/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setCustomer(data);
        setForm(data);
      } else {
        console.error("Erro ao buscar cliente", await res.text());
      }
    };

    if (id) fetchCustomer();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const saveSection = async (section: EditSection) => {
    try {
      const { id, created_at, updated_at, ...payload } = form;

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/v1/customer/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      toggleEdit(section, false);
    } catch (err) {
      console.error("Erro ao salvar", err);
    }
  };

  if (!customer) return <div>Carregando...</div>;

  return (
    <div className="space-y-10">
      {/* Dados Cadastrais */}
      <section>
        <SectionHeader
          title="Dados Cadastrais"
          section="general"
          editMode={editMode}
          toggleEdit={toggleEdit}
          saveSection={saveSection}
        />
        <div className="grid md:grid-cols-2 gap-4">
          <input disabled={!editMode.general} name="full_name" placeholder="Nome completo" className={inputClass} value={form.full_name || ''} onChange={handleInputChange} />
          <input disabled={!editMode.general} name="legal_name" placeholder="Razão Social" className={inputClass} value={form.legal_name || ''} onChange={handleInputChange} />
          <input disabled={!editMode.general} name="document" placeholder="CPF/CNPJ" className={inputClass} value={form.document || ''} onChange={handleInputChange} />
          <input disabled={!editMode.general} name="rg" placeholder="RG" className={inputClass} value={form.rg || ''} onChange={handleInputChange} />
          <input disabled={!editMode.general} name="mother_name" placeholder="Nome da Mãe" className={inputClass} value={form.mother_name || ''} onChange={handleInputChange} />
          <input disabled={!editMode.general} name="father_name" placeholder="Nome do Pai" className={inputClass} value={form.father_name || ''} onChange={handleInputChange} />
        </div>
      </section>

      {/* Contato */}
      <section>
        <SectionHeader
          title="Contato"
          section="contact"
          editMode={editMode}
          toggleEdit={toggleEdit}
          saveSection={saveSection}
        />
        <div className="grid md:grid-cols-2 gap-4">
          <input disabled={!editMode.contact} name="email" placeholder="E-mail" className={inputClass} value={form.email || ''} onChange={handleInputChange} />
          <input disabled={!editMode.contact} name="phone" placeholder="Telefone" className={inputClass} value={form.phone || ''} onChange={handleInputChange} />
          <input disabled={!editMode.contact} name="mobile1" placeholder="Celular" className={inputClass} value={form.mobile1 || ''} onChange={handleInputChange} />
          <input disabled={!editMode.contact} name="mobile2" placeholder="WhatsApp" className={inputClass} value={form.mobile2 || ''} onChange={handleInputChange} />
          <input disabled={!editMode.contact} name="fax" placeholder="Fax" className={inputClass} value={form.fax || ''} onChange={handleInputChange} />
        </div>
      </section>

      {/* Endereço */}
      <section>
        <SectionHeader
          title="Endereço Principal"
          section="address"
          editMode={editMode}
          toggleEdit={toggleEdit}
          saveSection={saveSection}
        />
        <div className="grid md:grid-cols-2 gap-4">
          <input disabled={!editMode.address} name="address_street" placeholder="Rua" className={inputClass} value={form.address_street || ''} onChange={handleInputChange} />
          <input disabled={!editMode.address} name="address_number" placeholder="Número" className={inputClass} value={form.address_number || ''} onChange={handleInputChange} />
          <input disabled={!editMode.address} name="address_complement" placeholder="Complemento" className={inputClass} value={form.address_complement || ''} onChange={handleInputChange} />
          <input disabled={!editMode.address} name="address_neighborhood" placeholder="Bairro" className={inputClass} value={form.address_neighborhood || ''} onChange={handleInputChange} />
          <input disabled={!editMode.address} name="address_city" placeholder="Cidade" className={inputClass} value={form.address_city || ''} onChange={handleInputChange} />
          <input disabled={!editMode.address} name="address_state" placeholder="UF" className={inputClass} value={form.address_state || ''} onChange={handleInputChange} />
          <input disabled={!editMode.address} name="address_zipcode" placeholder="CEP" className={inputClass} value={form.address_zipcode || ''} onChange={handleInputChange} />
        </div>
      </section>
    </div>
  );
}
