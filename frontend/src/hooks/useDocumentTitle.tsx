import { useEffect } from "react";

const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title} - HealthWatch Admin`;
  }, [title]);
};

export default useDocumentTitle;
