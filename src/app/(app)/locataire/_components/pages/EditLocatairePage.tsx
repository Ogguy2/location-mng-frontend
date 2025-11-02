"use client";
import { ContentPage } from "@/components/layouts/page-layout";
import { Save, X } from "lucide-react";
import { route } from "@/lib/route";
import getData from "@/lib/getData";
import { Action } from "@/types/actions";
import React from "react";
import { toast } from "sonner";
import { fetchSuccess } from "@/app/constants/httpCode";
import { useLoc } from "@/components/hooks/useLoc";
import FormLocataire from "../FormLocataire";

interface ViewLocatairePageProps {
  locataireId: string;
}

export default function EditLocatairePage({
  locataireId,
}: ViewLocatairePageProps) {
  const { data } = useLoc({
    key: "locataires" + locataireId,
    endpoint: "/locataires/" + locataireId,
  });
  const [form, setForm] = React.useState<any>(null);

  const handleSubmit = async (value: any) => {
    const response = await getData({
      endpoint: `/locataires/${locataireId}`,
      method: "PATCH",
      data: value,
    });
    if (fetchSuccess(response.status)) {
      toast.success("Locataire mis à jour avec succès!");
    } else {
      toast.error("Échec de la mise à jour du locataire.");
    }
  };

  const actions: Action[] = [
    {
      title: "Sauvegarder",
      icon: <Save />,
      type: "saveAction",
      href: route("locataire"),
      action: () => {
        if (form) {
          form.handleSubmit();
        }
      },
    },
    {
      title: "Annuler",
      icon: <X />,
      type: "url",
      href: route("locataire.view", { idlocataire: locataireId }),
    },
  ];
  return (
    <div className="">
      {/* <Button onClick={() => form.handleSubmit()}>ddd</Button> */}
      <ContentPage>
        {/* {locataireId} */}
        {/* Header page with action and crumb */}
        <ContentPage.Header
          crumb={[
            { label: "Locataires", href: route("locataire") },
            {
              label: "Modifier le locataire",
              href: "#",
            },
          ]}
          title="Modification du locataire"
          actions={actions}
        />
        {/* Body page with content an table and other */}
        <ContentPage.Body className="">
          <FormLocataire
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
