import { useEffect } from "react";

const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title} - HealthWatch`;
  }, [title]);
};

export default useDocumentTitle;
