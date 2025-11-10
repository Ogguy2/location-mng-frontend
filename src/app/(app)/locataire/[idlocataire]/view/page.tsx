import React from "react";
import ViewLocatairePage from "../../_components/pages/ViewLocatairePage";

export default async function Page({
  params,
}: {
  params: Promise<{ idlocataire: string }>;
}) {
  const { idlocataire } = await params;
  return <ViewLocatairePage locataireId={idlocataire} />;
}
