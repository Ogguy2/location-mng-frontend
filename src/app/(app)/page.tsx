import { Button } from "@/components/ui/button";
import { ContentPage } from "@/components/layouts/page-layout";
import { FileSpreadsheet, Plus } from "lucide-react";

const NewRecordPageAction = () => {
  return <Button className="hover:cursor-pointer">New Record</Button>;
};

const ExportPageAction = () => {
  return <Button className="hover:cursor-pointer">Export</Button>;
};

export default function Page() {
  interface Action {
    title: string;
    icon: React.ReactNode;
  }
  const actions: Action[] = [
    {
      icon: <Plus />,
      title: "Nouvel enregistrement",
    },
    {
      icon: <FileSpreadsheet />,
      title: "Exporter",
    },
  ];
  return (
    <div className="">
      <ContentPage>
        {/* Header page with action and crumb */}
        <ContentPage.Header title="Dashboard" actions={actions} />
        {/* Body page with content an table and other */}
        <ContentPage.Body>
          
          {/* lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam */}
        </ContentPage.Body>
      </ContentPage>
    </div>
  );
}
