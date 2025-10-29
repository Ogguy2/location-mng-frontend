import React from "react";
import EditLocatairePage from "../../_components/pages/EditLocatairePage";
import QueryProvider from "@/components/provider";

export default async function Page({
  params,
}: {
  params: Promise<{ idlocataire: string }>;
}) {
  const { idlocataire } = await params;
  return (
    <QueryProvider>
      <EditLocatairePage locataireId={idlocataire} />
    </QueryProvider>
  );
}
