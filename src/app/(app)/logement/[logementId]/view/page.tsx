import React from "react";
import QueryProvider from "@/components/provider";
import ViewLogementPage from "../../_components/pages/ViewLogementPage";

export default async function Page({
  params,
}: {
  params: Promise<{ idlocataire: string }>;
}) {
  const { idlocataire } = await params;
  return <ViewLogementPage locataireId={idlocataire} />;
}
