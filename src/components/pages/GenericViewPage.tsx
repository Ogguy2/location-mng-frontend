"use client";
import { ContentPage } from "@/components/layouts/page-layout";
import { getEntityRoute } from "@/lib/actions.utils";
import { useLoc } from "@/components/hooks/useLoc";
import FormGeneric from "@/components/forms/FormGeneric";
import { useEntityOperations } from "@/hooks/useEntityOperations";
import { useEntityActions } from "@/hooks/useEntityActions";
import { ActionProps } from "@/lib/actions.utils";

interface GenericViewPageProps extends ActionProps {
  entityName: string; // "locataire", "logement", etc.
  entityId: string;
}

export default function GenericViewPage({
  entityName,
  entityId,
  useDefaultActions = true,
  additionalActions,
  customActions,
  actionReady,
  onDelete,
}: GenericViewPageProps) {
  const { config, remove } = useEntityOperations(entityName);

  // Récupérer les données de l'entité
  const { data } = useLoc({
    key: `${entityName}-detail-${entityId}`,
    endpoint: `${config.endpoint}/${entityId}`,
  });

  const handleDelete = async () => {
    const result = await remove(entityId);
    if (result.success) {
      // Optionnellement rediriger vers la liste après suppression
      window.location.href = getEntityRoute(entityName);
    }
  };

  // Utiliser le hook pour gérer les actions
  const actions = useEntityActions(
    "view",
    entityName,
    entityId,
    undefined,
    {
      useDefaultActions,
      additionalActions,
      customActions,
      actionReady,
      onDelete: onDelete || handleDelete,
    }
  );

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
              label: `Détails du ${config.displayName.toLowerCase()}`,
              href: "#",
            },
          ]}
          title={config.displayName}
          actions={actions}
        />
        <ContentPage.Body className="">
          <FormGeneric entityConfig={config} mode="view" initialData={data} />
        </ContentPage.Body>
      </ContentPage>
    </div>
  );
}
