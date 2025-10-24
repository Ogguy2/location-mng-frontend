import { Logo } from "@/app/(auth)/login/page";
import { route } from "@/lib/route";
import { Home, Inbox, Calendar, Settings, Sidebar } from "lucide-react";
import {
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "../ui/sidebar";
import { Button } from "../ui/button";

interface DefaultLayoutContainerProps {
  children?: React.ReactNode;
}
export const DefaultLayoutContainer = ({
  children,
}: DefaultLayoutContainerProps) => {
  return (
    <div className="w-full p-8">
      {/* <Menu /> */}
      <AppSidebar />
      <main className="ml-[16rem] ">
        <div className="max-w-7xl mx-auto ">{children}</div>
      </main>
    </div>
  );
};

export const AppSidebar = () => {
  const items = [
    {
      title: "Accueil",
      url: route("home"),
      icon: Home,
    },
    {
      title: "Locataire",
      url: route("locataire"),
      icon: Inbox,
    },
    // Logement
    {
      title: "Logement",
      url: route("logements"),
      icon: Home,
    },
    {
      title: "Reglements",
      url: route("home"),
      icon: Calendar,
    },
    // User
    {
      title: "Utilisateurs",
      url: "#",
      icon: Settings,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3 ">
          <Logo />
          <div className="">
            <div className="font-bold text-xl  text-foreground">Kevin Dba</div>
            <div className="text text-sm text-foreground">
              kevin.dba@example.com
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button className="hover:cursor-pointer">Déconnexion</Button>
      </SidebarFooter>
    </Sidebar>
  );
};

