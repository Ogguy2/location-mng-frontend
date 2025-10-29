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
import React from "react";

interface ContentPageProps {
  children?: React.ReactNode;
}
export const ContentPage = ({ children }: ContentPageProps) => {
  return <div className="space-y-16">{children}</div>;
};

interface ContentPageHeaderProps {
  title?: string;
  crumb?: { label: string; href: string }[];
  actions?: Action[];
}
interface Action {
  title: string;
  icon: React.ReactNode;
  type: string;
  href: string;
}

const HeaderContent = ({ title, actions, crumb }: ContentPageHeaderProps) => {
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
                  {actions.map((action, index: number) => (
                    <Link key={index} href={action.href}>
                      <DropdownMenuItem
                        className="hover:cursor-pointer"
                        variant="destructive"
                      >
                        {action.icon}
                        {action.title}
                      </DropdownMenuItem>
                    </Link>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
        </div>
      </div>
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
