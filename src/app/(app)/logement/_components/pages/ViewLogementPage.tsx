"use client";
import { ContentPage } from "@/components/layouts/page-layout";
import { CornerDownLeft, Pencil, Trash } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { route } from "@/lib/route";
import getData from "@/lib/getData";
import { Action } from "@/types/actions";
import { toast } from "sonner";
import { fetchSuccess } from "@/app/constants/httpCode";
import HouseForm from "../HouseForm";
import { useLoc } from "@/components/hooks/useLoc";

interface ViewLocatairePageProps {
  logementId: string;
}

interface useLocProps {
  endpoint: string;
  logementId: string;
}

export default function ViewLogementPage({
  logementId,
}: ViewLocatairePageProps) {
  const { data, error } = useLoc({
    endpoint: "/logements/" + logementId,
    key: "logement-detail-" + logementId,
  });

  const actions: Action[] = [
    {
      title: "Retour à la liste",
      icon: <CornerDownLeft />,
      type: "url",
      href: route("logement"),
    },
    {
      title: "Editer le locataire",
      icon: <Pencil />,
      type: "url",
      href: route("logement.custom", { logementId: logementId }),
    },
    {
      title: "Supprimer le locataire",
      icon: <Trash />,
      type: "confirm",
      href: "#",
      action: async () => {
        const response = await getData({
          endpoint: `/logements/${logementId}`,
          method: "DELETE",
        });
        if (fetchSuccess(response.status)) {
          toast.success("Logement mis à jour avec succès!");

          window.location.href = route("locataire");
        } else {
          toast.error("Échec de la mise à jour du logement.");
        }
      },
    },
  ];
  return (
    <div className="">
      <ContentPage>
        {/* Header page with action and crumb */}
        <ContentPage.Header
          crumb={[
            { label: "Logement", href: route("logement") },
            {
              label: "Détails du logement",
              href: "#",
            },
          ]}
          title="Logement"
          actions={actions}
        />
        {/* Body page with content an table and other */}
        <ContentPage.Body className="">
          {/* {JSON.stringify(data)} */}
          <HouseForm mode="view" initialData={data} />
        </ContentPage.Body>
      </ContentPage>
    </div>
  );
}
