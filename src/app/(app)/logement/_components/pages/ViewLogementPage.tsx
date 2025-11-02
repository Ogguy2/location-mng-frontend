"use client";
import GenericViewPage from "@/components/pages/GenericViewPage";

interface ViewLogementPageProps {
  logementId: string;
}

export default function ViewLogementPage({
  logementId,
}: ViewLogementPageProps) {
  return <GenericViewPage entityName="logement" entityId={logementId} />;
}
