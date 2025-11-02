"use client";
import { ContentPage } from "@/components/layouts/page-layout";
import { CornerDownLeft, Pencil, Trash } from "lucide-react";
import { route } from "@/lib/route";
import { Action } from "@/types/actions";
import { useLoc } from "@/components/hooks/useLoc";
import FormGeneric from "@/components/forms/FormGeneric";
import { useEntityOperations } from "@/hooks/useEntityOperations";

// Helper pour gérer les routes dynamiquement
const getEntityRoute = (entityName: string): any => {
  if (entityName === "locataire") return route("locataire");
  if (entityName === "logement") return route("logement");
  return "/";
};

const getEntityEditRoute = (entityName: string, id: string): any => {
  if (entityName === "locataire") return route("locataire.custom", { idlocataire: id });
  if (entityName === "logement") return route("logement.custom", { logementId: id });
  return "/";
};

interface GenericViewPageProps {
  entityName: string; // "locataire", "logement", etc.
  entityId: string;
}

export default function GenericViewPage({
  entityName,
  entityId,
}: GenericViewPageProps) {
  const { config, remove } = useEntityOperations(entityName);

  // Récupérer les données de l'entité
  const { data } = useLoc({
    key: `${entityName}-detail-${entityId}`,
    endpoint: `${config.endpoint}/${entityId}`,
  });

  const actions: Action[] = [
    {
      title: "Retour à la liste",
      icon: <CornerDownLeft />,
      type: "url",
      href: getEntityRoute(entityName),
    },
    {
      title: `Éditer ${config.displayName.toLowerCase()}`,
      icon: <Pencil />,
      type: "url",
      href: getEntityEditRoute(entityName, entityId),
    },
    {
      title: `Supprimer ${config.displayName.toLowerCase()}`,
      icon: <Trash />,
      type: "confirm",
      href: "#",
      action: async () => {
        await remove(entityId);
        // Optionnellement rediriger vers la liste après suppression
        // window.location.href = getEntityRoute(entityName);
      },
    },
  ];

  return (
    <div className="">
      <ContentPage>
        <ContentPage.Header
          crumb={[
            { label: config.displayName + "s", href: getEntityRoute(entityName) },
            {
              label: `Détails du ${config.displayName.toLowerCase()}`,
              href: "#",
            },
          ]}
          title={config.displayName}
          actions={actions}
        />
        <ContentPage.Body className="">
          <FormGeneric
            entityConfig={config}
            mode="view"
            initialData={data}
          />
        </ContentPage.Body>
      </ContentPage>
    </div>
  );
}