import React from "react";
import EditLocatairePage from "../../_components/pages/EditLogement";

export default async function Page({
  params,
}: {
  params: Promise<{ logementId: string }>;
}) {
  const { logementId } = await params;
  return <EditLocatairePage logementId={logementId} />;
}
