import React from "react";
import GenericEditPage from "@/components/pages/GenericEditPage";
import QueryProvider from "@/components/provider";
import { FileText, Send } from "lucide-react";

export default async function Page({
  params,
}: {
  params: Promise<{ idlocataire: string }>;
}) {
  const { idlocataire } = await params;
  
  return (
    <QueryProvider>
      <GenericEditPage 
        entityName="locataire" 
        entityId={idlocataire}
        // Exemple d'actions additionnelles spécifiques au locataire
        additionalActions={[
          {
            title: "Générer Contrat",
            icon: <FileText />,
            type: "custom",
            action: () => {
              console.log("Génération du contrat pour le locataire:", idlocataire);
              // Logique de génération de contrat
            }
          },
          {
            title: "Envoyer Email",
            icon: <Send />,
            type: "custom", 
            action: () => {
              console.log("Envoi d'email au locataire:", idlocataire);
              // Logique d'envoi d'email
            }
          }
        ]}
      />
    </QueryProvider>
  );
}
