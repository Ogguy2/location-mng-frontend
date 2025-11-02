// Configuration générique pour toutes les entités
export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "date" | "number" | "textarea" | "checkbox";
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  placeholder?: string;
  defaultValue?: any;
}

export interface EntityConfig {
  name: string; // "locataire", "logement", "paiement", etc.
  fields: FieldConfig[];
  endpoint: string; // "/locataires", "/logements", etc.
  displayName: string; // "Locataire", "Logement", etc.
}

// Configuration des entités
export const ENTITY_CONFIGS: Record<string, EntityConfig> = {
  locataire: {
    name: "locataire",
    displayName: "Locataire",
    endpoint: "/locataires",
    fields: [
      {
        name: "fullName",
        label: "Nom complet",
        type: "text",
        validation: { required: true, min: 3, max: 255 },
      },
      {
        name: "email",
        label: "Adresse e-mail",
        type: "email",
        validation: { required: true },
      },
      {
        name: "phone",
        label: "Numéro de téléphone",
        type: "tel",
        validation: { required: true, min: 10, max: 15 },
      },
      {
        name: "startDate",
        label: "Début du bail",
        type: "date",
      },
      {
        name: "endDate",
        label: "Date de fin du bail",
        type: "date",
      },
    ],
  },

  logement: {
    name: "logement",
    displayName: "Logement",
    endpoint: "/logements",
    fields: [
      {
        name: "title",
        label: "Désignation",
        type: "text",
        validation: { required: true, min: 3, max: 255 },
      },
      {
        name: "address",
        label: "Adresse",
        type: "text",
        validation: { required: true, min: 3, max: 500 },
      },
      {
        name: "description",
        label: "Description",
        type: "text",
        validation: { max: 255 },
      },
      {
        name: "rentAmount",
        label: "Montant du loyer",
        type: "number",
        validation: { required: true, min: 10000 },
      },
      {
        name: "rentDueDay",
        label: "Jour de paiement",
        type: "number",
        validation: { required: true, min: 1, max: 31 },
      },
      {
        name: "isActive",
        label: "Actif",
        type: "checkbox",
        defaultValue: true,
      },
    ],
  },
};
