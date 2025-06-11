import { useEffect } from "react";

export const useGoogleAnalytics = () => {
  useEffect(() => {
    if (!import.meta.env.PROD) return;

    try {
      const script = document.createElement("script");
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-0G3HG1YZL0";
      script.async = true;
      document.head.appendChild(script);

      const globalWindow = window as any;

      globalWindow.dataLayer = globalWindow.dataLayer || [];
      function gtag(...args: any[]) {
        globalWindow.dataLayer.push(args);
      }

      gtag("js", new Date());
      gtag("config", "G-0G3HG1YZL0");
    } catch (e) {
      console.error("Error:: loading google analytics failed", e);
    }
  }, []);
};
