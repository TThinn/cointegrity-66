
import React from "react";

interface InvisibleInternalLinksProps {
  currentPath: string;
}

export const InvisibleInternalLinks: React.FC<InvisibleInternalLinksProps> = ({ currentPath }) => {
  const pathWithoutSlash = currentPath.replace(/^\/+/, '');
  
  // Define related links based on current page
  const getRelatedLinks = () => {
    const linkMap: Record<string, Array<{ href: string; text: string }>> = {
      '': [ // Homepage
        { href: '/web3-consulting', text: 'Web3 Consulting Services' },
        { href: '/services', text: 'Blockchain Strategy Services' },
        { href: '/about', text: 'About Our Web3 Experts' },
        { href: '/contact', text: 'Web3 Consultation Contact' },
        { href: '/glossary', text: 'Web3 Glossary' }
      ],
      'web3-consulting': [
        { href: '/services', text: 'Web3 Implementation Services' },
        { href: '/about', text: 'Web3 Consulting Expertise' },
        { href: '/contact', text: 'Schedule Web3 Consultation' },
        { href: '/testimonials', text: 'Web3 Success Stories' }
      ],
      'services': [
        { href: '/web3-consulting', text: 'Web3 Consulting Solutions' },
        { href: '/about', text: 'Service Expertise' },
        { href: '/contact', text: 'Request Services' },
        { href: '/process', text: 'Implementation Process' }
      ],
      'about': [
        { href: '/web3-consulting', text: 'Web3 Consulting Approach' },
        { href: '/services', text: 'Our Service Offerings' },
        { href: '/team', text: 'Meet Our Team' },
        { href: '/testimonials', text: 'Client Testimonials' }
      ],
      'team': [
        { href: '/about', text: 'Company Background' },
        { href: '/services', text: 'Team Services' },
        { href: '/testimonials', text: 'Team Success Stories' },
        { href: '/contact', text: 'Contact Our Team' }
      ],
      'contact': [
        { href: '/web3-consulting', text: 'Web3 Consulting Inquiry' },
        { href: '/services', text: 'Service Information' },
        { href: '/about', text: 'Learn About Us' },
        { href: '/glossary', text: 'Web3 Terms' }
      ],
      'blog': [
        { href: '/web3-consulting', text: 'Web3 Consulting Insights' },
        { href: '/guides', text: 'Implementation Guides' },
        { href: '/glossary', text: 'Web3 Terminology' },
        { href: '/services', text: 'Professional Services' }
      ],
      'guides': [
        { href: '/blog', text: 'Web3 Articles' },
        { href: '/services', text: 'Professional Guidance' },
        { href: '/contact', text: 'Expert Consultation' },
        { href: '/glossary', text: 'Technical Terms' }
      ],
      'case-studies': [
        { href: '/testimonials', text: 'Client Reviews' },
        { href: '/services', text: 'Case Study Services' },
        { href: '/contact', text: 'Discuss Your Case' },
        { href: '/about', text: 'Our Approach' }
      ],
      'glossary': [
        { href: '/blog', text: 'Related Articles' },
        { href: '/guides', text: 'Implementation Guides' },
        { href: '/services', text: 'Professional Services' },
        { href: '/contact', text: 'Ask Questions' }
      ]
    };

    return linkMap[pathWithoutSlash] || [];
  };

  const relatedLinks = getRelatedLinks();

  if (relatedLinks.length === 0) return null;

  return (
    <div className="sr-only" aria-hidden="true">
      {/* These links are invisible but help with SEO and internal linking */}
      <nav aria-label="Related content">
        {relatedLinks.map((link, index) => (
          <a key={index} href={link.href} tabIndex={-1}>
            {link.text}
          </a>
        ))}
      </nav>
    </div>
  );
};
