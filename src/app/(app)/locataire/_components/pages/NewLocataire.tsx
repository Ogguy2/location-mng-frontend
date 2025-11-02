"use client";
import { ContentPage } from "@/components/layouts/page-layout";
import { Save, X } from "lucide-react";
import { route } from "@/lib/route";
import getData from "@/lib/getData";
import { Action } from "@/types/actions";
import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { fetchSuccess } from "@/app/constants/httpCode";
import { authStore } from "@/app/store/auth.store";
import FormLocataire from "../FormLocataire";

export default function NewLocataire() {
  const user = authStore((state: any) => state.user);
  const router = useRouter();
  const [form, setForm] = React.useState<any>(null);

  const handleSubmit = async (value: any) => {
    const response = await getData({
      endpoint: `/locataires`,
      method: "POST",
      data: {
        ...value,
        proprietaireId: user.id,
      },
    });
    if (fetchSuccess(response.status)) {
      toast.success("Locataire créé avec succès!");
      router.push(route("locataire"));
    } else {
      toast.error("Échec de la création du locataire.");
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
      href: route("locataire"),
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
              label: "Nouveau locataire",
              href: "#",
            },
          ]}
          title="Nouveau locataire"
          actions={actions}
        />
        {/* Body page with content an table and other */}
        <ContentPage.Body className="">
          <FormLocataire
            mode="create"
            onSubmit={handleSubmit}
            onFormReady={setForm}
          />
        </ContentPage.Body>
        {/* {error && <div>Error fetching locataire data</div>} */}
      </ContentPage>
    </div>
  );
}
