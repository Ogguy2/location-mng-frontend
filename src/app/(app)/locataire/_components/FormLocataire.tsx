"use client";
import { useForm } from "@tanstack/react-form";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import z from "zod";
import {
  InputCustomData,
  InputShowDate,
} from "@/components/layouts/form-layout";
import React from "react";
import { toast } from "sonner";
import { fetchSuccess } from "@/app/constants/httpCode";
import getData from "@/lib/getData";

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

interface FormLocataireProps {
  initialData?: {
    fullName: string;
    email: string;
    phone: string;
    startDate: string | null;
    endDate: string | null;
  } | null;
  onSubmit?: (value: any) => Promise<void>;
  onFormReady?: (form: any) => void;
  mode: "create" | "edit" | "view";
}

const fieldLocataireConfig = [
  { name: "fullName", label: "Nom complet", type: "text" },
  { name: "email", label: "Adresse e-mail", type: "email" },
  { name: "phone", label: "Numéro de téléphone", type: "tel" },
  { name: "startDate", label: "Début du bail", type: "date" },
  { name: "endDate", label: "Date de fin du bail", type: "date" },
];

export default function FormLocataire({
  initialData,
  onSubmit,
  onFormReady,
  mode,
}: FormLocataireProps) {
  const [errorSubmit, setErrorSubmit] = React.useState<Record<string, string>>(
    {}
  );

  const defaultValues =
    mode === "create"
      ? {
          fullName: "",
          email: "",
          phone: "",
          startDate: null,
          endDate: null,
        }
      : initialData || null;

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (onSubmit) {
        await onSubmit(value);
      }
    },
  });

  // Exposer le formulaire au composant parent
  React.useEffect(() => {
    if (onFormReady && mode !== "view") {
      onFormReady(form);
    }
  }, [form, onFormReady, mode]);

  // Logique unifiée pour tous les modes
  return (
    <div className="w-full">
      <form
        id="locataire-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (mode !== "view") {
            form.handleSubmit();
          }
        }}
      >
        <FieldGroup className="grid grid-cols-3">
          {fieldLocataireConfig.map(
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
                    validators={{
                      onSubmit: ({}) => {
                        // Pour le mode édition, on peut gérer les erreurs spécifiques
                        if (mode === "edit") {
                          const error = errorSubmit[fieldLocataire.name];
                          return error;
                        }
                        return undefined;
                      },
                    }}
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel
                            className="font-semibold"
                            htmlFor={field.name}
                          >
                            {fieldLocataire.label}
                          </FieldLabel>
                          {mode === "view" ? (
                            <InputShowDate
                              name={fieldLocataire.name}
                              data={initialData as any}
                            />
                          ) : (
                            <InputCustomData
                              type={fieldLocataire.type}
                              isInvalid={isInvalid}
                              field={field}
                            />
                          )}
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
  );
}
