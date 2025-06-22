// components/RichTextEditorToolbar.tsx

"use client";

import { Editor } from "@tiptap/react";
import {
  Bold, Italic, Underline, List, ListOrdered, Quote, Heading, Link as LinkIcon
} from "lucide-react";

interface Props {
  editor: Editor | null;
}

const Toolbar: React.FC<Props> = ({ editor }) => {
  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt("Digite a URL");
    if (url) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-lg p-2 bg-white dark:bg-gray-800">
      <button onClick={() => editor.chain().focus().toggleBold().run()}
        className={`toolbar-btn ${editor.isActive("bold") ? "active" : ""}`}>
        <Bold className="w-4 h-4" />
      </button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`toolbar-btn ${editor.isActive("italic") ? "active" : ""}`}>
        <Italic className="w-4 h-4" />
      </button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`toolbar-btn ${editor.isActive("underline") ? "active" : ""}`}>
        <Underline className="w-4 h-4" />
      </button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`toolbar-btn ${editor.isActive("heading", { level: 2 }) ? "active" : ""}`}>
        <Heading className="w-4 h-4" />
      </button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`toolbar-btn ${editor.isActive("bulletList") ? "active" : ""}`}>
        <List className="w-4 h-4" />
      </button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`toolbar-btn ${editor.isActive("orderedList") ? "active" : ""}`}>
        <ListOrdered className="w-4 h-4" />
      </button>
      <button onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`toolbar-btn ${editor.isActive("blockquote") ? "active" : ""}`}>
        <Quote className="w-4 h-4" />
      </button>
      <button onClick={addLink}
        className={`toolbar-btn ${editor.isActive("link") ? "active" : ""}`}>
        <LinkIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toolbar;
