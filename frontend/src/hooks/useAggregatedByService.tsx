import { useMemo } from "react";
import { ServiceUsage } from "../components/charts/ServiceUsageChart";

const useAggregatedByService = (usages: ServiceUsage[]) => {
  return useMemo(() => {
    const m = new Map<string, number>();
    for (const { service, recordCount } of usages) {
      m.set(service, (m.get(service) ?? 0) + recordCount);
    }
    return Array.from(m, ([service, recordCount]) => ({
      service,
      recordCount,
    }));
  }, [usages]);
};

export default useAggregatedByService;
