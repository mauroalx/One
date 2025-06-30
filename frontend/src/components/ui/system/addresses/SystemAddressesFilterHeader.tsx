// Estrutura inicial de refatoração
// Vamos extrair os seguintes componentes:
// - SystemAddressesFilterHeader
// - SystemAddressesTable
// - AddressPagination
// - ModalDropdownButton (Adicionar -> Bairro/Rua)
//
// Vamos também mover os dados e métodos auxiliares para hooks ou funções separadas futuramente.

// Começaremos por quebrar o componente em partes no próximo passo.

// [1] EXTRAÇÃO: Header de Filtro
// src/components/ui/system/addresses/SystemAddressesFilterHeader.tsx

import React from "react";

interface Props {
  states: any[];
  cities: any[];
  districts: any[];
  selectedState: any;
  selectedCity: any;
  selectedDistrict: any;
  onStateChange: (state: any | null) => void;
  onCityChange: (city: any | null) => void;
  onDistrictChange: (district: any | null) => void;
}

const SystemAddressesFilterHeader: React.FC<Props> = ({
  states,
  cities,
  districts,
  selectedState,
  selectedCity,
  selectedDistrict,
  onStateChange,
  onCityChange,
  onDistrictChange,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Estado */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">Estado</label>
        <select
          className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white"
          value={selectedState?.id || ""}
          onChange={(e) => {
            const state = states.find(s => s.id === Number(e.target.value));
            onStateChange(state || null);
          }}
        >
          <option value="">Todos os Estados</option>
          {states.map((state) => (
            <option key={state.id} value={state.id}>{state.acronym}</option>
          ))}
        </select>
      </div>

      {/* Cidade */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">Cidade</label>
        <select
          className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white"
          value={selectedCity?.id || ""}
          onChange={(e) => {
            const city = cities.find(c => c.id === Number(e.target.value));
            onCityChange(city || null);
          }}
        >
          <option value="">Todas as Cidades</option>
          {cities.map(city => (
            <option key={city.id} value={city.id}>{city.name}</option>
          ))}
        </select>
      </div>

      {/* Bairro */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 dark:text-white mb-1">Bairro</label>
        <select
          className="h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-white"
          value={selectedDistrict?.id || ""}
          onChange={(e) => {
            const district = districts.find(d => d.id === Number(e.target.value));
            onDistrictChange(district || null);
          }}
        >
          <option value="">Todos os Bairros</option>
          {districts.map(d => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SystemAddressesFilterHeader;
