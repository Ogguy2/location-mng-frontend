"use client";
import { ContentPage } from "@/components/layouts/page-layout";
import { Save, X } from "lucide-react";
import { route } from "@/lib/route";
import getData from "@/lib/getData";
import z from "zod";

import { Action } from "@/types/actions";
import React from "react";

import { toast } from "sonner";
import { fetchSuccess } from "@/app/constants/httpCode";
import { useLoc } from "@/components/hooks/useLoc";
import HouseForm from "../HouseForm";

interface ViewLocatairePageProps {
  logementId: string;
}
interface useLocProps {
  endpoint: string;
  logementId: string;
}

export default function EditLogementPage({
  logementId,
}: ViewLocatairePageProps) {
  const [form, setForm] = React.useState<any>(null);

  const { data } = useLoc({
    key: "logements" + logementId,
    endpoint: "/logements/" + logementId,
  });

  const handleSubmit = async (value: any) => {
    console.log("Submitting", value);
    const response = await getData({
      endpoint: `/logements/${logementId}`,
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
      action: () => form.handleSubmit(),
    },
    {
      title: "Annuler",
      icon: <X />,
      type: "url",
      href: route("logement.view", { logementId: logementId }),
    },
  ];
  return (
    <div className="">
      <ContentPage>
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
        <ContentPage.Body className="">
          <HouseForm
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
