"use client";
import { fetchSuccess } from "@/app/constants/httpCode";
import { useLoc } from "@/components/hooks/useLoc";
import { InputCustomData } from "@/components/layouts/form-layout";
import GenericViewPage from "@/components/pages/GenericViewPage";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import getData from "@/lib/getData";
import { Action } from "@/types/actions";
import { useForm } from "@tanstack/react-form";
import { Banknote, Link } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import z from "zod";

interface ViewLocatairePageProps {
  locataireId: string;
}

export default function ViewLocatairePage({
  locataireId,
}: ViewLocatairePageProps) {
  // Action de paiement
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
        return true;
      } else {
        toast.error("Échec du paiement");
      }
    },
  }); // Initialiser le formulaire vide pour l'utiliser dans les actions

  //  Actiond de affectation de logement
  const formSchemaAssignLogement = z.object({
    logementId: z.string().min(1, "Le logement est requis"),
  });
  const formLogementAssignMent = useForm({
    defaultValues: {
      logementId: "",
    },
    validators: {
      onSubmit: formSchemaAssignLogement,
    },
    onSubmit: async ({ value }) => {
      console.log("Valeur du formulaire :", value);
      const response = await getData({
        endpoint: `/locataires/` + locataireId,
        method: "PATCH",
        data: {
          logementId: value.logementId,
        },
      });
      if (fetchSuccess(response.status)) {
        toast.success("Paiement effectué avec succès");
      } else {
        toast.error("Échec du paiement");
      }
      return "true";
    },
  }); // Initialiser le formulaire vide pour l'utiliser dans les actions

  return (
    <>
      <GenericViewPage
        entityName="locataire"
        entityId={locataireId}
        actionReady={(defaultActions: Action[]) => {
          const customizedActions = defaultActions.map((action) => {
            return action;
          });
          customizedActions.push({
            icon: <Link />,
            title: "Affecté un logement",
            description: "Veiller faire la sélection du logement",
            type: "dialog",
            initialValues: {
              logementId: "",
            },
            beforeAction: () => {
              formLogementAssignMent.reset();
            },
            action: () => {
              formLogementAssignMent.handleSubmit({});
            },
            requiresConfirmation: true,
            dialogContent: async () => {
              const reponse = await getData({
                endpoint: `/logements`,
                method: "GET",
              });

              let data = null;
              if (fetchSuccess(reponse.status)) {
                toast.success("Logements récupérés avec succès");
                data = reponse.data.data;
              } else {
                toast.error("Échec de récupération des logements");
                data = [];
              }
              return (
                <div>
                  <form
                    id={"logement-assign-form"}
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <FieldGroup className="grid">
                      {[
                        {
                          name: "logementId",
                          label: "Logement à affecter",
                          type: "select",
                          options: data || [],
                          optionKey: "id",
                          optionLabel: "description",
                          default: "",
                        },
                      ].map(
                        (
                          fieldConfig: {
                            name: string;
                            label: string;
                            type: string;
                            options?: any[];
                            optionKey?: any;
                            optionLabel?: any;
                            default: any;
                          },
                          index: number
                        ) => {
                          return (
                            <React.Fragment key={fieldConfig.name}>
                              <formLogementAssignMent.Field
                                name={fieldConfig.name}
                                children={(field) => {
                                  const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;
                                  return (
                                    <Field>
                                      <FieldLabel
                                        htmlFor={fieldConfig.name}
                                        className="font-semibold"
                                      >
                                        {fieldConfig.label}
                                      </FieldLabel>
                                      <InputCustomData
                                        fieldAction={fieldConfig}
                                        type={fieldConfig.type}
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
              );
            },
          });
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
            action: async () => {
              form.handleSubmit();
              const dd = await form.handleSubmit({ idi: 12 });
              return dd;
            },
            requiresConfirmation: true,
            dialogContent: () => {
              return (
                <div>
                  <form
                    id={"payment-form"}
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <FieldGroup className="grid">
                      {[
                        {
                          name: "paidAt",
                          label: "Date de paiement",
                          type: "date",
                        },
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
              );
            },
          });
          return customizedActions;
        }}
      />
    </>
  );
}
