export interface Action {
  title: string;
  description?: string;
  initialValues?: Record<string, any>;
  icon?: React.ReactNode;
  type: "saveAction" | "url" | "dialog" | "confirm" | "custom"; // types connus
  href?: string; // pour les redirections
  action?: () => void | Promise<void>; // pour les actions custom
  beforeAction?: () => void | Promise<void>; // pour les actions personnalisées
  requiresConfirmation?: boolean; // pour dialog de confirmation
  dialogContent?: () => React.ReactNode; // contenu optionnel du dialog
}
