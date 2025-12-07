"use client";
import { ContentPage } from "@/components/layouts/page-layout";
import { getEntityRoute } from "@/lib/actions.utils";
import React from "react";
import { useLoc } from "@/components/hooks/useLoc";
import FormGeneric from "@/components/forms/FormGeneric";
import { useEntityOperations } from "@/hooks/useEntityOperations";
import { useEntityActions } from "@/hooks/useEntityActions";
import { ActionProps } from "@/lib/actions.utils";

interface GenericEditPageProps extends ActionProps {
  entityName: string; // "locataire", "logement", etc.
  entityId: string;
}

export default function GenericEditPage({
  entityName,
  entityId,
  useDefaultActions = true,
  additionalActions,
  customActions,
  actionReady,
  onDelete,
}: GenericEditPageProps) {
  const { config, update } = useEntityOperations(entityName);
  const [form, setForm] = React.useState<any>(null);
  // Récupérer les données de l'entité
  const { data } = useLoc({
    key: `${entityName}-${entityId}`,
    endpoint: `${config.endpoint}/${entityId}`,
  });

  const handleSubmit = async (value: any) => {
    const result = await update(entityId, value);
  };

  // Utiliser le hook pour gérer les actions
  const actions = useEntityActions("edit", entityName, entityId, form, {
    useDefaultActions,
    additionalActions,
    customActions,
    actionReady,
    onDelete,
  });

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
            {/*{JSON.stringify(data.logementId)}*/}
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
