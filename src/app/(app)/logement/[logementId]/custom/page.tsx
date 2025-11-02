import React from "react";
import EditLocatairePage from "../../_components/pages/EditLogement";

export default async function Page({
  params,
}: {
  params: Promise<{ idlocataire: string }>;
}) {
  const { idlocataire } = await params;
  return <EditLocatairePage locataireId={idlocataire} />;
}
