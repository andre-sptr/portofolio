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
    // This is a placeholder for Google Analytics or other tracking tools
    // Replace 'G-XXXXXXXXXX' with your actual tracking ID
    const trackingId = 'G-XXXXXXXXXX';

    if (window.gtag) {
      window.gtag('config', trackingId, {
        page_path: location.pathname + location.search,
      });
    }

    // Example of logging page view to console for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] Page view: ${location.pathname}${location.search}`);
    }
  }, [location]);

  return null;
};

export default Analytics;
