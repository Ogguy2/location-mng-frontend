import { ContentPage } from "@/components/layouts/page-layout";
import { FileSpreadsheet, Plus } from "lucide-react";

import DefaultTable from "@/components/table";
import { route } from "@/lib/route";

export default function Page() {
  interface Action {
    title: string;
    icon: React.ReactNode;
    type: string;
    href: string;
  }

  const actions: Action[] = [
    {
      icon: <Plus />,
      title: "Nouvel enregistrement",
      type: "url",
      href: route("locataire.new"),
    },
  ];
  return (
    <div className="">
      <ContentPage>
        {/* Header page with action and crumb */}
        <ContentPage.Header title="Locataire" actions={actions} />
        {/* Body page with content an table and other */}
        <ContentPage.Body>
          <DefaultTable />
        </ContentPage.Body>
      </ContentPage>
    </div>
  );
}
