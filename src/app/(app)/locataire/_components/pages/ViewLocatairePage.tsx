"use client";
import { fetchSuccess } from "@/app/constants/httpCode";
import { InputCustomData } from "@/components/layouts/form-layout";
import GenericViewPage from "@/components/pages/GenericViewPage";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import getData from "@/lib/getData";
import { Action } from "@/types/actions";
import { useForm } from "@tanstack/react-form";
import { Banknote } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import z from "zod";

interface ViewLocatairePageProps {
  locataireId: string;
}

export default function ViewLocatairePage({
  locataireId,
}: ViewLocatairePageProps) {
  const formSchema = z.object({
    paidAt: z.string(),
    amount: z.number().min(1000, "Le montant doit être au moins de 0,01"),
    note: z.string(),
  });
  const form = useForm({
    defaultValues: {
      paidAt: new Date().toLocaleDateString("fr-FR"),
      note: "",
      amount: 1000,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const response = await getData({
        endpoint: `/paiements`,
        method: "POST",
        data: { ...value, locataireId: locataireId },
      });
      if (fetchSuccess(response.status)) {
        toast.success("Paiement effectué avec succès");
      } else {
        toast.error("Échec du paiement");
      }
      return true;
    },
  }); // Initialiser le formulaire vide pour l'utiliser dans les actions
  return (
    <GenericViewPage
      entityName="locataire"
      entityId={locataireId}
      actionReady={(defaultActions: Action[]) => {
        const customizedActions = defaultActions.map((action) => {
          return action;
        });

        // Add action with modal
        customizedActions.push({
          icon: <Banknote />,
          title: "Effectuer un paiement",
          description: "Confirmez le paiement pour ce locataire.",
          type: "dialog",
          initialValues: {
            paidAt: new Date().toLocaleDateString("fr-FR"),
            note: "",
            amount: 1000,
          },
          beforeAction: () => {
            form.reset();
          },
          action: () => {
            form.handleSubmit();
          },
          requiresConfirmation: true,
          dialogContent: (
            <div>
              <form
                id={"payment-form"}
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <FieldGroup className="grid">
                  {[
                    { name: "paidAt", label: "Date de paiement", type: "date" },
                    { name: "amount", label: "Montant", type: "number" },
                    { name: "note", label: "Note", type: "text" },
                  ].map(
                    (
                      fieldAction: {
                        // name: "paidAt" | "amount" | "note";
                        name: string;
                        label: string;
                        type: string;
                      },
                      index: number
                    ) => {
                      return (
                        <React.Fragment key={fieldAction.name}>
                          <form.Field
                            name={fieldAction.name}
                            children={(field) => {
                              const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;
                              return (
                                <Field>
                                  <FieldLabel
                                    htmlFor={fieldAction.name}
                                    className="font-semibold"
                                  >
                                    {fieldAction.label}
                                  </FieldLabel>
                                  <InputCustomData
                                    type={fieldAction.type}
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
          ),
        });
        return customizedActions;
      }}
    />
  );
}
