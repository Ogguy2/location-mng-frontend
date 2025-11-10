import { fetchSuccess } from "@/app/constants/httpCode";
import getData from "@/lib/getData";
import { useQuery } from "@tanstack/react-query";

interface useLocProps {
  key: string;
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  // locataireId?: string;
}
export const useLoc = (endpoint: useLocProps) =>
  useQuery({
    queryKey: [endpoint.key],
    queryFn: async ({ queryKey }) => {
      console.log("Fetching data for key:", endpoint);
      const response = await getData({
        endpoint: endpoint.endpoint,
        method: endpoint.method ? endpoint.method : "GET",
        data: endpoint.method !== "GET" ? {} : undefined,
      });
      if (fetchSuccess(response.status)) {
        console.log("Data fetched for key:", queryKey, response.data);
        return response.data;
      } else {
        throw new Error("Error fetching data");
      }
    },
  });
