import React from "react";
import GenericEditPage from "@/components/pages/GenericEditPage";
import QueryProvider from "@/components/provider";
import { FileText, Send } from "lucide-react";
import EditLocatairePage from "../../_components/pages/EditLocatairePage";

export default async function Page({
  params,
}: {
  params: Promise<{ idlocataire: string }>;
}) {
  const { idlocataire } = await params;
  return <EditLocatairePage locataireId={idlocataire} />;
}
