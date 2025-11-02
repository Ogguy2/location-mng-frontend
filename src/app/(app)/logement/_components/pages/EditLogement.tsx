"use client";
import GenericEditPage from "@/components/pages/GenericEditPage";

interface ViewLogementPageProps {
  logementId: string;
}
export default function EditLogement({
  logementId,
}: ViewLogementPageProps) {
  return <GenericEditPage entityName="logement" entityId={logementId} />;
}
