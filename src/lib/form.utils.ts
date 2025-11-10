import { EntityConfig } from "@/app/config/entities.config";

/**
 * Filtre les données initiales pour ne garder que les champs définis dans la configuration
 * @param data - Données complètes de l'objet
 * @param entityConfig - Configuration de l'entité
 * @returns Objet filtré contenant seulement les champs configurés
 */
export const filterDataByConfig = (
  data: Record<string, any> | null | undefined,
  entityConfig: EntityConfig
): Record<string, any> | null => {
  if (!data) return null;

  const filteredData: Record<string, any> = {};

  entityConfig.fields.forEach((field) => {
    if (data.hasOwnProperty(field.name)) {
      filteredData[field.name] = data[field.name];
    }
  });

  return Object.keys(filteredData).length > 0 ? filteredData : null;
};

/**
 * Prépare les données du formulaire en filtrant + ajoutant les valeurs par défaut
 * @param data - Données initiales
 * @param entityConfig - Configuration de l'entité
 * @param mode - Mode du formulaire
 * @returns Données prêtes pour le formulaire
 */
export const prepareFormData = (
  data: Record<string, any> | null | undefined,
  entityConfig: EntityConfig,
  mode: "create" | "edit" | "view"
): Record<string, any> => {
  if (mode === "create") {
    // Mode création : valeurs par défaut uniquement
    return entityConfig.fields.reduce((acc, field) => {
      acc[field.name] =
        field.defaultValue !== undefined
          ? field.defaultValue
          : field.type === "number"
          ? field.validation?.min || 0
          : field.type === "checkbox"
          ? false
          : field.type === "date"
          ? null
          : "";
      return acc;
    }, {} as Record<string, any>);
  }

  // Mode edit/view : filtrer + fallback
  const result: Record<string, any> = {};

  entityConfig.fields.forEach((field) => {
    if (data && data.hasOwnProperty(field.name)) {
      result[field.name] = data[field.name];
    } else {
      // Fallback sur valeur par défaut
      result[field.name] =
        field.defaultValue !== undefined
          ? field.defaultValue
          : field.type === "number"
          ? field.validation?.min || 0
          : field.type === "checkbox"
          ? false
          : field.type === "date"
          ? null
          : "";
    }
  });

  return result;
};
