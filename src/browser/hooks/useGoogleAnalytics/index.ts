export const useGoogleAnalytics = () => {
  if (!import.meta.env.PROD) return;

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
};
