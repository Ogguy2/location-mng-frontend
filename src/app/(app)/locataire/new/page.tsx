import React from "react";
import QueryProvider from "@/components/provider";
import NewLocataire from "../_components/pages/NewLocataire";

export default async function Page({
  params,
}: {
  params: Promise<{ idlocataire: string }>;
}) {
  const { idlocataire } = await params;
  return (
    <QueryProvider>
      <NewLocataire  />
    </QueryProvider>
  );
}
