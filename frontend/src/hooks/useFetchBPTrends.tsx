import { useEffect, useMemo, useState } from "react";
import { get } from "../api/apiClient";

interface BPTrends {
  id: number;
  recordDate: string;
  systolicMean: number;
  systolicMedian: number;
  systolicStd: number;
  diastolicMean: number;
  diastolicMedian: number;
  diastolicStd: number;
}

interface FetchBPTrendsResult<BPTrends> {
  data: BPTrends[];
}

const useFetchBPTrends = (
  startDate?: string,
  endDate?: string
): FetchBPTrendsResult<BPTrends> => {
  const [data, setData] = useState<BPTrends[]>([]);

  const fetchBPTrends = async (): Promise<void> => {
    try {
      const response = await get("/reports/bp-trends");
      setData(response.data as BPTrends[]);
    } catch (error) {
      console.error("Error fetching bp trends data: ", error);
    }
  };

  const fetchFilteredBPTrends = async (
    startDate: string,
    endDate: string
  ): Promise<void> => {
    try {
      const response = await get(
        `/reports/bp-trends/filter?startDate=${startDate}&endDate=${endDate}`
      );
      setData(response.data as BPTrends[]);
    } catch (error) {
      console.error("Error fetching bp trends data: ", error);
    }
  };

  useEffect(() => {
    (async (): Promise<void> => {
      if (startDate && endDate) {
        await fetchFilteredBPTrends(startDate, endDate);
      } else {
        await fetchBPTrends();
      }
    })();
  }, [startDate, endDate]);

  const filteredData = useMemo(() => {
    return data
      .filter((d) => d.systolicMean > 0 && d.diastolicMean > 0)
      .sort(
        (a, b) =>
          new Date(a.recordDate).getTime() - new Date(b.recordDate).getTime()
      );
  }, [data]);

  return {
    data: filteredData,
  };
};

export default useFetchBPTrends;
