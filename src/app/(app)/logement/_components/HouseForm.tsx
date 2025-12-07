"use client";
import { useForm } from "@tanstack/react-form";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import z from "zod";
import {
  InputCustomData,
  InputShowDate,
} from "@/components/layouts/form-layout";
import React from "react";
import { title } from "process";

const formSchema = z.object({
  title: z
    .string()
    .min(1, "La désignation doit comporter au moins 3 caractères.")
    .max(255, "La désignation doit comporter au maximum 255 caractères."),
  address: z
    .string()
    .min(1, "La description doit comporter au moins 3 caractères.")
    .max(500, "L'adresse doit comporter au maximum 500 caractères."),
  description: z
    .string()
    .max(1000, "La description doit comporter au maximum 1000 caractères."),
  rentAmount: z.number().min(10000, "Le montant du loyer doit être positif."),
  rentDueDay: z
    .number("Le jour de paiement doit être un nombre.")
    .min(1, "Le jour de paiement doit être entre 1 et 31.")
    .max(31, "Le jour de paiement doit être entre 1 et 31."),
  isActive: z.boolean(),
});

interface FormLocataireProps {
  initialData?: {
    title: string;
    address: string;
    description: string;
    rentAmount: number;
    rentDueDay: string;
    isActive: boolean;
  } | null;
  onSubmit?: (value: any) => Promise<void>;
  onFormReady?: (form: any) => void;
  mode: "create" | "edit" | "view";
}

const fieldLocataireConfig = [
  { name: "title", label: "Désignation", type: "text" },
  { name: "address", label: "Adresse de logement", type: "text" },
  {
    name: "description",
    label: "Description du logement",
    type: "text",
  },
  { name: "rentAmount", label: "Montant du loyer", type: "number" },
  { name: "rentDueDay", label: "Jour de paiement du loyer", type: "number" },
  { name: "isActive", label: "Statut du logement", type: "checkbox" },
];

export default function HouseForm({
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
          title: "",
          address: "",
          description: "",
          rentAmount: 0,
          rentDueDay: 1,
          isActive: true,
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
                            type={fieldLocataire.type}
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
