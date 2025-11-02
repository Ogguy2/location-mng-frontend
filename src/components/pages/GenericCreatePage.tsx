"use client";
import { ContentPage } from "@/components/layouts/page-layout";
import { Save, X } from "lucide-react";
import { route } from "@/lib/route";
import { Action } from "@/types/actions";
import React from "react";
import { useRouter } from "next/navigation";
import { authStore } from "@/app/store/auth.store";
import FormGeneric from "@/components/forms/FormGeneric";
import { useEntityOperations } from "@/hooks/useEntityOperations";

// Helper pour gérer les routes dynamiquement
const getEntityRoute = (entityName: string): any => {
  if (entityName === "locataire") return route("locataire");
  if (entityName === "logement") return route("logement");
  return "/";
};

interface GenericCreatePageProps {
  entityName: string; // "locataire", "logement", "paiement", etc.
  additionalData?: Record<string, any>; // Données supplémentaires (ex: proprietaireId)
}

export default function GenericCreatePage({
  entityName,
  additionalData = {},
}: GenericCreatePageProps) {
  const user = authStore((state: any) => state.user);
  const router = useRouter();
  const [form, setForm] = React.useState<any>(null);
  const { config, create } = useEntityOperations(entityName);

  // Ajouter automatiquement l'ID utilisateur selon l'entité
  const getAdditionalData = () => {
    const baseData = { ...additionalData };
    
    if (entityName === "locataire") {
      baseData.proprietaireId = user.id;
    } else if (entityName === "logement") {
      baseData.ownerId = user.id;
    }
    
    return baseData;
  };

  const handleSubmit = async (value: any) => {
    const result = await create(value, getAdditionalData());
    
    if (result.success) {
      // Navigation basée sur l'entité
      if (entityName === "locataire") {
        router.push(route("locataire"));
      } else if (entityName === "logement") {
        router.push(route("logement"));
      } else {
        router.push("/"); // Fallback
      }
    }
  };

  const actions: Action[] = [
    {
      title: "Sauvegarder",
      icon: <Save />,
      type: "saveAction",
      href: getEntityRoute(entityName),
      action: () => {
        console.log("Submitting form....................", form);
        if (form) {
          form.handleSubmit();
        }
      },
    },
    {
      title: "Annuler",
      icon: <X />,
      type: "url",
      href: getEntityRoute(entityName),
    },
  ];

  return (
    <div className="">
      <ContentPage>
        <ContentPage.Header
          crumb={[
            { label: config.displayName + "s", href: getEntityRoute(entityName) },
            {
              label: `Nouveau ${config.displayName.toLowerCase()}`,
              href: "#",
            },
          ]}
          title={`Nouveau ${config.displayName.toLowerCase()}`}
          actions={actions}
        />
        <ContentPage.Body className="">
          <FormGeneric
            entityConfig={config}
            mode="create"
            onSubmit={handleSubmit}
            onFormReady={setForm}
          />
        </ContentPage.Body>
      </ContentPage>
    </div>
  );
}