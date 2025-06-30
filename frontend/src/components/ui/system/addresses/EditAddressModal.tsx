import Switch from "@/components/form/switch/Switch";
import { Modal } from "@/components/ui/modal";
import { applyMask } from "@/utils/generators";
import React, { useEffect, useState } from "react";


interface Props {
  isOpen: boolean;
  onClose: () => void;
  type: "district" | "street";
  initialData: {
    id: number;
    name: string;
    zipcode?: string;
    district_id?: number;
    district_name?: string;
  };
  onSubmit: (data: any) => Promise<void>;
}

export default function EditAddressModal({
  isOpen,
  onClose,
  type,
  initialData,
  onSubmit,
}: Props) {
  const [name, setName] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [editDistrict, setEditDistrict] = useState(false);

  useEffect(() => {
    setName(initialData.name);
    setZipcode(initialData.zipcode || "");
    setDistrictName(initialData.district_name || "");
    setEditDistrict(false);
  }, [initialData]);

  const handleCepChange = (value: string) => {
    const masked = applyMask(value, "99999-999");
    setZipcode(masked);
  };

  const handleSubmit = async () => {
    if (!name.trim()) return;
    const payload: any = { id: initialData.id, name: name.trim() };

    if (type === "district") {
      payload.zipcode = zipcode.trim();
    } else {
      payload.district_id = initialData.district_id;

      if (editDistrict) {
        payload.district_name = districtName.trim();
        payload.zipcode = zipcode.trim();
      } else {
        payload.district_name = null;
        payload.zipcode = null;
      }
    }

    await onSubmit(payload);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 w-full max-w-md space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Editar {type === "district" ? "bairro" : "rua"}
        </h2>

        {/* Nome principal */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Nome
          </label>
          <input
            className="w-full border rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Se for rua, permitir edição do bairro */}
        {type === "street" && (
          <div className="space-y-4 border-t pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-white">
                Editar bairro também
              </span>
              <Switch
              label=""
                defaultChecked={editDistrict}
                onChange={setEditDistrict}
              />
            </div>

            {editDistrict && (
              <div className="grid gap-4 sm:grid-cols-1">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">
                    Nome do bairro
                  </label>
                  <input
                    className="w-full border rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-white"
                    value={districtName}
                    onChange={(e) => setDistrictName(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">
                    CEP do bairro
                  </label>
                  <input
                    className="w-full border rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-white"
                    value={zipcode}
                    onChange={(e) => handleCepChange(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm text-gray-700 dark:text-white bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md text-sm text-white bg-brand-500 hover:bg-brand-600"
          >
            Salvar
          </button>
        </div>
      </div>
    </Modal>
  );
}
