import React from "react";
import QueryProvider from "@/components/provider";
import ViewLogementPage from "../../_components/pages/ViewLogementPage";

export default async function Page({
  params,
}: {
  params: Promise<{ logementId: string }>;
}) {
  const { logementId } = await params;
  return <ViewLogementPage logementId={logementId} />;
}
