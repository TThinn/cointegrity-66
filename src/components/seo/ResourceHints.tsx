
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { getPerformanceDirectives, generateCSPDirectives } from "@/utils/performanceHeaders";
import { generateHreflangData } from "@/utils/seoUtils";

export const ResourceHints = () => {
  const location = useLocation();
  const performanceDirectives = getPerformanceDirectives(location.pathname);
  const cspDirectives = generateCSPDirectives();
  const hreflangData = generateHreflangData(location.pathname);
  
  // Generate CSP header string
  const cspHeader = Object.entries(cspDirectives)
    .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
    .join('; ');

  return (
    <Helmet>
      {/* Security and Performance Headers */}
      <meta httpEquiv="Content-Security-Policy" content={cspHeader} />
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      
      {/* DNS prefetch for third-party domains */}
      {performanceDirectives.dns_prefetch.map((domain) => (
        <link key={domain} rel="dns-prefetch" href={domain} />
      ))}
      
      {/* Preconnect to critical third-party origins */}
      {performanceDirectives.preconnect.map((connection) => (
        <link 
          key={connection.href} 
          rel="preconnect" 
          href={connection.href} 
          crossOrigin={connection.crossorigin || undefined} 
        />
      ))}
      
      {/* Preload critical resources */}
      {performanceDirectives.preload.map((resource) => (
        <link
          key={resource.href}
          rel="preload"
          href={resource.href}
          as={resource.as}
          type={resource.type}
          crossOrigin={resource.crossorigin || undefined}
        />
      ))}
      
      {/* Prefetch likely next pages */}
      {performanceDirectives.prefetch.map((resource) => (
        <link
          key={resource.href}
          rel="prefetch"
          href={resource.href}
          as={resource.as}
        />
      ))}
      
      {/* Hreflang for internationalization */}
      {hreflangData.map((lang) => (
        <link
          key={lang.hreflang}
          rel="alternate"
          hrefLang={lang.hreflang}
          href={lang.href}
        />
      ))}
      
      {/* Performance hints */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="msapplication-tap-highlight" content="no" />
    </Helmet>
  );
};
