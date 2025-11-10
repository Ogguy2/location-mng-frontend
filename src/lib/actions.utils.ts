import { Action } from "@/types/actions";
import { route } from "@/lib/route";

// Helper pour gérer les routes dynamiquement
export const getEntityRoute = (entityName: string): string => {
  if (entityName === "locataire") return route("locataire");
  if (entityName === "logement") return route("logement");
  return "/";
};

export const getEntityViewRoute = (entityName: string, id: string): string => {
  if (entityName === "locataire")
    return route("locataire.view", { idlocataire: id });
  if (entityName === "logement")
    return route("logement.view", { logementId: id });
  return "/";
};

export const getEntityEditRoute = (entityName: string, id: string): string => {
  if (entityName === "locataire")
    return route("locataire.custom", { idlocataire: id });
  if (entityName === "logement")
    return route("logement.custom", { logementId: id });
  return "/";
};

export const getEntityCreateRoute = (entityName: string): string => {
  if (entityName === "locataire") return route("locataire.new");
  if (entityName === "logement") return route("logement.new");
  return "/";
};

// Types pour les actions par défaut (sans icônes React)
interface BaseAction {
  title: string;
  type: "saveAction" | "url" | "confirm";
  href?: string;
  action?: () => void;
  iconName?: string; // Nom de l'icône pour référence
}

// Actions par défaut pour chaque mode (sans icônes React)
export const getDefaultActionsConfig = (
  mode: "create" | "edit" | "view",
  entityName: string,
  entityId?: string
): BaseAction[] => {
  const baseRoute = getEntityRoute(entityName);
  
  switch (mode) {
    case "create":
      return [
        {
          title: "Enregistrer",
          type: "saveAction",
          href: baseRoute,
          iconName: "Save",
        },
        {
          title: "Annuler",
          type: "url",
          href: baseRoute,
          iconName: "X",
        },
      ];

    case "edit":
      return [
        {
          title: "Sauvegarder",
          type: "saveAction",
          href: baseRoute,
          iconName: "Save",
        },
        {
          title: "Annuler",
          type: "url",
          href: entityId ? getEntityViewRoute(entityName, entityId) : baseRoute,
          iconName: "X",
        },
      ];

    case "view":
      return [
        {
          title: "Modifier",
          type: "url",
          href: entityId ? getEntityEditRoute(entityName, entityId) : baseRoute,
          iconName: "Edit",
        },
        {
          title: "Supprimer",
          type: "confirm",
          iconName: "Trash2",
        },
        {
          title: "Retour à la liste",
          type: "url",
          href: baseRoute,
          iconName: "Eye",
        },
      ];

    default:
      return [];
  }
};

// Interface pour les props d'actions
export interface ActionProps {
  // Actions par défaut (save, cancel, edit, delete, etc.)
  useDefaultActions?: boolean;
  // Actions additionnelles spécifiques
  additionalActions?: Action[];
  // Remplacer complètement les actions par défaut
  customActions?: Action[];
  // Callback pour personnaliser les actions par défaut
  actionReady?: (defaultActions: Action[], form?: any) => Action[];
  // Callback pour la suppression (mode view)
  onDelete?: () => void;
}