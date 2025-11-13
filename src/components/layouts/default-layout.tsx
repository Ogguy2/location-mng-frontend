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
import Link from "next/link";
import { authStore } from "@/app/store/auth.store";

// Menu items.

export const AppSidebar = () => {
  const store = authStore((state) => state.user);
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
      url: route("logement"),
      icon: Home,
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
            <div className="font-bold text-xl  text-foreground">
              {store.fullName}
            </div>
            <div className="text text-sm text-foreground">
              {store.email}
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
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
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
