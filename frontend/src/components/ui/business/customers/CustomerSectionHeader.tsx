// components/ui/business/customers/SectionHeader.tsx
import React from "react";

type EditSection = "general" | "contact" | "address";

interface SectionHeaderProps {
  title: string;
  section: EditSection;
  editMode: Record<EditSection, boolean>;
  toggleEdit: (section: EditSection, state?: boolean) => void;
  saveSection: (section: EditSection) => void;
}

export default function SectionHeader({
  title,
  section,
  editMode,
  toggleEdit,
  saveSection,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
      {editMode[section] ? (
        <div className="space-x-2">
          <button
            onClick={() => toggleEdit(section, false)}
            className="text-sm px-4 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Cancelar
          </button>
          <button
            onClick={() => saveSection(section)}
            className="text-sm px-4 py-1.5 rounded-md border border-brand-500 bg-brand-500 text-white hover:brightness-110"
          >
            Salvar
          </button>
        </div>
      ) : (
        <button
          onClick={() => toggleEdit(section)}
          className="text-sm px-4 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Habilitar edição
        </button>
      )}
    </div>
  );
}
