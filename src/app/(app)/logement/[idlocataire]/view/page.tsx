import React from "react";
import ViewLocatairePage from "../../_components/pages/ViewLocatairePage";
import QueryProvider from "@/components/provider";

export default async function Page({
  params,
}: {
  params: Promise<{ idlocataire: string }>;
}) {
  const { idlocataire } = await params;
  return (
    <QueryProvider>
      <ViewLocatairePage locataireId={idlocataire} />
    </QueryProvider>
  );
}
