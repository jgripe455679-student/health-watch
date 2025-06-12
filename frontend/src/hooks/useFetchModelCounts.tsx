import { useEffect, useState } from "react";
import { get } from "../api/apiClient";

interface ModelCounts {
  healthRecords: number;
  profiles: number;
  systemUsers: number;
}

const useFetchModelCounts = () => {
  const [counts, setCounts] = useState<ModelCounts | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCounts = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const [healthRecordsRes, profilesRes, systemUsersRes] =
          await Promise.all([
            get("/records/count"),
            get("/profiles/count"),
            get("users/count"),
          ]);
        setCounts({
          healthRecords: healthRecordsRes.data as number,
          profiles: profilesRes.data as number,
          systemUsers: systemUsersRes.data as number,
        });
      } catch (error) {
        console.error("Error fetch model counts: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCounts();
  }, []);
  return { counts, isLoading };
};

export default useFetchModelCounts;
