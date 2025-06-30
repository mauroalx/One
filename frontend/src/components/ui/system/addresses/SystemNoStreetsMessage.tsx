// components/ui/system/addresses/NoStreetsMessage.tsx
import { Plus, Trash2 } from "lucide-react";

interface Props {
  onAddStreet: () => void;
  onDeleteDistrict: () => void;
}

export default function NoStreetsMessage({ onAddStreet, onDeleteDistrict }: Props) {
  return (
    <div className="rounded-2xl p-6 min-h-[200px] flex items-center justify-center">
      <div className="text-center space-y-4 max-w-md">
        <div className="mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-brand-100 dark:bg-white/10">
          <Plus className="w-10 h-10 text-brand-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Nenhuma rua encontrada
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Este bairro ainda não possui nenhuma rua cadastrada. Você pode adicionar a primeira agora ou remover o bairro, se não for mais necessário.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onAddStreet}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition"
          >
            <Plus className="w-4 h-4" />
            Adicionar rua
          </button>
          <button
            onClick={onDeleteDistrict}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-white/10 rounded-lg hover:bg-gray-300 dark:hover:bg-white/20 transition"
          >
            <Trash2 className="w-4 h-4" />
            Remover bairro
          </button>
        </div>
      </div>
    </div>
  );
}
