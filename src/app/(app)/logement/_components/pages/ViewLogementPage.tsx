"use client";
import { ContentPage } from "@/components/layouts/page-layout";
import { CornerDownLeft, Pencil, Trash } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { route } from "@/lib/route";
import getData from "@/lib/getData";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputShowDate } from "@/components/layouts/form-layout";
import { Action } from "@/types/actions";
import { toast } from "sonner";
import { fetchSuccess } from "@/app/constants/httpCode";

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

export default function ViewLogementPage({
  locataireId,
}: ViewLocatairePageProps) {
  const { data, error } = useLoc({ endpoint: "locataires", locataireId });

  const actions: Action[] = [
    {
      title: "Retour à la liste",
      icon: <CornerDownLeft />,
      type: "url",
      href: route("locataire"),
    },
    {
      title: "Editer le locataire",
      icon: <Pencil />,
      type: "url",
      href: route("locataire.custom", { idlocataire: locataireId }),
    },
    {
      title: "Supprimer le locataire",
      icon: <Trash />,
      type: "confirm",
      href: "#",
      action: async () => {
        const response = await getData({
          endpoint: `/locataires/${locataireId}`,
          method: "DELETE",
        });
        if (fetchSuccess(response.status)) {
          toast.success("Locataire mis à jour avec succès!");

          window.location.href = route("locataire");
        } else {
          toast.error("Échec de la mise à jour du locataire.");
        }
      },
    },
  ];
  return (
    <div className="">
      <ContentPage>
        {/* {locataireId} */}
        {/* Header page with action and crumb */}
        <ContentPage.Header
          crumb={[
            { label: "Locataires", href: route("locataire") },
            {
              label: "Détails du locataire",
              href: "#",
            },
          ]}
          title="Locataire"
          actions={actions}
        />
        {/* Body page with content an table and other */}
        <ContentPage.Body className="">
          {/* {JSON.stringify(data)} */}
          <FieldGroup className="grid grid-cols-3">
            {[
              { name: "fullName", label: "Nom complet" },
              { name: "email", label: "Adresse e-mail" },
              { name: "phone", label: "Numéro de téléphone" },
              { name: "startDate", label: "Début du bail" },
              { name: "endDate", label: "Date de fin du bail" },
            ].map((field: { name: string; label: string }) => {
              return (
                <Field key={field.name}>
                  <FieldLabel className="font-semibold" htmlFor={field.name}>
                    {field.label}
                  </FieldLabel>
                  <InputShowDate name={field.name} data={data} />
                </Field>
              );
            })}
          </FieldGroup>
        </ContentPage.Body>
      </ContentPage>
    </div>
  );
}
