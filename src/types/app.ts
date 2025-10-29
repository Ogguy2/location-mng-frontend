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