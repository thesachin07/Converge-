"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { EditorContent, useEditor } from "@tiptap/react";
import LinkExtension from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Code2,
  Heading1,
  Heading2,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Undo2,
} from "lucide-react";

type DocumentEditorProps = {
  documentId: string;
};

type ToolbarButtonProps = {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
};

const initialContent = `
  <p>Project brief</p>
  <h1>A clearer way to work together</h1>
  <p>Converge gives teams a calm, shared space for thinking, writing, and making decisions together.</p>
  <p>Our work should feel connected from the first idea to the final decision. This document brings the central context into one place so the team can move with clarity.</p>
  <h2>What we are solving</h2>
  <p>Important conversations are often scattered across tools, tabs, and meeting notes. Converge makes the document the shared source of truth while leaving room for the work to evolve.</p>
  <ul>
    <li>Keep decisions close to the context that shaped them.</li>
    <li>Make progress visible without adding noise.</li>
    <li>Give every contributor a clear place to start.</li>
  </ul>
  <h2>Next steps</h2>
  <p>Align on the first shared workflow, then refine the experience through real team use.</p>
`;

function ToolbarButton({ label, active, disabled, onClick, children }: ToolbarButtonProps) {
  return (
    <button
      aria-label={label}
      aria-pressed={active}
      className={`toolbar-button ${active ? "bg-[#dfe8f2] text-[#263b56]" : ""}`}
      disabled={disabled}
      onClick={onClick}
      title={label}
      type="button"
    >
      {children}
    </button>
  );
}

export default function DocumentEditor({ documentId }: DocumentEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExtension.configure({
        autolink: true,
        openOnClick: false,
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: "editor-content focus:outline-none",
      },
    },
  });

  if (!editor) {
    return null;
  }

  const setLink = () => {
    if (editor.isActive("link")) {
      editor.chain().focus().unsetLink().run();
      return;
    }

    const url = window.prompt("Enter a URL");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f6f8] text-[#1f2937]" data-document-id={documentId}>
      <header className="flex h-16 items-center justify-between border-b border-[#e3e7ed] bg-white px-6">
        <div className="flex items-center gap-8">
          <Link className="text-lg font-semibold tracking-[-0.02em] text-[#172033]" href="/">
            converge
          </Link>
          <div className="hidden items-center gap-2 text-sm text-[#8490a3] md:flex">
            <span>Workspace</span>
            <span aria-hidden="true">/</span>
            <span className="text-[#3d485b]">Documents</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-[#8993a3] sm:inline">Saved just now</span>
          <button aria-label="Share document" className="rounded-md border border-[#dce1e8] px-3 py-2 text-sm font-medium text-[#3d485b] transition hover:bg-[#f7f8fa]" title="Share document" type="button">
            Share
          </button>
          <button aria-label="Open document menu" className="flex h-9 w-9 items-center justify-center rounded-md text-lg text-[#687386] transition hover:bg-[#f2f4f7]" title="More options" type="button">
            <span aria-hidden="true">...</span>
          </button>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dce8f4] text-xs font-semibold text-[#315170]">JD</div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-4rem)]">
        <aside className="hidden w-64 shrink-0 border-r border-[#e3e7ed] bg-[#fafbfc] px-4 py-6 lg:block">
          <div className="mb-7 flex items-center justify-between px-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9aa3b1]">Documents</span>
            <button aria-label="Create a new document" className="text-xl leading-none text-[#7c8798] hover:text-[#273449]" title="New document" type="button">+</button>
          </div>
          <nav aria-label="Document navigation" className="space-y-1">
            <a className="block rounded-md bg-[#e9eef5] px-3 py-2.5 text-sm font-medium text-[#263b56]" href="#document">Project brief</a>
            <a className="block rounded-md px-3 py-2.5 text-sm text-[#667286] hover:bg-[#f0f2f5]" href="#notes">Research notes</a>
            <a className="block rounded-md px-3 py-2.5 text-sm text-[#667286] hover:bg-[#f0f2f5]" href="#roadmap">Product roadmap</a>
          </nav>
          <div className="mt-auto pt-10">
            <div className="border-t border-[#e5e8ed] px-2 pt-5 text-xs leading-5 text-[#929baa]">
              Private workspace
              <br />
              Last edited today
            </div>
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col" aria-label="Document editor">
          <div className="flex min-h-14 items-center justify-between border-b border-[#e3e7ed] bg-white px-5 sm:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <span className="text-sm text-[#9aa3b1]">Untitled</span>
              <span aria-hidden="true" className="text-[#c6cbd3]">/</span>
              <input aria-label="Document title" className="w-40 truncate border-0 bg-transparent p-0 text-sm font-medium text-[#29364a] outline-none sm:w-64" defaultValue="Project brief" />
            </div>
            <div className="hidden items-center gap-1.5 text-xs text-[#9aa3b1] sm:flex"><span className="h-2 w-2 rounded-full bg-[#75b89a]" />Synced</div>
          </div>

          <div className="flex items-center justify-center border-b border-[#e3e7ed] bg-white px-4 py-3">
            <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-md border border-[#e4e7ec] bg-[#fafbfc] p-1">
              <ToolbarButton label="Undo" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}><Undo2 size={16} /></ToolbarButton>
              <ToolbarButton label="Redo" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}><Redo2 size={16} /></ToolbarButton>
              <span className="mx-1 h-5 w-px shrink-0 bg-[#e1e5ea]" />
              <ToolbarButton label="Heading 1" active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}><Heading1 size={16} /></ToolbarButton>
              <ToolbarButton label="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 size={16} /></ToolbarButton>
              <ToolbarButton label="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><Bold size={16} /></ToolbarButton>
              <ToolbarButton label="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic size={16} /></ToolbarButton>
              <ToolbarButton label="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}><List size={16} /></ToolbarButton>
              <ToolbarButton label="Ordered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered size={16} /></ToolbarButton>
              <ToolbarButton label="Blockquote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote size={16} /></ToolbarButton>
              <ToolbarButton label="Code block" active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}><Code2 size={16} /></ToolbarButton>
              <ToolbarButton label="Link" active={editor.isActive("link")} onClick={setLink}><Link2 size={16} /></ToolbarButton>
            </div>
          </div>

          <article className="mx-auto my-8 w-[min(100%-2rem,52rem)] bg-white px-7 py-12 shadow-[0_2px_10px_rgba(25,39,58,0.06)] sm:px-16 sm:py-16" id="document">
            <EditorContent editor={editor} />
            <div className="mt-14 border-t border-[#edf0f3] pt-5 text-xs text-[#a0a8b4]">Updated today by Jordan Davis</div>
          </article>
        </section>
      </div>
    </main>
  );
}