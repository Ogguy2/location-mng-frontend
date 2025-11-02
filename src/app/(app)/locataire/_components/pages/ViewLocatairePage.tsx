"use client";
import GenericViewPage from "@/components/pages/GenericViewPage";

interface ViewLocatairePageProps {
  locataireId: string;
}

export default function ViewLocatairePage({
  locataireId,
}: ViewLocatairePageProps) {
  return <GenericViewPage entityName="locataire" entityId={locataireId} />;
}
