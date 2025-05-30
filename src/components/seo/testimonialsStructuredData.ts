
import { testimonials } from "../testimonials/testimonialsData";

export const generateTestimonialsStructuredData = () => {
  return testimonials.map((testimonial, index) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "@id": `https://cointegrity.io/testimonials#review-${testimonial.id}`,
    "reviewBody": testimonial.quote,
    "author": {
      "@type": "Person",
      "name": testimonial.name,
      "jobTitle": testimonial.title
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": 5,
      "bestRating": 5
    },
    "itemReviewed": {
      "@type": "Organization",
      "name": "Cointegrity",
      "@id": "https://cointegrity.io/#organization"
    },
    "datePublished": "2024-01-01", // You can customize these dates
    "publisher": {
      "@type": "Organization",
      "name": "Cointegrity",
      "@id": "https://cointegrity.io/#organization"
    }
  }));
};

// Aggregate rating based on testimonials
export const AGGREGATE_RATING_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  "itemReviewed": {
    "@type": "Organization",
    "name": "Cointegrity",
    "@id": "https://cointegrity.io/#organization"
  },
  "ratingValue": 5,
  "bestRating": 5,
  "worstRating": 1,
  "ratingCount": testimonials.length,
  "reviewCount": testimonials.length
};
