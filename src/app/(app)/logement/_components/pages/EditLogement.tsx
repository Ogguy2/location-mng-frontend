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
import { fetchSuccess } from "@/app/constants/httpCode";

const formSchema = z.object({
  fullName: z
    .string()
    .min(1, "Le nom complet doit comporter au moins 3 caractères.")
    .max(255, "Le nom complet doit comporter au maximum 255 caractères."),
  email: z.email("Adresse e-mail invalide."),
  phone: z
    .string()
    .min(10, "Le numéro de téléphone doit comporter au moins 10 chiffres.")
    .max(15, "Le numéro de téléphone doit comporter au maximum 15 chiffres."),
  startDate: z.string().nullable(),
  endDate: z.string().nullable(),
});

interface ViewLocatairePageProps {
  locataireId: string;
}
interface useLocProps {
  endpoint: string;
  locataireId: string;
}
const useLoc = ({ endpoint, locataireId }: useLocProps) =>
  useQuery({
    queryKey: [endpoint, locataireId],
    queryFn: async ({ queryKey }) => {
      const response = await getData({
        endpoint: `/${queryKey[0]}/${queryKey[1] || ""}`,
      });
      let data;
      if (fetchSuccess(response.status)) {
        return response.data;
      } else {
        throw new Error("Error fetching data");
      }
    },
  });

export default function EditLogementPage({
  locataireId,
}: ViewLocatairePageProps) {
  const { data } = useLoc({ endpoint: "locataires", locataireId });
  const [errorSubmit, setErrorSubmit] = React.useState<Record<string, string>>(
    {}
  );

  const form = useForm({
    defaultValues: data || null,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
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
    },
  });

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
          {/* {JSON.stringify(data)} */}
          {/* {JSON.stringify(error)} */}
          <div className="w-full">
            <form
              id="bug-report-form"
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
            >
              <FieldGroup className="grid grid-cols-3">
                {[
                  { name: "fullName", label: "Nom complet", type: "text" },
                  { name: "email", label: "Adresse e-mail", type: "email" },
                  { name: "phone", label: "Numéro de téléphone", type: "tel" },
                  { name: "startDate", label: "Début du bail", type: "date" },
                  {
                    name: "endDate",
                    label: "Date de fin du bail",
                    type: "date",
                  },
                ].map(
                  (
                    fieldLocataire: {
                      name: string;
                      type: string;
                      label: string;
                    },
                    index: number
                  ) => {
                    return (
                      <React.Fragment key={index}>
                        <form.Field
                          name={fieldLocataire.name}
                          // disableErrorFlat
                          validators={{
                            onSubmit: ({}) => {
                              return undefined;
                              // Je recupere les erreur apres la réponse, s'il y la clé correspondate je retourne le message sinon je retourne undefined
                              const error = errorSubmit[fieldLocataire.name];
                              return error;
                            },
                          }}
                          children={(field) => {
                            const isInvalid =
                              field.state.meta.isTouched &&
                              !field.state.meta.isValid;
                            return (
                              <Field data-invalid={isInvalid}>
                                <FieldLabel
                                  className="font-semibold"
                                  htmlFor={field.name}
                                >
                                  {fieldLocataire.label}
                                </FieldLabel>
                                <InputCustomData
                                  type={fieldLocataire.type}
                                  isInvalid={isInvalid}
                                  field={field}
                                />
                              </Field>
                            );
                          }}
                        />
                      </React.Fragment>
                    );
                  }
                )}
              </FieldGroup>
            </form>
          </div>
        </ContentPage.Body>
        {/* {error && <div>Error fetching locataire data</div>} */}
      </ContentPage>
    </div>
  );
}
