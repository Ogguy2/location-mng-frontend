"use client";
import { ContentPage } from "@/components/layouts/page-layout";
import { CornerDownLeft, Pencil, Trash } from "lucide-react";
import { route } from "@/lib/route";
import getData from "@/lib/getData";
import { Action } from "@/types/actions";
import { toast } from "sonner";
import { fetchSuccess } from "@/app/constants/httpCode";
import { useLoc } from "@/components/hooks/useLoc";
import FormLocataire from "../FormLocataire";

interface ViewLocatairePageProps {
  locataireId: string;
}

export default function ViewLocatairePage({
  locataireId,
}: ViewLocatairePageProps) {
  const { data, error } = useLoc({
    endpoint: "/locataires/" + locataireId,
    key: "locataire-detail-" + locataireId,
  });

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
          // window.location.href = route("locataire");
        } else {
          toast.error("Échec de lad mise à jour du locataire.");
        }
      },
    },
  ];
  return (
    <div className="">
      <ContentPage>
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
          <FormLocataire
            mode="view"
            initialData={data}
          />
        </ContentPage.Body>
      </ContentPage>
    </div>
  );
}
