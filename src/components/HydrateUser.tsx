"use client";

import { authStore } from "@/app/store/auth.store";
import { useEffect } from "react";

interface HydrateUserProps {
  user: any;
}
export default function HydrateUser({ user }: HydrateUserProps) {
  const setUser = authStore((state : any) => state.setUser);

  useEffect(() => {
    setUser(user?.user);
  }, [user, setUser]);

  return null; // Ce composant ne rend rien
}
