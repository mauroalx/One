"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { applyMask } from "@/utils/generators"; // Certifique-se de ter essa função utilitária para aplicar máscaras
import { customerSchema } from "@/app/schemas/customer";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // importante: garantir que o token esteja setado


const CustomersCreate: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(customerSchema),
    defaultValues: {
      type: "individual",
    },
  });

  const router = useRouter();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const type = watch("type");

  const onSubmit = async (data: any) => {
    setLoading(true);
    setApiError(null);

    // Ajusta o payload para remover as máscaras e enviar o que o backend espera
    const payload = {
        ...data,
        document: data.document.replace(/\D/g, ''),
        phone: data.phone?.replace(/\D/g, '') || null,
        mobile1: data.mobile1?.replace(/\D/g, '') || null,
        mobile2: data.mobile2?.replace(/\D/g, '') || null,
        fax: data.fax?.replace(/\D/g, '') || null,
        address_zipcode: data.address_zipcode.replace(/\D/g, ''),
    };

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/v1/customer/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
        });

        if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Erro ao criar cliente");
        }

        router.push("/business/customers"); // redireciona após sucesso
    } catch (err: any) {
        console.error(err);
        setApiError(err.message);
    } finally {
        setLoading(false);
    }
 };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6 space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Cadastro de Cliente</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Preencha os dados cadastrais do cliente.</p>
        </div>
        <button type="submit" className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium text-white bg-brand-500 rounded-lg dark:bg-gray-600 hover:bg-brand-600 dark:hover:bg-brand-500 transition">
          Salvar
        </button>
      </div>

        {apiError && (
            <div className="flex items-center gap-3 bg-red-100/60 dark:bg-red-400/10 border border-red-300 dark:border-red-600 text-red-800 dark:text-red-400 rounded-xl px-4 py-3">
                <svg
                    className="w-5 h-5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M12 8v4m0 4h.01" />
                </svg>
                <span className="text-sm font-medium">
                    {apiError.includes("Document or email already exists")
                        ? "Já existe um cliente com esse documento ou email"
                        : apiError}
                </span>
            </div>
        )}


      <div className="space-y-4">
        <label className="text-sm font-medium text-gray-700 dark:text-white">Tipo de Cliente</label>
        <select {...register("type")} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-sm text-gray-800 dark:text-white shadow-sm">
          <option value="individual">Pessoa Física</option>
          <option value="company">Pessoa Jurídica</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-white">Nome Completo *</label>
          <input type="text" placeholder="Ex: João Silva" {...register("full_name")} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-sm text-gray-800 dark:text-white shadow-sm" />
          {errors.full_name && <p className="text-red-500 text-sm">{errors.full_name.message}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-white">CPF / CNPJ *</label>
          <Controller
            control={control}
            name="document"
            render={({ field }) => {
              const maskedValue = applyMask(field.value || '', type === "individual" ? "999.999.999-99" : "99.999.999/9999-99");
              return (
                <input
                  {...field}
                  value={maskedValue}
                  onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ''))}
                  placeholder={type === "individual" ? "000.000.000-00" : "00.000.000/0000-00"}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-sm text-gray-800 dark:text-white shadow-sm"
                />
              );
            }}
          />
          {errors.document && <p className="text-red-500 text-sm">{errors.document.message}</p>}
        </div>
      </div>

      {type === "company" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-white">Nome Fantasia</label>
            <input type="text" placeholder="Ex: Padaria Silva" {...register("trade_name")} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-sm text-gray-800 dark:text-white shadow-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-white">Razão Social</label>
            <input type="text" placeholder="Ex: Silva Alimentos LTDA" {...register("legal_name")} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-sm text-gray-800 dark:text-white shadow-sm" />
          </div>
        </div>
      )}

      {type === "individual" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-white">RG</label>
            <input type="text" placeholder="Ex: 12.345.678-9" {...register("rg")} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-sm text-gray-800 dark:text-white shadow-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-white">Nome da Mãe</label>
            <input type="text" placeholder="Ex: Maria Silva" {...register("mother_name")} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-sm text-gray-800 dark:text-white shadow-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-white">Nome do Pai</label>
            <input type="text" placeholder="Ex: José Silva" {...register("father_name")} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-sm text-gray-800 dark:text-white shadow-sm" />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-white">Email *</label>
          <input type="email" placeholder="exemplo@dominio.com" {...register("email")} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-sm text-gray-800 dark:text-white shadow-sm" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-white">Telefone</label>
          <Controller
            control={control}
            name="phone"
            render={({ field }) => {
              const maskedValue = applyMask(field.value || '', "(99) 9999-9999");
              return (
                <input
                  {...field}
                  value={maskedValue}
                  onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ''))}
                  placeholder="(00) 0000-0000"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-sm text-gray-800 dark:text-white shadow-sm"
                />
              );
            }}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-white">Celular 1</label>
          <Controller
            control={control}
            name="mobile1"
            render={({ field }) => {
              const maskedValue = applyMask(field.value || '', "(99) 99999-9999");
              return (
                <input
                  {...field}
                  value={maskedValue}
                  onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ''))}
                  placeholder="(00) 00000-0000"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-sm text-gray-800 dark:text-white shadow-sm"
                />
              );
            }}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-md font-semibold text-gray-800 dark:text-white">Endereço</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-white">Rua *</label>
            <input type="text" placeholder="Ex: Rua das Flores" {...register("address_street")} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-sm text-gray-800 dark:text-white shadow-sm" />
            {errors.address_street && <p className="text-red-500 text-sm">{errors.address_street.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-white">Número *</label>
            <input type="text" placeholder="Ex: 123" {...register("address_number")} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-sm text-gray-800 dark:text-white shadow-sm" />
            {errors.address_number && <p className="text-red-500 text-sm">{errors.address_number.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-white">Complemento</label>
            <input type="text" placeholder="Ex: Apto 101" {...register("address_complement")} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-sm text-gray-800 dark:text-white shadow-sm" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-white">Bairro *</label>
            <input type="text" placeholder="Ex: Centro" {...register("address_neighborhood")} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-sm text-gray-800 dark:text-white shadow-sm" />
            {errors.address_neighborhood && <p className="text-red-500 text-sm">{errors.address_neighborhood.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-white">Cidade *</label>
            <input type="text" placeholder="Ex: São Paulo" {...register("address_city")} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-sm text-gray-800 dark:text-white shadow-sm" />
            {errors.address_city && <p className="text-red-500 text-sm">{errors.address_city.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-white">Estado *</label>
            <input type="text" placeholder="Ex: SP" {...register("address_state")} className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-sm text-gray-800 dark:text-white shadow-sm" />
            {errors.address_state && <p className="text-red-500 text-sm">{errors.address_state.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-white">CEP *</label>
          <Controller
            control={control}
            name="address_zipcode"
            render={({ field }) => {
              const maskedValue = applyMask(field.value || '', "99999-999");
              return (
                <input
                  {...field}
                  value={maskedValue}
                  onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ''))}
                  placeholder="00000-000"
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-3 text-sm text-gray-800 dark:text-white shadow-sm"
                />
              );
            }}
          />
          {errors.address_zipcode && <p className="text-red-500 text-sm">{errors.address_zipcode.message}</p>}
        </div>
      </div>
    </form>
  );
};

export default CustomersCreate;