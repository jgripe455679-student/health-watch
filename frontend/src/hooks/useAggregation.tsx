import { useMemo } from "react";

const useAggregation = <T extends { recordCount: number }>(
  data: T[],
  column: keyof T
) => {
  return useMemo(() => {
    const m = new Map<string, number>();
    for (const row of data) {
      const key = String(row[column]);
      m.set(key, (m.get(key) ?? 0) + row.recordCount);
    }
    return Array.from(m.entries()).map(([column, recordCount]) => ({
      column,
      recordCount,
    }));
  }, [data, column]);
};

export default useAggregation;
