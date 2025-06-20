
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
    }> = {
      '': {
        lastModified: '2024-12-20T00:00:00Z',
        publishDate: '2024-01-01T00:00:00Z',
        contentType: 'homepage',
        updateFrequency: 'weekly',
        contentStatus: 'updated',
        reviewCycle: 'weekly'
      },
      'web3-consulting': {
        lastModified: '2024-12-20T00:00:00Z',
        publishDate: '2024-01-01T00:00:00Z',
        contentType: 'service-page',
        updateFrequency: 'monthly',
        contentStatus: 'updated',
        reviewCycle: 'monthly'
      },
      'about': {
        lastModified: '2024-12-15T00:00:00Z',
        publishDate: '2024-01-01T00:00:00Z',
        contentType: 'company-information',
        updateFrequency: 'quarterly',
        contentStatus: 'reviewed',
        reviewCycle: 'quarterly'
      },
      'services': {
        lastModified: '2024-12-20T00:00:00Z',
        publishDate: '2024-01-01T00:00:00Z',
        contentType: 'service-catalog',
        updateFrequency: 'monthly',
        contentStatus: 'updated',
        reviewCycle: 'monthly'
      },
      'team': {
        lastModified: '2024-12-01T00:00:00Z',
        publishDate: '2024-01-01T00:00:00Z',
        contentType: 'team-profiles',
        updateFrequency: 'quarterly',
        contentStatus: 'published',
        reviewCycle: 'quarterly'
      },
      'process': {
        lastModified: '2024-12-01T00:00:00Z',
        publishDate: '2024-01-01T00:00:00Z',
        contentType: 'methodology',
        updateFrequency: 'yearly',
        contentStatus: 'reviewed',
        reviewCycle: 'yearly'
      },
      'partners': {
        lastModified: '2024-12-01T00:00:00Z',
        publishDate: '2024-01-01T00:00:00Z',
        contentType: 'partnership-catalog',
        updateFrequency: 'monthly',
        contentStatus: 'updated',
        reviewCycle: 'monthly'
      },
      'testimonials': {
        lastModified: '2024-12-15T00:00:00Z',
        publishDate: '2024-01-01T00:00:00Z',
        contentType: 'testimonials',
        updateFrequency: 'monthly',
        contentStatus: 'updated',
        reviewCycle: 'monthly'
      },
      'contact': {
        lastModified: '2024-12-20T00:00:00Z',
        publishDate: '2024-01-01T00:00:00Z',
        contentType: 'contact-information',
        updateFrequency: 'weekly',
        contentStatus: 'reviewed',
        reviewCycle: 'weekly'
      },
      'glossary': {
        lastModified: '2024-12-20T00:00:00Z',
        publishDate: '2024-03-01T00:00:00Z',
        contentType: 'educational-resource',
        updateFrequency: 'weekly',
        contentStatus: 'updated',
        reviewCycle: 'weekly'
      },
      'blog': {
        lastModified: '2024-12-20T00:00:00Z',
        publishDate: '2024-06-01T00:00:00Z',
        contentType: 'blog-content',
        updateFrequency: 'weekly',
        contentStatus: 'updated',
        reviewCycle: 'weekly'
      },
      'guides': {
        lastModified: '2024-12-20T00:00:00Z',
        publishDate: '2024-06-01T00:00:00Z',
        contentType: 'guide-content',
        updateFrequency: 'weekly',
        contentStatus: 'updated',
        reviewCycle: 'weekly'
      },
      'case-studies': {
        lastModified: '2024-12-20T00:00:00Z',
        publishDate: '2024-06-01T00:00:00Z',
        contentType: 'case-study-content',
        updateFrequency: 'monthly',
        contentStatus: 'updated',
        reviewCycle: 'monthly'
      },
      'mica-ready-waitlist': {
        lastModified: '2024-12-20T00:00:00Z',
        publishDate: '2024-11-01T00:00:00Z',
        contentType: 'landing-page',
        updateFrequency: 'monthly',
        contentStatus: 'updated',
        reviewCycle: 'monthly'
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
