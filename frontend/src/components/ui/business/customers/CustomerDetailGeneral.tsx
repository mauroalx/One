'use client';
import React, { useState } from "react";

export default function CustomerDetailGeneral() {
  const [editMode, setEditMode] = useState({
    general: false,
    contact: false,
    address: false,
  });

  const toggleEdit = (section: keyof typeof editMode, state?: boolean) => {
    setEditMode((prev) => ({
      ...prev,
      [section]: state !== undefined ? state : !prev[section],
    }));
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:opacity-50";

  return (
    <div className="space-y-10">
      {/* Bloco: Dados Gerais */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Dados Cadastrais
          </h3>
          {editMode.general ? (
            <div className="space-x-2">
              <button
                onClick={() => toggleEdit("general", false)}
                className="text-sm px-4 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  // salvar os dados
                  toggleEdit("general", false);
                }}
                className="text-sm px-4 py-1.5 rounded-md border border-brand-500 bg-brand-500 text-white hover:brightness-110"
              >
                Salvar
              </button>
            </div>
          ) : (
            <button
              onClick={() => toggleEdit("general")}
              className="text-sm px-4 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Habilitar edição
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input disabled={!editMode.general} placeholder="Nome Completo" className={inputClass} value="Mauro da Silva Alexandre" />
          <input disabled={!editMode.general} placeholder="Razão Social" className={inputClass} value="Mauro Alexandre ME" />
          <input disabled={!editMode.general} placeholder="CPF" className={inputClass} value="084.025.434-21" />
          <input disabled={!editMode.general} placeholder="RG" className={inputClass} value="10.021.982-6" />
          <input disabled={!editMode.general} placeholder="Nome da Mãe" className={inputClass} value="Maria Clara da Silva" />
          <input disabled={!editMode.general} placeholder="Nome do Pai" className={inputClass} value="João Pedro Alexandre" />
        </div>
      </section>

      {/* Bloco: Contato */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Contato
          </h3>
          {editMode.contact ? (
            <div className="space-x-2">
              <button
                onClick={() => toggleEdit("contact", false)}
                className="text-sm px-4 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={() => toggleEdit("contact", false)}
                className="text-sm px-4 py-1.5 rounded-md border border-brand-500 bg-brand-500 text-white hover:brightness-110"
              >
                Salvar
              </button>
            </div>
          ) : (
            <button
              onClick={() => toggleEdit("contact")}
              className="text-sm px-4 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Habilitar edição
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input disabled={!editMode.contact} placeholder="E-mail" className={inputClass} value="mauro@email.com" />
          <input disabled={!editMode.contact} placeholder="Telefone" className={inputClass} value="(85) 3321-7654" />
          <input disabled={!editMode.contact} placeholder="Celular" className={inputClass} value="(85) 99645-7788" />
          <input disabled={!editMode.contact} placeholder="WhatsApp" className={inputClass} value="(85) 99645-7788" />
          <input disabled={!editMode.contact} placeholder="Fax" className={inputClass} value="" />
        </div>
      </section>

      {/* Bloco: Endereço Principal */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Endereço Principal
          </h3>
          {editMode.address ? (
            <div className="space-x-2">
              <button
                onClick={() => toggleEdit("address", false)}
                className="text-sm px-4 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={() => toggleEdit("address", false)}
                className="text-sm px-4 py-1.5 rounded-md border border-brand-500 bg-brand-500 text-white hover:brightness-110"
              >
                Salvar
              </button>
            </div>
          ) : (
            <button
              onClick={() => toggleEdit("address")}
              className="text-sm px-4 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Habilitar edição
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input disabled={!editMode.address} placeholder="Rua / Logradouro" className={inputClass} value="Rua das Flores" />
          <input disabled={!editMode.address} placeholder="Número" className={inputClass} value="1234" />
          <input disabled={!editMode.address} placeholder="Complemento" className={inputClass} value="Apto 201" />
          <input disabled={!editMode.address} placeholder="Bairro" className={inputClass} value="Centro" />
          <input disabled={!editMode.address} placeholder="Cidade" className={inputClass} value="Fortaleza" />
          <input disabled={!editMode.address} placeholder="UF" className={inputClass} value="CE" />
          <input disabled={!editMode.address} placeholder="CEP" className={inputClass} value="60000-000" />
        </div>
      </section>
    </div>
  );
}
