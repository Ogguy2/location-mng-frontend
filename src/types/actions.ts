export interface Action {
  title: string;
  icon?: React.ReactNode;
  type: "saveAction" | "url" | "dialog" | "confirm" | "custom"; // types connus
  href?: string; // pour les redirections
  action?: () => void | Promise<void> ; // pour les actions custom
  requiresConfirmation?: boolean; // pour dialog de confirmation
  dialogContent?: React.ReactNode; // contenu optionnel du dialog
}
