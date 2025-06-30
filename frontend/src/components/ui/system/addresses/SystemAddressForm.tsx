// Refatorado: AddressForm.tsx com melhorias estruturais

"use client";

import { applyMask } from "@/utils/generators";
import React, { useEffect, useMemo, useState } from "react";

interface State { id: number; acronym: string }
interface City { id: number; name: string; state_id: number }
interface District { id: number; name: string; city_id: number }

interface AddressFormData {
  state_id: string;
  city_id: string;
  district_id: string;
  name: string;
  zipcode: string;
}

interface AddressFormProps {
  type: "district" | "street";
  onSubmit: (data: AddressFormData) => void;
  initialData?: Partial<AddressFormData>;
  states: State[];
  citiesRaw: City[];
  districtsRaw: District[];
}

const AddressForm: React.FC<AddressFormProps> = ({
  type,
  onSubmit,
  initialData,
  states,
  citiesRaw,
  districtsRaw,
}) => {
  const [formData, setFormData] = useState<AddressFormData>({
    state_id: initialData?.state_id || "",
    city_id: initialData?.city_id || "",
    district_id: initialData?.district_id || "",
    name: initialData?.name || "",
    zipcode: initialData?.zipcode || "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setFormData(prev => ({ ...prev, city_id: "", district_id: "" }));
  }, [formData.state_id]);

  useEffect(() => {
    setFormData(prev => ({ ...prev, district_id: "" }));
  }, [formData.city_id]);

  const filteredCities = useMemo(() => {
    return citiesRaw.filter(c => String(c.state_id) === String(formData.state_id));
  }, [citiesRaw, formData.state_id]);

  const filteredDistricts = useMemo(() => {
    return districtsRaw.filter(d => {
      const city = citiesRaw.find(c => c.id === d.city_id);
      return (
        String(d.city_id) === String(formData.city_id) &&
        String(city?.state_id) === formData.state_id
      );
    });
  }, [districtsRaw, citiesRaw, formData.city_id, formData.state_id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    const maskedValue =
        name === "zipcode" ? applyMask(value, "99999-999") : value;

    setFormData((prev) => ({
        ...prev,
        [name]: maskedValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    if (!formData.state_id) newErrors.state_id = "Estado obrigatório";
    if (!formData.city_id) newErrors.city_id = "Cidade obrigatória";
    if (type === "street" && !formData.district_id) newErrors.district_id = "Bairro obrigatório";
    if (!formData.name.trim()) newErrors.name = "Nome obrigatório";
    if (type === "district" && formData.zipcode.replace(/\D/g, "").length !== 8) {
        newErrors.zipcode = "CEP inválido";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
        onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {type && (
        <>
          {/* Estado */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">Estado</label>
            <select
              name="state_id"
              value={formData.state_id}
              onChange={handleChange}
              className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white"
            >
              <option value="">Selecione o estado</option>
              {states.map((s) => (
                <option key={s.id} value={s.id}>{s.acronym}</option>
              ))}
            </select>
            {errors.state_id && (
            <span className="text-red-500 text-sm mt-1">{errors.district_id}</span>
            )}
          </div>

          {/* Cidade */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">Cidade</label>
            <select
              name="city_id"
              value={formData.city_id}
              onChange={handleChange}
              className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white"
            >
              <option value="">Selecione a cidade</option>
              {filteredCities.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            {errors.city_id && (
            <span className="text-red-500 text-sm mt-1">{errors.city_id}</span>
            )}
          </div>
        </>
      )}

      {type === "district" && (
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">CEP</label>
          <input
            type="text"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            placeholder="00000-000"
            className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"

          />
         {errors.zipcode && (
         <span className="text-red-500 text-sm mt-1">{errors.zipcode}</span>
         )}
        </div>
      )}

      {type === "street" && (
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">Bairro</label>
          <select
            name="district_id"
            value={formData.district_id}
            onChange={handleChange}
            className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white"
          >
            <option value="">Selecione o bairro</option>
            {filteredDistricts.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
         {errors.district_id && (
         <span className="text-red-500 text-sm mt-1">{errors.district_id}</span>
         )}
        </div>
      )}

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">
          Nome do {type === "district" ? "bairro" : "logradouro"}
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={type === "district" ? "Centro" : "Rua das Flores"}
          className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"

        />
         {errors.name && (
         <span className="text-red-500 text-sm mt-1">{errors.name}</span>
         )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="h-10 px-6 text-sm font-semibold text-white bg-brand-500 rounded-lg dark:bg-gray-600 hover:bg-brand-600 transition"
        >
          Salvar
        </button>
      </div>
    </form>
  );
};

export default AddressForm;