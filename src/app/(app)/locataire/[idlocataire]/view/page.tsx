import React from "react";
import GenericViewPage from "@/components/pages/GenericViewPage";
import QueryProvider from "@/components/provider";

export default async function Page({
  params,
}: {
  params: Promise<{ idlocataire: string }>;
}) {
  const { idlocataire } = await params;
  
  return (
    <QueryProvider>
      <GenericViewPage 
        entityName="locataire" 
        entityId={idlocataire}
        // Utilise les actions par défaut (View, Edit, Delete, Back)
        useDefaultActions={true}
      />
    </QueryProvider>
  );
}
