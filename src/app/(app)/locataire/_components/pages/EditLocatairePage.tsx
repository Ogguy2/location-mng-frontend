"use client";
import GenericEditPage from "@/components/pages/GenericEditPage";
import { FileText, Send } from "lucide-react";

interface ViewLocatairePageProps {
  locataireId: string;
}

export default function EditLocatairePage({
  locataireId,
}: ViewLocatairePageProps) {
  return (
    <GenericEditPage
      entityName="locataire"
      entityId={locataireId}
      // Exemple d'actions additionnelles spécifiques au locataire
      // additionalActions={[
      //   {
      //     title: "Générer Contrat",
      //     icon: <FileText />,
      //     type: "custom",
      //     action: () => {
      //       // console.log(
      //       //   "Génération du contrat pour le locataire:",
      //       //   locataireId
      //       // );
      //       // Logique de génération de contrat
      //     },
      //   },
      //   {
      //     title: "Envoyer Email",
      //     icon: <Send />,
      //     type: "custom",
      //     action: () => {
      //       // console.log("Envoi d'email au locataire:", locataireId);
      //       // Logique d'envoi d'email
      //     },
      //   },
      // ]}
    />
  );
}
