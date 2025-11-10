import React from "react";
import GenericViewPage from "@/components/pages/GenericViewPage";
import QueryProvider from "@/components/provider";
import ViewLocatairePage from "../../_components/pages/ViewLocatairePage";

export default async function Page({
  params,
}: {
  params: Promise<{ idlocataire: string }>;
}) {
  const { idlocataire } = await params;
  return <ViewLocatairePage locataireId={idlocataire} />;
}
