"use client";
import GenericCreatePage from "@/components/pages/GenericCreatePage";
import { Settings, UserPlus } from "lucide-react";

export default function NewLocataire() {
  return (
    <GenericCreatePage
      entityName="locataire"
      // Exemple de callback personnalisé pour modifier les actions par défaut
      actionReady={(defaultActions, form) => {
        // Modifier les actions par défaut
        const customizedActions = defaultActions.map((action) => {
          if (action.title === "Enregistrer") {
            return {
              ...action,
              title: "Créer Locataire",
              icon: <UserPlus />,
            };
          }
          return action;
        });

        // Ajouter une action spécifique
        customizedActions.push({
          title: "Avancé",
          icon: <Settings />,
          type: "custom",
          action: () => {
            console.log("Configuration avancée du locataire");
            // Logique pour paramétrage avancé
          },
        });

        return customizedActions;
      }}
    />
  );
}
