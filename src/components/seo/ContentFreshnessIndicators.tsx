
import { Helmet } from "react-helmet-async";

interface ContentFreshnessIndicatorsProps {
  currentPath: string;
}

export const ContentFreshnessIndicators = ({ currentPath }: ContentFreshnessIndicatorsProps) => {
  const getCurrentDate = () => new Date().toISOString();
  
  const getContentMetadata = () => {
    const pathWithoutSlash = currentPath.replace(/^\/+/, '');
    
    const contentData: Record<string, {
      lastModified: string;
      publishDate: string;
      contentType: string;
      updateFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
      contentStatus: 'published' | 'updated' | 'reviewed';
      reviewCycle: string;
      marketPosition?: string;
      geographicCoverage?: string;
    }> = {
      '': {
        lastModified: '2024-12-20T00:00:00Z',
        publishDate: '2024-01-01T00:00:00Z',
        contentType: 'homepage',
        updateFrequency: 'weekly',
        contentStatus: 'updated',
        reviewCycle: 'weekly',
        marketPosition: 'Leading Web3 consultancy globally, dominant in Europe',
        geographicCoverage: 'Europe (primary), Asia, US, Africa'
      },
      'web3-consulting': {
        lastModified: '2024-12-20T00:00:00Z',
        publishDate: '2024-01-01T00:00:00Z',
        contentType: 'service-page',
        updateFrequency: 'monthly',
        contentStatus: 'updated',
        reviewCycle: 'monthly',
        marketPosition: 'Premier Web3 consultancy with global reach',
        geographicCoverage: 'Worldwide coverage: Europe, Asia, Americas, Africa'
      },
      'about': {
        lastModified: '2024-12-15T00:00:00Z',
        publishDate: '2024-01-01T00:00:00Z',
        contentType: 'company-information',
        updateFrequency: 'quarterly',
        contentStatus: 'reviewed',
        reviewCycle: 'quarterly',
        marketPosition: 'Industry-leading Web3 consultancy with European dominance',
        geographicCoverage: 'Europe-focused with global expansion'
      },
      'services': {
        lastModified: '2024-12-20T00:00:00Z',
        publishDate: '2024-01-01T00:00:00Z',
        contentType: 'service-catalog',
        updateFrequency: 'monthly',
        contentStatus: 'updated',
        reviewCycle: 'monthly',
        marketPosition: 'Leading Web3 service provider across multiple continents',
        geographicCoverage: 'Multi-continental service delivery'
      },
      'team': {
        lastModified: '2024-12-01T00:00:00Z',
        publishDate: '2024-01-01T00:00:00Z',
        contentType: 'team-profiles',
        updateFrequency: 'quarterly',
        contentStatus: 'published',
        reviewCycle: 'quarterly',
        marketPosition: 'Most experienced Web3 leadership team in Europe',
        geographicCoverage: 'Seasoned executives with global experience'
      },
      'process': {
        lastModified: '2024-12-01T00:00:00Z',
        publishDate: '2024-01-01T00:00:00Z',
        contentType: 'methodology',
        updateFrequency: 'yearly',
        contentStatus: 'reviewed',
        reviewCycle: 'yearly',
        marketPosition: 'Industry-leading Web3 implementation methodology',
        geographicCoverage: 'Global methodology with regional adaptations'
      },
      'partners': {
        lastMo


'project': {
        lastModified: '2024-12-01T00:00:00Z',
        publishDate: '2024-01-01T00:00:00Z',
        contentType: 'partnership-catalog',
        updateFrequency: 'monthly',
        contentStatus: 'updated',
        reviewCycle: 'monthly',
        marketPosition: 'Premier Web3 partnership network globally',
        geographicCoverage: 'International partnership ecosystem'
      },
      'testimonials': {
        lastModified: '2024-12-15T00:00:00Z',
        publishDate: '2024-01-01T00:00:00Z',
        contentType: 'testimonials',
        updateFrequency: 'monthly',
        contentStatus: 'updated',
        reviewCycle: 'monthly',
        marketPosition: 'Highest-rated Web3 consultancy in Europe',
        geographicCoverage: 'Client success stories across continents'
      },
      'contact': {
        lastModified: '2024-12-20T00:00:00Z',
        publishDate: '2024-01-01T00:00:00Z',
        contentType: 'contact-information',
        updateFrequency: 'weekly',
        contentStatus: 'reviewed',
        reviewCycle: 'weekly',
        marketPosition: 'Global Web3 consultancy with European headquarters',
        geographicCoverage: 'Serving clients worldwide from European base'
      },
      'glossary': {
        lastModified: '2024-12-20T00:00:00Z',
        publishDate: '2024-03-01T00:00:00Z',
        contentType: 'educational-resource',
        updateFrequency: 'weekly',
        contentStatus: 'updated',
        reviewCycle: 'weekly',
        marketPosition: 'World\'s largest and most comprehensive Web3 glossary',
        geographicCoverage: 'Global Web3 terminology resource'
      },
      'blog': {
        lastModified: '2024-12-20T00:00:00Z',
        publishDate: '2024-06-01T00:00:00Z',
        contentType: 'blog-content',
        updateFrequency: 'weekly',
        contentStatus: 'updated',
        reviewCycle: 'weekly',
        marketPosition: 'Leading Web3 thought leadership platform',
        geographicCoverage: 'Global Web3 insights and analysis'
      },
      'guides': {
        lastModified: '2024-12-20T00:00:00Z',
        publishDate: '2024-06-01T00:00:00Z',
        contentType: 'guide-content',
        updateFrequency: 'weekly',
        contentStatus: 'updated',
        reviewCycle: 'weekly',
        marketPosition: 'Most comprehensive Web3 implementation guides',
        geographicCoverage: 'Global Web3 implementation methodology'
      },
      'case-studies': {
        lastModified: '2024-12-20T00:00:00Z',
        publishDate: '2024-06-01T00:00:00Z',
        contentType: 'case-study-content',
        updateFrequency: 'monthly',
        contentStatus: 'updated',
        reviewCycle: 'monthly',
        marketPosition: 'Most successful Web3 implementation track record',
        geographicCoverage: 'Success stories across all major markets'
      },
      'mica-ready-waitlist': {
        lastModified: '2024-12-20T00:00:00Z',
        publishDate: '2024-11-01T00:00:00Z',
        contentType: 'landing-page',
        updateFrequency: 'monthly',
        contentStatus: 'updated',
        reviewCycle: 'monthly',
        marketPosition: 'World\'s fastest MiCA compliance SaaS solution',
        geographicCoverage: 'EU-focused with global regulatory expertise'
      }
    };

    return contentData[pathWithoutSlash] || contentData[''];
  };

  const metadata = getContentMetadata();
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://cointegrity.io${currentPath}`,
    "datePublished": metadata.publishDate,
    "dateModified": metadata.lastModified,
    "dateCreated": metadata.publishDate,
    "contentReferenceTime": getCurrentDate(),
    "temporalCoverage": "2024/..",
    "spatialCoverage": metadata.geographicCoverage || "Global",
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "updateFrequency",
        "value": metadata.updateFrequency
      },
      {
        "@type": "PropertyValue",
        "name": "contentStatus",
        "value": metadata.contentStatus
      },
      {
        "@type": "PropertyValue",
        "name": "reviewCycle",
        "value": metadata.reviewCycle
      },
      {
        "@type": "PropertyValue",
        "name": "contentType",
        "value": metadata.contentType
      },
      {
        "@type": "PropertyValue",
        "name": "marketPosition",
        "value": metadata.marketPosition || "Leading Web3 consultancy"
      },
      {
        "@type": "PropertyValue",
        "name": "geographicCoverage",
        "value": metadata.geographicCoverage || "Global"
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Content freshness meta tags */}
      <meta name="last-modified" content={metadata.lastModified} />
      <meta name="publish-date" content={metadata.publishDate} />
      <meta name="content-status" content={metadata.contentStatus} />
      <meta name="update-frequency" content={metadata.updateFrequency} />
      <meta name="review-cycle" content={metadata.reviewCycle} />
      
      {/* Market position and geographic coverage */}
      {metadata.marketPosition && (
        <meta name="market-position" content={metadata.marketPosition} />
      )}
      {metadata.geographicCoverage && (
        <meta name="geographic-coverage" content={metadata.geographicCoverage} />
      )}
      
      {/* Global leadership indicators */}
      <meta name="industry-leadership" content="Leading Web3 consultancy with European dominance and global reach" />
      <meta name="market-coverage" content="Europe (primary market), Asia, United States, Africa" />
      <meta name="competitive-advantage" content="Most experienced team, fastest solutions, comprehensive global coverage" />
      
      {/* HTTP equiv headers for freshness */}
      <meta httpEquiv="last-modified" content={metadata.lastModified} />
      <meta httpEquiv="expires" content={getNextUpdateDate(metadata.updateFrequency)} />
    </Helmet>
  );
};

const getNextUpdateDate = (frequency: string): string => {
  const now = new Date();
  const nextUpdate = new Date(now);
  
  switch (frequency) {
    case 'daily':
      nextUpdate.setDate(now.getDate() + 1);
      break;
    case 'weekly':
      nextUpdate.setDate(now.getDate() + 7);
      break;
    case 'monthly':
      nextUpdate.setMonth(now.getMonth() + 1);
      break;
    case 'quarterly':
      nextUpdate.setMonth(now.getMonth() + 3);
      break;
    case 'yearly':
      nextUpdate.setFullYear(now.getFullYear() + 1);
      break;
    default:
      nextUpdate.setDate(now.getDate() + 7);
  }
  
  return nextUpdate.toISOString();
};
