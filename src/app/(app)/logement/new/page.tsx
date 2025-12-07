"use client";
import React from "react";
import GenericCreatePage from "@/components/pages/GenericCreatePage";
import { Settings, UserPlus } from "lucide-react";






export default function Page() {
  return (
    <GenericCreatePage
      entityName="logement"
      actionReady={(defaultActions, form) => {
        // Modifier les actions par défaut
        const customizedActions = defaultActions.map((action) => {
          if (action.title === "Enregistrer") {
            return {
              ...action,
              title: "Créer un logement",
              icon: <UserPlus />,
            };
          }
          return action;
        });

        // Ajouter une action spécifique
        // customizedActions.push({
        //   title: "Avancé",
        //   icon: <Settings />,
        //   type: "custom",
        //   action: () => {
        //     console.log("Configuration avancée du locataire");
        //   },
        // });

        return customizedActions;
      }}
    />
  );
}
