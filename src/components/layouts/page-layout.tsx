"use client";
import { MoreHorizontalIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import React, { act } from "react";
import { Action } from "@/types/actions";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface ContentPageProps {
  children?: React.ReactNode;
}
export const ContentPage = ({ children }: ContentPageProps) => {
  return <div className="space-y-16">{children}</div>;
};

interface ContentPageHeaderProps {
  title?: string;
  crumb?: { label: string; href: string }[];
  actions: Action[];
}

const HeaderContent = ({ title, actions, crumb }: ContentPageHeaderProps) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [actionDefault, setActionDefault] = React.useState<Action | null>(null);
  const handleAction = async (action: Action, router) => {
    switch (action.type) {
      case "saveAction":
        if (action.action) {
          console.log("Executing save action...");  
          const dd = await action.action();
          // alert(dd);
        }
        if (action.href) {
          // wait for 200 ms
          await new Promise((resolve) => setTimeout(resolve, 200));
          // router.push(action.href);
        }
        // Handle save action
        break;
      case "url":
        router.push(action.href);
        break;
      case "dialog":
        // Ouvre un modal (état à gérer via useState)
        // setDialogContent(action.dialogContent);
        // setDialogOpen(true);
        break;

      case "confirm":
        // Ouvre une boite de dialogue de confirmation
        setActionDefault(action);
        setIsDialogOpen(true);
        break;

      case "custom":
        if (action.action) await action.action();
        break;

      default:
        console.warn("Type d’action non reconnu :", action.type);
    }
  };
  return (
    <div>
      {/* Bar  */}
      <div className="flex items-center bg-amber-00 justify-between  w-full">
        {/* Title page and crumb */}
        <div className="">
          <h1 className="text-2xl font-bold">{title}</h1>
          <div className="text-sm text-muted-foreground">
            {/* {crumb ? } */}
            <Breadcrumb>
              <BreadcrumbList>
                {crumb?.map((item, index) => {
                  return crumb.length - 1 !== index ? (
                    <React.Fragment key={index}>
                      <BreadcrumbItem>
                        <BreadcrumbLink href={item.href}>
                          {item.label}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                    </React.Fragment>
                  ) : (
                    <React.Fragment key={index}>
                      <BreadcrumbItem key={index}>
                        <BreadcrumbPage>{item.label}</BreadcrumbPage>
                      </BreadcrumbItem>
                    </React.Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        {/* Action */}
        <div className="">
          <ButtonGroup>
            <Button size={"lg"} variant={"outline"}>
              Action
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size={"lg"} aria-label="More Options">
                  <MoreHorizontalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuGroup>
                  {actions.map((action, index: number) => {
                    return (
                      <DropdownMenuItem
                        key={index}
                        onClick={async () => {
                          // if (action.action) {
                          //   await action.action();
                          // }
                          // if (action.href) {
                          //   router.push(action.href);
                          // }
                          await handleAction(action, router);
                        }}
                        className="hover:cursor-pointer"
                        variant="destructive"
                      >
                        {action.icon}
                        {action.title}
                        {/* <Link href={action.href}> */}
                        {/* </Link> */}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
        </div>
      </div>
      <Dialog
        onConfirm={actionDefault?.action}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

interface ContentPageBodyProps {
  children?: React.ReactNode;
  className?: string;
}
const BodyContent = ({ children, className }: ContentPageBodyProps) => {
  return <div className={className}>{children}</div>;
};
ContentPage.Header = HeaderContent;
ContentPage.Body = BodyContent;

interface DialogProps {
  isOpen: boolean;
}
const Dialog = ({ isOpen, onClose, onConfirm }) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action ne peut pas être annulée.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
