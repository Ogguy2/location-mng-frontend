"use client";
import { ContentPage } from "@/components/layouts/page-layout";
import { Plus, Save, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { route } from "@/lib/route";
import getData from "@/lib/getData";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import z from "zod";

import { Action } from "@/types/actions";
import { InputCustomData } from "@/components/layouts/form-layout";
import React from "react";

import { toast } from "sonner";
import { defaultLocataire } from "@/types/app";
import { useRouter } from "next/navigation";
import { fetchSuccess } from "@/app/constants/httpCode";
import { authStore } from "@/app/store/auth.store";
import HouseForm from "../HouseForm";

export default function NewLogement() {
  const user = authStore((state: any) => state.user);
  const [form, setForm] = React.useState<any>(null);
  const router = useRouter();

  const handleSubmit = async (value: any) => {
    console.log("Submitting", value);
    const response = await getData({
      endpoint: `/logements`,
      method: "POST",
      data: {
        ...value,
        ownerId: user.id,
      },
    });

    if (fetchSuccess(response.status)) {
      toast.success("Locataire mis à jour avec succès!");
      router.push(route("logement"));
      // return
    } else {
      console.log("Response error:", response);
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
              label: "Modifier le locataire",
              href: "#",
            },
          ]}
          title="Modification du locataire"
          actions={actions}
        />
        {/* Body page with content an table and other */}
        <ContentPage.Body className="">
          <HouseForm
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
