import { useCallback, useState } from "react";

export interface DateRange {
  startDate: string;
  endDate: string;
}

const useDateRange = (initialRange?: DateRange) => {
  const [dateRange, setDateRange] = useState<DateRange>(
    initialRange || {
      startDate: "",
      endDate: "",
    }
  );

  const updateDateRange = useCallback((newRange: Partial<DateRange>) => {
    setDateRange((prevRange) => ({
      ...prevRange,
      ...newRange,
    }));
  }, []);

  const resetDateRange = useCallback(() => {
    setDateRange({
      startDate: "",
      endDate: "",
    });
  }, []);

  return {
    dateRange,
    updateDateRange,
    resetDateRange,
  };
};

export default useDateRange;
