import { ENTITY_CONFIGS } from "@/app/config/entities.config";
import { fetchSuccess } from "@/app/constants/httpCode";
import getData from "@/lib/getData";
import { toast } from "sonner";

// Hook générique untuk CRUD operations
export const useEntityOperations = (entityName: string) => {
  const config = ENTITY_CONFIGS[entityName];
  
  if (!config) {
    throw new Error(`Configuration not found for entity: ${entityName}`);
  }

  const create = async (data: any, additionalData?: any) => {
    const response = await getData({
      endpoint: config.endpoint,
      method: "POST",
      data: { ...data, ...additionalData },
    });

    if (fetchSuccess(response.status)) {
      toast.success(`${config.displayName} créé avec succès!`);
      return { success: true, data: response.data };
    } else {
      toast.error(`Échec de la création du ${config.displayName.toLowerCase()}.`);
      return { success: false, error: response };
    }
  };

  const update = async (id: string, data: any) => {
    const response = await getData({
      endpoint: `${config.endpoint}/${id}`,
      method: "PATCH",
      data,
    });

    if (fetchSuccess(response.status)) {
      toast.success(`${config.displayName} mis à jour avec succès!`);
      return { success: true, data: response.data };
    } else {
      toast.error(`Échec de la mise à jour du ${config.displayName.toLowerCase()}.`);
      return { success: false, error: response };
    }
  };

  const remove = async (id: string) => {
    const response = await getData({
      endpoint: `${config.endpoint}/${id}`,
      method: "DELETE",
    });

    if (fetchSuccess(response.status)) {
      toast.success(`${config.displayName} supprimé avec succès!`);
      return { success: true };
    } else {
      toast.error(`Échec de la suppression du ${config.displayName.toLowerCase()}.`);
      return { success: false, error: response };
    }
  };

  return {
    config,
    create,
    update,
    remove,
  };
};