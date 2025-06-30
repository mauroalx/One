import { Plus, Trash2 } from "lucide-react";

interface Props {
  entity: "district" | "street";
  onAdd: () => void;
  onDelete?: () => void; // opcional, só exibe botão se for fornecido
}

export default function NoEntityMessage({ entity, onAdd, onDelete }: Props) {
  const isStreet = entity === "street";

  return (
    <div className="rounded-2xl p-6 min-h-[200px] flex items-center justify-center">
      <div className="text-center space-y-4 max-w-md">
        <div className="mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-brand-100 dark:bg-white/10">
          <Plus className="w-10 h-10 text-brand-500" />
        </div>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {isStreet ? "Nenhuma rua encontrada" : "Nenhum bairro encontrado"}
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          {isStreet
            ? "Este bairro ainda não possui nenhuma rua cadastrada. Você pode adicionar a primeira agora ou remover o bairro, se não for mais necessário."
            : "Esta cidade ainda não possui bairros cadastrados. Comece adicionando o primeiro bairro agora."}
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition"
          >
            <Plus className="w-4 h-4" />
            {isStreet ? "Adicionar rua" : "Adicionar bairro"}
          </button>

          {isStreet && onDelete && (
            <button
              onClick={onDelete}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-white/10 rounded-lg hover:bg-gray-300 dark:hover:bg-white/20 transition"
            >
              <Trash2 className="w-4 h-4" />
              Remover bairro
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
