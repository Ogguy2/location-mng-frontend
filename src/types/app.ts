export interface Locataire {
  id: string; // UUID
  fullName: string;
  email: string;
  phone: string;
  startDate: string | null;
  endDate: string | null;
  deletedAt: string | null;
  totalDue: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface Logement {
  id: string; // UUID
  title: string;
  address: string;
  description: string;
  proprietaireId: string;
  locataireId: string | null;
  rentAmount: number;
  rentDueDay: number;
  createdAt: string;
  deletedAt: string | null;
  updatedAt: string;
  isActive: boolean;
}

export const defaultLocataire: Locataire = {
  id: "",
  fullName: "",
  email: "",
  phone: "",
  startDate: null,
  endDate: null,
  totalDue: 0,
  deletedAt: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

