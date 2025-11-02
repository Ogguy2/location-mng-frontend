"use client";
import GenericEditPage from "@/components/pages/GenericEditPage";

interface ViewLocatairePageProps {
  locataireId: string;
}

export default function EditLocatairePage({
  locataireId,
}: ViewLocatairePageProps) {
  return <GenericEditPage entityName="locataire" entityId={locataireId} />;
}
