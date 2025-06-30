"use client";

import React, { useState, useEffect, useRef } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { useAuth } from "@/context/AuthContext";
import AddressForm from "@/components/ui/system/addresses/SystemAddressForm";
import SystemAddressesFilterHeader from "@/components/ui/system/addresses/SystemAddressesFilterHeader";
import SystemAddressesTable from "@/components/ui/system/addresses/SystemAddressesTable";
import Toast from "@/components/common/Toast";
import NoStreetsMessage from "@/components/ui/system/addresses/SystemNoStreetsMessage";
import NoEntityMessage from "@/components/ui/system/addresses/NoEntityMessage";
import { api } from "@/utils/api";
import EditAddressModal from "@/components/ui/system/addresses/EditAddressModal";

export interface Address {
  id: number;
  name: string;         // nome da rua
  district: string;
  district_id: number;
  zipcode: string;
  city: string;
  city_id: number;
  state: string;
  state_id: number;
}

interface State { id: number; acronym: string }
interface City { id: number; name: string; state_id: number }
interface District { id: number; name: string; city_id: number }
interface Street { id: number; name: string; district: string; city: string; state: string }

const SystemAddresses: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);

  const [refs, setRefs] = useState({
    states: [],
    citiesRaw: [],
    districtsRaw: [],
    streetsRaw: [],
    cities: [],
    districts: [],
  });

  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editModalData, setEditModalData] = useState<{ id: number; name: string; zipcode?: string } | null>(null);
  const [editModalType, setEditModalType] = useState<"district" | "street" | null>(null);

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success" as "success" | "error",
  });

  const [page, setPage] = useState<number>(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalType, setModalType] = useState<"district" | "street" | null>(null);

  const [modalInitialData, setModalInitialData] = useState({
    state_id: "",
    city_id: "",
    district_id: "",
  });

  const { token } = useAuth();

  const buildAddresses = async () => {
    try {
      const filters = new URLSearchParams();
      if (selectedDistrict?.id) filters.append("district_id", selectedDistrict.id.toString());
      else if (selectedCity?.id) filters.append("city_id", selectedCity.id.toString());
      else if (selectedState?.id) filters.append("state_id", selectedState.id.toString());

      const res = await api.get(`/v1/system/streets?${filters.toString()}`, token);
      const streetsData: Street[] = await res.json();

      const transformed: Address[] = streetsData.map((street) => ({
        id: street.id,
        name: street.name,
        district: street.district,
        district_id: street.district_id,
        zipcode: street.zipcode,
        city: street.city,
        city_id: street.city_id,
        state: street.state,
        state_id: street.state_id,
      }));

      setAddresses(transformed);
    } catch (err) {
      console.error("Erro ao buscar ruas:", err);
    }
  };

  useEffect(() => { buildAddresses(); }, [selectedState, selectedCity, selectedDistrict]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const [statesRes, citiesRes, districtsRes, streetsRes] = await Promise.all([
        api.get("/v1/system/states", token),
        api.get("/v1/system/cities", token),
        api.get("/v1/system/districts", token),
        api.get("/v1/system/streets", token),
      ]);

      const [statesData, citiesData, districtsData, streetsData] = await Promise.all([
        statesRes.json(),
        citiesRes.json(),
        districtsRes.json(),
        streetsRes.json(),
      ]);

      console.log(statesData)

      setRefs({
        states: statesData,
        citiesRaw: citiesData,
        districtsRaw: districtsData,
        streetsRaw: streetsData,
        cities: [],
        districts: [],
      });

      setModalInitialData({
        state_id: selectedState?.id?.toString() || "",
        city_id: selectedCity?.id?.toString() || "",
        district_id: selectedDistrict?.id?.toString() || "",
      });
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    if (selectedState) {
      const filtered = refs.citiesRaw.filter((c: City) => c.state_id === selectedState.id);
      setRefs(prev => ({ ...prev, cities: filtered, districts: [] }));
      setSelectedCity(null);
      setSelectedDistrict(null);
    }
  }, [selectedState, refs.citiesRaw]);

  useEffect(() => {
    if (selectedCity) {
      const filtered = refs.districtsRaw.filter((d: District) => d.city_id === selectedCity.id);
      setRefs(prev => ({ ...prev, districts: filtered }));
      setSelectedDistrict(null);
    }
  }, [selectedCity, refs.districtsRaw]);

  useEffect(() => { setPage(1); }, [selectedState, selectedCity, selectedDistrict, refs.streetsRaw]);

  const handleCreateAddress = async (data: any) => {
    try {
      const endpoint = modalType === "district" ? "/v1/system/districts" : "/v1/system/streets";
      await api.post(endpoint, data, token);
      setModalType(null);
      setToast({ visible: true, message: "Endereço adicionado com sucesso!", type: "success" });
      setTimeout(() => setToast({ ...toast, visible: false }), 3000);

      const [newDistrictsRes, newStreetsRes] = await Promise.all([
        api.get("/v1/system/districts", token),
        api.get("/v1/system/streets", token),
      ]);
      const [newDistricts, newStreets] = await Promise.all([
        newDistrictsRes.json(),
        newStreetsRes.json(),
      ]);
      setRefs(prev => ({
        ...prev,
        districtsRaw: newDistricts,
        streetsRaw: newStreets,
      }));

      buildAddresses();
    } catch (err) {
      console.error(err);
      setToast({ visible: true, message: "Erro ao adicionar endereço", type: "error" });
      setTimeout(() => setToast({ ...toast, visible: false }), 3000);
    }
  };

  const handleEdit = (item: any) => {
    if ("zipcode" in item && item.district_id === undefined) {
      // É bairro
      setEditModalType("district");
      setEditModalData({ id: item.id, name: item.name, zipcode: item.zipcode });
    } else {
      // É rua
      setEditModalType("street");
      setEditModalData({
        id: item.id,
        name: item.name,
        zipcode: item.zipcode,
        district_id: item.district_id,
        district_name: item.district,
      });
    }
    setEditModalOpen(true);
  };


  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6 space-y-6">
      <div className="flex justify-end relative">
        <button
          className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium px-4 py-2 rounded-lg"
          onClick={() => setIsDropdownOpen(prev => !prev)}
        >
          <Plus className="w-4 h-4" /> Adicionar
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 z-10 mt-11 w-40">
        {/* Arrow */}
        <div className="absolute -top-2 right-0">
          <svg width="20" height="10" viewBox="0 0 20 10" className="block">
            <polygon points="10,0 20,10 0,10" fill="none" className="dark:fill-gray-900" />         
          </svg>
        </div>
        <div
          ref={dropdownRef}
          className="rounded-md bg-white dark:bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div className="py-1">
            <button
          onClick={() => { setModalType("district"); setIsDropdownOpen(false); }}
          className="w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            >
          Bairro
            </button>
            <button
          onClick={() => { setModalType("street"); setIsDropdownOpen(false); }}
          className="w-full text-left px-4 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            >
          Rua
            </button>
          </div>
        </div>
          </div>
        )}
      </div>

      <Modal isOpen={modalType !== null} onClose={() => setModalType(null)}>
        <div className="p-6 w-[500px] max-w-full">
          {modalType && (
            <AddressForm
              type={modalType}
              onSubmit={handleCreateAddress}
              initialData={modalInitialData}
              states={refs.states}
              citiesRaw={refs.citiesRaw}
              districtsRaw={refs.districtsRaw}
            />
          )}
        </div>
      </Modal>

      <SystemAddressesFilterHeader
        states={refs.states}
        cities={refs.cities}
        districts={refs.districts}
        selectedState={selectedState}
        selectedCity={selectedCity}
        selectedDistrict={selectedDistrict}
        onStateChange={setSelectedState}
        onCityChange={setSelectedCity}
        onDistrictChange={setSelectedDistrict}
      />

      {selectedCity && refs.districts.length === 0 ? (
        <NoEntityMessage
          entity="district"
          onAdd={() => {
            setModalType("district");
            setModalInitialData({
              state_id: selectedState?.id.toString() || "",
              city_id: selectedCity?.id.toString() || "",
              district_id: "",
            });
          }}
        />
      ) : selectedDistrict && addresses.length === 0 ? (
        <NoEntityMessage
          entity="street"
          onAdd={() => {
            setModalType("street");
            setModalInitialData({
              state_id: selectedState?.id.toString() || "",
              city_id: selectedCity?.id.toString() || "",
              district_id: selectedDistrict?.id.toString() || "",
            });
          }}
          onDelete={async () => {
            try {
              await api.delete(`/v1/system/districts/${selectedDistrict?.id}`, token);
              const res = await api.get("/v1/system/districts", token);
              const newDistricts = await res.json();
              setRefs(prev => ({ ...prev, districtsRaw: newDistricts }));
              setSelectedDistrict(null);
              setToast({ visible: true, message: "Bairro removido com sucesso", type: "success" });
              setTimeout(() => setToast({ ...toast, visible: false }), 3000);
            } catch (err) {
              setToast({ visible: true, message: "Erro ao remover o bairro", type: "error" });
              setTimeout(() => setToast({ ...toast, visible: false }), 3000);
            }
          }}
        />
      ) : (
        <SystemAddressesTable
          addresses={addresses}
          page={page}
          onPageChange={setPage}
          onEdit={handleEdit}
        />
      )}


    <Toast isVisible={toast.visible} message={toast.message} type={toast.type} />

    {editModalOpen && editModalData && editModalType && (
      <EditAddressModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        type={editModalType}
        initialData={editModalData}
        onSubmit={async (data) => {
          try {
            const endpoint =
              editModalType === "district"
                ? `/v1/system/districts/${data.id}`
                : `/v1/system/streets/${data.id}`;

            await api.put(endpoint, data, token);

            // Atualiza o raw
            const res = await api.get(`/v1/system/${editModalType === "district" ? "districts" : "streets"}`, token);
            const updated = await res.json();

            setRefs((prev) => ({
              ...prev,
              [editModalType === "district" ? "districtsRaw" : "streetsRaw"]: updated,
            }));

            // Atualiza a tabela principal (caso tenha sido uma rua)
            if (editModalType === "street") {
              await buildAddresses(); // <- isso é o que atualiza a tabela de ruas
            }

            setEditModalOpen(false);
            setToast({ visible: true, message: "Atualizado com sucesso", type: "success" });
            setTimeout(() => setToast({ ...toast, visible: false }), 3000);
          } catch {
            setToast({ visible: true, message: "Erro ao atualizar", type: "error" });
            setTimeout(() => setToast({ ...toast, visible: false }), 3000);
          }
        }}
      />
    )}

    </div>
  );
};

export default SystemAddresses;