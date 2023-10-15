import { useEffect } from "react";
import { BlogAnalytics } from "../pages/api/analytics/BlogAnalytics";

const useAnalytics = (page: string) => {
  const blogAnalytics = BlogAnalytics.getInstance();

  useEffect(() => {
    const start = Date.now();
    blogAnalytics.trackPageVisit(page);

    const handleVisibilityChange = () => {
      const elapsed = (Date.now() - start) / 1000;
      blogAnalytics.recordTimeSpentOnPage(page, elapsed);
    };

    const handleBeforeUnload = (event: { returnValue: any }) => {
      handleVisibilityChange();
      blogAnalytics.sendAnalyticsData();
      delete event.returnValue;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [blogAnalytics, page]);
};

export default useAnalytics;
