import { MoreHorizontalIcon } from "lucide-react";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";

interface ContentPageProps {
  children?: React.ReactNode;
}
export const ContentPage = ({ children }: ContentPageProps) => {
  return <div className="space-y-16">{children}</div>;
};

interface ContentPageHeaderProps {
  title?: string;
}

const HeaderContent = ({ title, actions }: ContentPageHeaderProps) => {
  return (
    <div>
      {/* Bar  */}
      <div className="flex items-center bg-amber-20 justify-between  w-full">
        {/* Title page and crumb */}
        <div className="">
          <h1 className="text-2xl font-bold">{title}</h1>
          <div className="text-sm text-muted-foreground">
            Welcome to your dashboard
          </div>
        </div>
        {/* Action */}
        <div className="">
          <ButtonGroup>
            <Button variant={"outline"}>Action</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button aria-label="More Options">
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
}
const BodyContent = ({ children }: ContentPageBodyProps) => {
  return <div className="">{children}</div>;
};
ContentPage.Header = HeaderContent;
ContentPage.Body = BodyContent;
