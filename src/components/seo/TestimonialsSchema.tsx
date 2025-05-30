
import { useEffect } from 'react';

export const TestimonialsSchema = () => {
  useEffect(() => {
    // Review/Rating schema for testimonials
    const reviewsSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Cointegrity",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "25",
        bestRating: "5"
      },
      review: [
        {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5"
          },
          author: {
            "@type": "Person",
            name: "Sarah Chen"
          },
          reviewBody: "Cointegrity transformed our approach to blockchain integration. Their expertise in regulatory compliance and technical implementation was invaluable.",
          datePublished: "2024-01-15"
        },
        {
          "@type": "Review", 
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5"
          },
          author: {
            "@type": "Person",
            name: "Marcus Rodriguez"
          },
          reviewBody: "Outstanding Web3 consulting services. They helped us navigate complex tokenomics and regulatory requirements seamlessly.",
          datePublished: "2024-02-20"
        },
        {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating", 
            ratingValue: "4",
            bestRating: "5"
          },
          author: {
            "@type": "Person",
            name: "Dr. Emily Watson"
          },
          reviewBody: "Professional, knowledgeable, and results-driven. Cointegrity delivered exactly what we needed for our Web3 transition.",
          datePublished: "2024-03-10"
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'testimonials-schema';
    script.textContent = JSON.stringify(reviewsSchema);
    document.head.appendChild(script);

    return () => {
      const schema = document.getElementById('testimonials-schema');
      if (schema) schema.remove();
    };
  }, []);

  return null;
};
