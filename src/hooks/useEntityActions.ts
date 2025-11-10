"use client";
import React, { useMemo } from "react";
import { Action } from "@/types/actions";
import { Save, X, Edit, Trash2, Eye } from "lucide-react";
import { getDefaultActionsConfig, ActionProps } from "@/lib/actions.utils";

// Fonction pour obtenir l'icône
const getIcon = (iconName?: string): React.ReactNode => {
  switch (iconName) {
    case "Save": 
      return React.createElement(Save);
    case "X": 
      return React.createElement(X);
    case "Edit": 
      return React.createElement(Edit);
    case "Trash2": 
      return React.createElement(Trash2);
    case "Eye": 
      return React.createElement(Eye);
    default: 
      return undefined;
  }
};

// Hook pour gérer les actions avec icônes React
export const useEntityActions = (
  mode: "create" | "edit" | "view",
  entityName: string,
  entityId?: string,
  form?: any,
  actionProps?: ActionProps
): Action[] => {
  return useMemo(() => {
    // Obtenir la configuration des actions par défaut
    const defaultActionsConfig = getDefaultActionsConfig(mode, entityName, entityId);
    
    // Convertir en actions avec icônes React
    const defaultActions: Action[] = defaultActionsConfig.map((config) => ({
      title: config.title,
      type: config.type,
      href: config.href,
      icon: getIcon(config.iconName),
      action: config.type === "saveAction" ? () => form?.handleSubmit() : 
              config.type === "confirm" ? actionProps?.onDelete : 
              config.action,
    }));

    // Si pas de props d'actions, retourner les actions par défaut
    if (!actionProps) {
      return defaultActions;
    }

    // Si des actions personnalisées sont définies, les utiliser exclusivement
    if (actionProps.customActions) {
      return actionProps.customActions;
    }

    // Si callback personnalisé, l'utiliser
    if (actionProps.onActionsReady) {
      return actionProps.onActionsReady(defaultActions, form);
    }

    // Si actions par défaut désactivées, retourner seulement les additionnelles
    if (actionProps.useDefaultActions === false) {
      return actionProps.additionalActions || [];
    }

    // Combiner actions par défaut + additionnelles
    return [
      ...defaultActions,
      ...(actionProps.additionalActions || []),
    ];
  }, [mode, entityName, entityId, form, actionProps]);
};