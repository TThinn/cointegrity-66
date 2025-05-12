
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useAnalytics } from "@/hooks/useAnalytics";

const NotFound = () => {
  const location = useLocation();
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Track 404 error as an event
    trackEvent("error_404", {
      category: "Error",
      label: location.pathname,
      nonInteraction: true
    });
  }, [location.pathname, trackEvent]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Helmet>
        <title>Page Not Found | Cointegrity</title>
        <meta name="description" content="The page you're looking for cannot be found. Navigate back to our homepage." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://cointegrity.io/404" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Page Not Found | Cointegrity" />
        <meta property="og:description" content="The page you're looking for cannot be found. Navigate back to our homepage." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://cointegrity.io${location.pathname}`} />
      </Helmet>
      
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <Link to="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
