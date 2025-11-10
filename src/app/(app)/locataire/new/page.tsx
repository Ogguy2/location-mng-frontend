import React from "react";
import QueryProvider from "@/components/provider";
import GenericCreatePage from "@/components/pages/GenericCreatePage";
import { UserPlus, Settings } from "lucide-react";

export default async function Page() {
  return (
    <QueryProvider>
      <GenericCreatePage 
        entityName="locataire"
        // Exemple de callback personnalisé pour modifier les actions par défaut
        onActionsReady={(defaultActions, form) => {
          // Modifier les actions par défaut
          const customizedActions = defaultActions.map(action => {
            if (action.title === "Enregistrer") {
              return {
                ...action,
                title: "Créer Locataire",
                icon: <UserPlus />
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
            }
          });

          return customizedActions;
        }}
      />
    </QueryProvider>
  );
}
