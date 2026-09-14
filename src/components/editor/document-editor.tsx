import Link from "next/link";

type DocumentEditorProps = {
  documentId: string;
};

const toolbarItems = ["B", "I", "U", "S", "Link", "List", "Quote"];

export default function DocumentEditor({ documentId }: DocumentEditorProps) {
  return (
    <main
      className="min-h-screen bg-[#f5f6f8] text-[#1f2937]"
      data-document-id={documentId}
    >
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
          <button
            aria-label="Share document"
            className="rounded-md border border-[#dce1e8] px-3 py-2 text-sm font-medium text-[#3d485b] transition hover:bg-[#f7f8fa]"
            title="Share document"
            type="button"
          >
            Share
          </button>
          <button
            aria-label="Open document menu"
            className="flex h-9 w-9 items-center justify-center rounded-md text-lg text-[#687386] transition hover:bg-[#f2f4f7]"
            title="More options"
            type="button"
          >
            <span aria-hidden="true">...</span>
          </button>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dce8f4] text-xs font-semibold text-[#315170]">
            JD
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-4rem)]">
        <aside className="hidden w-64 shrink-0 border-r border-[#e3e7ed] bg-[#fafbfc] px-4 py-6 lg:block">
          <div className="mb-7 flex items-center justify-between px-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9aa3b1]">
              Documents
            </span>
            <button
              aria-label="Create a new document"
              className="text-xl leading-none text-[#7c8798] hover:text-[#273449]"
              title="New document"
              type="button"
            >
              +
            </button>
          </div>
          <nav aria-label="Document navigation" className="space-y-1">
            <a className="block rounded-md bg-[#e9eef5] px-3 py-2.5 text-sm font-medium text-[#263b56]" href="#document">
              Project brief
            </a>
            <a className="block rounded-md px-3 py-2.5 text-sm text-[#667286] hover:bg-[#f0f2f5]" href="#notes">
              Research notes
            </a>
            <a className="block rounded-md px-3 py-2.5 text-sm text-[#667286] hover:bg-[#f0f2f5]" href="#roadmap">
              Product roadmap
            </a>
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
              <input
                aria-label="Document title"
                className="w-40 truncate border-0 bg-transparent p-0 text-sm font-medium text-[#29364a] outline-none sm:w-64"
                defaultValue="Project brief"
              />
            </div>
            <div className="hidden items-center gap-1.5 text-xs text-[#9aa3b1] sm:flex">
              <span className="h-2 w-2 rounded-full bg-[#75b89a]" />
              Synced
            </div>
          </div>

          <div className="flex items-center justify-center border-b border-[#e3e7ed] bg-white px-4 py-3">
            <div className="flex items-center gap-1 rounded-md border border-[#e4e7ec] bg-[#fafbfc] p-1">
              <button aria-label="Undo" className="toolbar-button" title="Undo" type="button">↶</button>
              <button aria-label="Redo" className="toolbar-button" title="Redo" type="button">↷</button>
              <span className="mx-1 h-5 w-px bg-[#e1e5ea]" />
              <button className="toolbar-select" type="button">Normal text <span aria-hidden="true">⌄</span></button>
              <button className="toolbar-select hidden sm:flex" type="button">Sans serif <span aria-hidden="true">⌄</span></button>
              {toolbarItems.map((item) => (
                <button className="toolbar-button hidden md:flex" key={item} type="button">
                  {item}
                </button>
              ))}
            </div>
          </div>

          <article
            className="mx-auto my-8 w-[min(100%-2rem,52rem)] bg-white px-7 py-12 shadow-[0_2px_10px_rgba(25,39,58,0.06)] sm:px-16 sm:py-16"
            id="document"
          >
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#9aa3b1]">Project brief</p>
            <h1 className="mb-5 text-4xl font-semibold tracking-[-0.04em] text-[#172033] sm:text-5xl">A clearer way to work together</h1>
            <p className="mb-10 max-w-2xl text-lg leading-8 text-[#687386]">
              Converge gives teams a calm, shared space for thinking, writing, and making decisions together.
            </p>
            <div className="space-y-6 text-[15px] leading-7 text-[#3f4b5e]">
              <p>
                Our work should feel connected from the first idea to the final decision. This document brings the central context into one place so the team can move with clarity.
              </p>
              <h2 className="pt-4 text-xl font-semibold tracking-[-0.02em] text-[#202c40]">What we are solving</h2>
              <p>
                Important conversations are often scattered across tools, tabs, and meeting notes. Converge makes the document the shared source of truth while leaving room for the work to evolve.
              </p>
              <ul className="list-disc space-y-2 pl-6 marker:text-[#91a0b1]">
                <li>Keep decisions close to the context that shaped them.</li>
                <li>Make progress visible without adding noise.</li>
                <li>Give every contributor a clear place to start.</li>
              </ul>
              <h2 className="pt-4 text-xl font-semibold tracking-[-0.02em] text-[#202c40]">Next steps</h2>
              <p>
                Align on the first shared workflow, then refine the experience through real team use.
              </p>
            </div>
            <div className="mt-14 border-t border-[#edf0f3] pt-5 text-xs text-[#a0a8b4]">Updated today by Jordan Davis</div>
          </article>
        </section>
      </div>
    </main>
  );
}