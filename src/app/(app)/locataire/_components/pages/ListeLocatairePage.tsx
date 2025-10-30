"use client";
import { ContentPage } from "@/components/layouts/page-layout";
import { Eye, MoreHorizontalIcon, PenIcon, Plus, Trash } from "lucide-react";

import DefaultTable from "@/components/table";
import { route } from "@/lib/route";
import useLocataire from "@/components/hooks/useLocataire";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Locataire } from "@/types/app";
import { Action } from "@/types/actions";

const columns: ColumnDef<Locataire>[] = [
  {
    accessorKey: "fullName",
    header: "Nom complet",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "startDate",
    header: "Date de début",
  },
  {
    accessorKey: "endDate",
    header: "Date de fin",
  },
  {
    accessorKey: "phone",
    header: "Téléphone",
  },
  {
    accessorKey: "action",
    header: "Actions",
    cell: ({ cell, row }) => {
      return (
        <div className="flex justify-end">
          <ButtonGroup className="">
            <Button size={"sm"} variant={"outline"}>
              Action
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size={"sm"} aria-label="More Options">
                  <MoreHorizontalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    asChild
                    className="hover:cursor-pointer"
                    variant="destructive"
                  >
                    <Link
                      href={route("locataire.view", {
                        idlocataire: row.original.id,
                      })}
                    >
                      <Eye />
                      Afficher
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="hover:cursor-pointer"
                    variant="destructive"
                    asChild
                  >
                    <Link
                      className=""
                      href={route("locataire.custom", {
                        idlocataire: row.original.id,
                      })}
                    >
                      <PenIcon />
                      Editer
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
        </div>
      );
    },
  },
];

export default function ListLocataire() {
  const { data } = useLocataire({ endpoint: "locataires" });

  const actions: Action[] = [
    {
      title: "Nouvel enregistrement",
      icon: <Plus />,
      type: "url",
      href: route("locataire.new"),
    },
  ];
  return (
    <div className="">
      <ContentPage>
        {/* Header page with action and crumb */}
        <ContentPage.Header
          crumb={[
            { label: "Locataires", href: route("locataire") },
            {
              label: "Liste des locataires",
              href: "#",
            },
          ]}
          title="Locataire"
          actions={actions}
        />
        {/* Body page with content an table and other */}
        <ContentPage.Body className="">
          <DefaultTable
            rowRoute={(idValue) =>
              route("locataire.view", {
                idlocataire: idValue,
              })
            }
            datasTable={data}
            columns={columns}
          />
        </ContentPage.Body>
      </ContentPage>
    </div>
  );
}
