export interface Locataire {
  id: string; // UUID
  fullName: string;
  email: string;
  phone: string;
  startDate: string | null;
  endDate: string | null;
  deletedAt: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
export const defaultLocataire: Locataire = {
  id: "",
  fullName: "",
  email: "",
  phone: "",
  startDate: null,
  endDate: null,
  deletedAt: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
