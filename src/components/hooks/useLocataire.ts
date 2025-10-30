import { Locataire } from "@/app/(app)/locataire/page";
import getDate, { fetchSuccess } from "@/lib/getData";
import React from "react";

interface useLocataireProps {
  locataireId?: string;
  endpoint: string;
}
const useLocataire = ({ locataireId, endpoint }: useLocataireProps) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [data, setData] = React.useState<Locataire[]>([]);

  React.useEffect(() => {
    setLoading(true);
    const fetchLocataire = async () => {
      // Fetch locataire data logic here
      const response = await getDate({
        endpoint: `/${endpoint}/${locataireId || ""}`,
      });
      
      if (fetchSuccess(response.status)) {
        if (locataireId) {
          setData(response.data);
        } else {
          setData(response.data.data);
        }

        setLoading(false);
      } else {
        setError("Failed to fetch locataire data");
      }
    };
    fetchLocataire();
  }, [locataireId]);
  return { data, loading, error };
};

export default useLocataire;



