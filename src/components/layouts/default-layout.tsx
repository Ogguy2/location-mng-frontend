"use client";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Logo } from "@/app/(auth)/login/page";
import { Button } from "../ui/button";
import { route } from "@/lib/route";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Menu items.

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
    // User
    {
      title: "Utilisateurs",
      url: "#",
      icon: Settings,
    },
  ];

  const path = usePathname();
  const isActive = (url: string, exact: boolean = false) => {
    return exact ? path === url : path.startsWith(url);
  };
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
                  <SidebarMenuButton
                    className={clsx(
                      isActive(item.url, item.url == "/" && true) &&
                        "bg-primary text-white hover:bg-primary hover:text-white"
                    )}
                    asChild
                  >
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
