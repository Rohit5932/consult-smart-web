
import { useEffect } from 'react';

interface GoogleAnalyticsProps {
  measurementId: string;
}

const GoogleAnalytics = ({ measurementId }: GoogleAnalyticsProps) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Load Google Analytics script
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script1);

      // Initialize gtag
      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${measurementId}');
      `;
      document.head.appendChild(script2);
    }
  }, [measurementId]);

  return null;
};

export default GoogleAnalytics;
