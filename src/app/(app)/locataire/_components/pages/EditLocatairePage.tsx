"use client";
import { ContentPage } from "@/components/layouts/page-layout";
import { Plus, Save, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { route } from "@/lib/route";
import getData, { fetchSuccess } from "@/lib/getData";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import z, { email } from "zod";
import { fi } from "zod/v4/locales";
import { start } from "repl";
import clsx from "clsx";
import { Action } from "@/types/actions";
import { InputCustomData } from "@/components/layouts/form-layout";
import React from "react";
export interface Locataire {
  id: string; // UUID
  fullName: string;
  email: string;
  phone: string;
  startDate: string | null;
  endDate: string | null;
  deletedAt: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
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
  startDate: z.string().optional(),
  endDate: z.string().optional(),
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
        data = response.data;
        console.log("response data:", response.status);
        return data;
      } else {
        throw new Error("Error fetching data");
      }
    },
  });

export default function EditLocatairePage({
  locataireId,
}: ViewLocatairePageProps) {
  const { data, error } = useLoc({ endpoint: "locataires", locataireId });

  // const { data } = useLocataire({
  // endpoint: "locataires",
  // locataireId: locataireId,
  // });
  const form = useForm({
    defaultValues: {
      fullName: data ? data.fullName : "",
      email: data ? data.email : "",
      startDate: data ? data.startDate : "",
      endDate: data ? data.endDate : "",
      phone: data ? data.phone : "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      alert("Form submitted: " + JSON.stringify(value));
      toast.success("Bug report submitted successfully!");
    },
  });

  const actions: Action[] = [
    {
      title: "Sauvegarder",
      icon: <Save />,
      type: "url",
      href: route("locataire"),
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
          title="Locataire"
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
                  { name: "fullName", label: "Nom complet" },
                  { name: "email", label: "Adresse e-mail" },
                  { name: "phone", label: "Numéro de téléphone" },
                  { name: "startDate", label: "Début du bail" },
                  { name: "endDate", label: "Date de fin du bail" },
                ].map(
                  (
                    fieldLocataire: { name: string; label: string },
                    index: number
                  ) => {
                    return (
                      <React.Fragment key={index}>
                        <form.Field
                          name={fieldLocataire.name}
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
                {/* <form.Field
                  name="fullName"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel
                          className="font-semibold"
                          htmlFor={field.name}
                        >
                          Nom complet
                        </FieldLabel>
                        <InputCustomData isInvalid={isInvalid} field={field} />
                      </Field>
                    );
                  }}
                />
                <form.Field
                  name="email"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel
                          className="font-semibold"
                          htmlFor={field.name}
                        >
                          Adresse e-mail
                        </FieldLabel>
                        <InputCustomData isInvalid={isInvalid} field={field} />
                      </Field>
                    );
                  }}
                /> */}
              </FieldGroup>
            </form>
          </div>
        </ContentPage.Body>
        {/* {error && <div>Error fetching locataire data</div>} */}
      </ContentPage>
    </div>
  );
}
