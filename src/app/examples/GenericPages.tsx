"use client";
import GenericCreatePage from "@/components/pages/GenericCreatePage";

// Exemple d'utilisation pour créer un locataire
export default function NewLocataireGeneric() {
  return <GenericCreatePage entityName="locataire" />;
}

// Exemple d'utilisation pour créer un logement
export function NewLogementGeneric() {
  return <GenericCreatePage entityName="logement" />;
}

// Exemple d'utilisation pour créer un paiement
export function NewPaiementGeneric() {
  return <GenericCreatePage entityName="paiement" />;
}

// Exemple d'utilisation pour créer une ville
export function NewVilleGeneric() {
  return <GenericCreatePage entityName="ville" />;
}