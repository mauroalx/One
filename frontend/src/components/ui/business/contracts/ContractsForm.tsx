'use client';

import React, { useEffect, useState } from 'react';
import { Eye, Maximize2, Minimize2, Variable } from 'lucide-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import clsx from 'clsx';
import Toolbar from '@/components/common/RichTextEditorToolbar';

export type ContractFormData = {
  name: string;
  months: string;
  type: string;
  content: string;
  status?: string; // Adicionado para compatibilidade com o backend
};

type ContractsFormProps = {
  initialData?: Partial<ContractFormData>;
  onSubmit: (data: ContractFormData) => void;
  isSubmitting?: boolean;
};

const variables = [
  "$nome_completo", "$cpf", "$rg", "$endereco",
  "$cidade", "$telefone", "$email"
];

const ContractsForm: React.FC<ContractsFormProps> = ({
  initialData = {},
  onSubmit,
  isSubmitting = false,
}) => {
  const [form, setForm] = useState<ContractFormData>({
    name: initialData.name || '',
    months: initialData.months || '12',
    type: initialData.type || 'PF',
    content: initialData.content || '',
    status: initialData.status || 'draft',
  });

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, Underline, Link.configure({ openOnClick: false })],
    content: form.content,
    editorProps: {
      attributes: {
        class: "min-h-[400px] w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 prose-sm max-w-none",
      },
    },
    onUpdate: ({ editor }) => {
      setForm((prev) => ({ ...prev, content: editor.getHTML() }));
    },
  });

  useEffect(() => {
    if (editor && initialData.content) {
      editor.commands.setContent(initialData.content);
    }
  }, [editor, initialData.content]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
    let content = editor?.getHTML() || '';
    Object.entries(mockData).forEach(([k, v]) => {
      content = content.replaceAll(k, v);
    });
    return content;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className={clsx("space-y-6", isFullscreen && "fixed inset-0 z-999999 p-6 overflow-auto bg-white dark:bg-gray-900")}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Modelo de Contrato</h2>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setPreviewMode((prev) => !prev)}
            className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium text-white bg-brand-500 rounded-lg"
          >
            <Eye className="w-4 h-4 mr-2" /> {previewMode ? "Esconder Prévia" : "Pré-visualizar"}
          </button>
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium text-white bg-brand-500 rounded-lg"
          >
            {isFullscreen ? <><Minimize2 className="w-4 h-4 mr-2" /> Sair Tela Cheia</> : <><Maximize2 className="w-4 h-4 mr-2" /> Tela Cheia</>}
          </button>
          {!isFullscreen && (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium text-white bg-brand-500 rounded-lg"
            >
              {isSubmitting ? 'Salvando...' : 'Salvar Modelo'}
            </button>
          )}
        </div>
      </div>

    <div className="grid md:grid-cols-4 gap-4 border rounded-xl p-5 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800">
    <div>
        <label className="text-sm font-medium text-gray-700 dark:text-white mb-1 block">Nome</label>
        <input
        name="name"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full rounded-lg border p-2 text-sm bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white"
        />
    </div>

    <div>
        <label className="text-sm font-medium text-gray-700 dark:text-white mb-1 block">Vigência (meses)</label>
        <select
        name="months"
        value={form.months}
        onChange={handleChange}
        className="w-full rounded-lg border p-2 text-sm bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white"
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
        className="w-full rounded-lg border p-2 text-sm bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white"
        >
        <option value="PF">Pessoa Física</option>
        <option value="PJ">Pessoa Jurídica</option>
        <option value="custom">Customizado</option>
        </select>
    </div>

    <div>
        <label className="text-sm font-medium text-gray-700 dark:text-white mb-1 block">Status</label>
        <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full rounded-lg border p-2 text-sm bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white"
        >
        <option value="draft">Rascunho</option>
        <option value="active">Ativo</option>
        <option value="archived">Arquivado</option>
        </select>
    </div>
    </div>


      <div className="border border-dashed rounded-lg p-4 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-3 text-sm font-medium text-gray-700 dark:text-white">
          <Variable className="w-4 h-4 text-brand-500" />
          Variáveis Disponíveis:
        </div>
        <div className="flex flex-wrap gap-2">
          {variables.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => insertVariable(v)}
              className="px-2 py-1 text-xs bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white rounded-lg font-mono hover:bg-gray-200 dark:hover:bg-white/20"
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {!previewMode && editor && (
        <>
          <Toolbar editor={editor} />
          <EditorContent editor={editor} />
        </>
      )}

      {previewMode && (
        <div className="p-4 border rounded-lg bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: getPreviewContent() }} />
        </div>
      )}
    </form>
  );
};

export default ContractsForm;
