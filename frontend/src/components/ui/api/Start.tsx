"use client";
import { Plus } from "lucide-react";

export default function Start() {
  return (
    <div className="rounded-2xl p-6 min-h-[400px] flex items-center justify-center">
      <div className="text-center space-y-4 max-w-md">
        {/* Ícone ilustrativo */}
        <div className="mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-brand-100 dark:bg-white/10">
          <Plus className="w-10 h-10 text-brand-500" />
        </div>

        {/* Título */}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Nenhum token criado
        </h2>

        {/* Mensagem explicativa */}
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Você ainda não criou nenhum token de API. Clique no botão abaixo para gerar seu primeiro token e começar a integração.
        </p>

        {/* Botão de ação */}
        <button className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition dark:bg-gray-700 dark:hover:bg-gray-600">
          <Plus className="w-4 h-4" />
          Criar token
        </button>
      </div>
    </div>
  );
}
