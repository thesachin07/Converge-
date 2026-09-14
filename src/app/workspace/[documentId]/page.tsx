import DocumentEditor from "@/components/editor/document-editor";

type DocumentPageProps = {
  params: Promise<{ documentId: string }>;
};

export default async function DocumentPage({ params }: DocumentPageProps) {
  const { documentId } = await params;

  return <DocumentEditor documentId={documentId} />;
}