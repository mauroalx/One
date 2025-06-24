"use client";

import React, { useState } from "react";
import { Plus, Variable, ExternalLink, Maximize2, Minimize2, Eye } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Toolbar from "./RichTextEditorToolbar";
import clsx from "clsx";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const variables = [
  "$nome_completo",
  "$cpf",
  "$rg",
  "$endereco",
  "$cidade",
  "$telefone",
  "$email",
];

const ContractsCardsCreate: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const { token } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();  // importa do next/navigation
  const [form, setForm] = useState({
    name: "",
    months: "12",
    type: "PF",
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
    ],
    editorProps: {
      attributes: {
        class:
          "min-h-[400px] w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 prose-sm max-w-none",
      },
    },
    content: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!editor) return;

    setIsSubmitting(true); // inicia loading

    const payload = {
      name: form.name,
      type: form.type,
      months: parseInt(form.months),
      content: editor.getHTML(),
      status: "draft"
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/v1/contract/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Erro ao criar contrato");

      const data = await res.json();
      console.log("Contrato criado:", data);

      router.push("/business/contracts");
    } catch (err) {
      console.error(err);
      alert("Falha ao criar contrato.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const insertVariable = (variable: string) => {
    if (!editor) return;
    editor.chain().focus().insertContent(variable).run();
  };

  const mockData = {
    "$nome_completo": "João da Silva",
    "$cpf": "123.456.789-00",
    "$rg": "MG-12.345.678",
    "$endereco": "Rua das Flores, 123",
    "$cidade": "Fortaleza",
    "$telefone": "(85) 99999-0000",
    "$email": "joao.silva@email.com",
  };

  const getPreviewContent = () => {
    let content = editor?.getHTML() || "";
    Object.entries(mockData).forEach(([variable, value]) => {
      content = content.replaceAll(variable, value);
    });
    return content;
  };

  return (
    <div className={clsx("space-y-6", isFullscreen && "fixed inset-0 bg-white dark:bg-gray-900 z-999999 p-6 overflow-auto")}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Criar novo modelo
        </h2>
        <div className="flex gap-3">
          <button
            className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium text-white bg-brand-500 rounded-lg dark:bg-gray-600 hover:bg-brand-600 dark:hover:bg-brand-500 transition"
            onClick={() => setPreviewMode((prev) => !prev)}
          >
            <Eye className="w-4 h-4 mr-2" /> {previewMode ? "Esconder Prévia" : "Pré-visualizar"}
          </button>
          <button
            className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium text-white bg-brand-500 rounded-lg dark:bg-gray-600 hover:bg-brand-600 dark:hover:bg-brand-500 transition"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? <><Minimize2 className="w-4 h-4 mr-2" /> Sair da tela cheia</> : <><Maximize2 className="w-4 h-4 mr-2" /> Tela Cheia</>}
          </button>
          {!isFullscreen ? <button onClick={handleSubmit} className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium text-white bg-brand-500 rounded-lg dark:bg-gray-600 hover:bg-brand-600 dark:hover:bg-brand-500 transition">
            <Plus className="w-4 h-4 mr-2" /> Salvar Modelo
          </button> : null}
        </div>
      </div>

      {/* Campos do Contrato */}
      <div className="border rounded-xl p-5 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-white mb-1 block">Nome do Contrato</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="exemplo: Contrato de Prestação de Serviços"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck="false"
              type="text"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2 text-sm text-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-white mb-1 block">Vigência (meses)</label>
            <select
              name="months"
              value={form.months}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2 text-sm text-gray-800 dark:text-white"
            >
              <option value="6">6 meses</option>
              <option value="12">12 meses</option>
              <option value="24">24 meses</option>
              <option value="36">36 meses</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-white mb-1 block">Tipo</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-2 text-sm text-gray-800 dark:text-white"
            >
              <option value="PF">Pessoa Física (PF)</option>
              <option value="PJ">Pessoa Jurídica (PJ)</option>
              <option value="custom">Customizado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Variables helper */}
      <div className="border border-dashed rounded-lg p-4 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-3 text-sm font-medium text-gray-700 dark:text-white">
          <Variable className="w-4 h-4 text-brand-500" />
          Variáveis Disponíveis:
        </div>
        <div className="flex flex-wrap gap-2">
          {variables.map((variable, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => insertVariable(variable)}
              className="px-2 py-1 text-xs bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white rounded-lg font-mono hover:bg-gray-200 dark:hover:bg-white/20 transition"
            >
              {variable}
            </button>
          ))}
          <a
            href="https://exemplo.com/docs-contratos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-brand-500 hover:underline"
          >
            Ver todos <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Editor + Preview */}
      {!previewMode && (
        <div>
          <Toolbar editor={editor} />
          <EditorContent editor={editor} />
        </div>
      )}

      {previewMode && (
        <div className="p-4 border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: getPreviewContent() }} />
        </div>
      )}
    </div>
  );
};

export default ContractsCardsCreate;
