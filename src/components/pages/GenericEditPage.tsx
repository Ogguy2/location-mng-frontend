"use client";
import { ContentPage } from "@/components/layouts/page-layout";
import { Save, X } from "lucide-react";
import { route } from "@/lib/route";
import { Action } from "@/types/actions";
import React from "react";
import { useLoc } from "@/components/hooks/useLoc";
import FormGeneric from "@/components/forms/FormGeneric";
import { useEntityOperations } from "@/hooks/useEntityOperations";

// Helper pour gérer les routes dynamiquement
const getEntityRoute = (entityName: string): any => {
  if (entityName === "locataire") return route("locataire");
  if (entityName === "logement") return route("logement");
  return "/";
};

const getEntityViewRoute = (entityName: string, id: string): any => {
  if (entityName === "locataire")
    return route("locataire.view", { idlocataire: id });
  if (entityName === "logement")
    return route("logement.view", { logementId: id });
  return "/";
};

interface GenericEditPageProps {
  entityName: string; // "locataire", "logement", etc.
  entityId: string;
}

export default function GenericEditPage({
  entityName,
  entityId,
}: GenericEditPageProps) {
  const { config, update } = useEntityOperations(entityName);
  const [form, setForm] = React.useState<any>(null);

  // Récupérer les données de l'entité
  const { data } = useLoc({
    key: `${entityName}-${entityId}`,
    endpoint: `${config.endpoint}/${entityId}`,
  });

  const handleSubmit = async (value: any) => {
    console.log("XXXXXXXXXXXXXXXXXXXX", value);
    const result = await update(entityId, value);
    // Pas de redirection automatique pour permettre de continuer l'édition
  };

  const actions: Action[] = [
    {
      title: "Sauvegarder",
      icon: <Save />,
      type: "saveAction",
      href: getEntityRoute(entityName),
      action: () => {
        if (form) {
          console.log("Submitting form....................", form);
          form.handleSubmit();
        }
      },
    },
    {
      title: "Annuler",
      icon: <X />,
      type: "url",
      href: getEntityViewRoute(entityName, entityId),
    },
  ];

  return (
    <div className="">
      <ContentPage>
        <ContentPage.Header
          crumb={[
            {
              label: config.displayName + "s",
              href: getEntityRoute(entityName),
            },
            {
              label: `Modifier ${config.displayName.toLowerCase()}`,
              href: "#",
            },
          ]}
          title={`Modification du ${config.displayName.toLowerCase()}`}
          actions={actions}
        />
        <ContentPage.Body className="">
          <FormGeneric
            entityConfig={config}
            mode="edit"
            initialData={data}
            onSubmit={handleSubmit}
            onFormReady={setForm}
          />
        </ContentPage.Body>
      </ContentPage>
    </div>
  );
}
