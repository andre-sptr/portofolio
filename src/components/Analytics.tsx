import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag?: (key: string, trackingId: string, config: { page_path: string }) => void;
  }
}

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    const trackingId = 'G-RKHP9YC18M';

    if (window.gtag) {
      window.gtag('config', trackingId, {
        page_path: location.pathname + location.search,
      });
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] Page view: ${location.pathname}${location.search}`);
    }
  }, [location]);

  return null;
};

export default Analytics;
