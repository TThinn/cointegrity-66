
import { useEffect } from 'react';

interface InternalLink {
  text: string;
  url: string;
  context: string;
}

export const useInternalLinking = () => {
  useEffect(() => {
    const addInternalLinks = () => {
      const internalLinks: InternalLink[] = [
        { text: 'Web3 consulting', url: '/services', context: 'Web3 consulting services' },
        { text: 'blockchain implementation', url: '/services', context: 'blockchain implementation solutions' },
        { text: 'regulatory compliance', url: '/services', context: 'regulatory compliance guidance' },
        { text: 'tokenomics design', url: '/services', context: 'tokenomics design services' },
        { text: 'our process', url: '/process', context: 'our proven methodology' },
        { text: 'our team', url: '/team', context: 'meet our expert team' },
        { text: 'testimonials', url: '/testimonials', context: 'client success stories' },
        { text: 'partners', url: '/partners', context: 'our trusted partners' },
        { text: 'contact us', url: '/contact', context: 'get in touch with us' }
      ];

      // Function to create invisible internal links
      const createInvisibleLink = (element: Element, linkData: InternalLink) => {
        const text = element.textContent || '';
        const regex = new RegExp(`\\b${linkData.text}\\b`, 'gi');
        
        if (regex.test(text) && !element.querySelector('a[href="' + linkData.url + '"]')) {
          const newHTML = text.replace(regex, (match) => {
            return `<a href="${linkData.url}" style="color: inherit; text-decoration: none;" title="${linkData.context}">${match}</a>`;
          });
          element.innerHTML = newHTML;
        }
      };

      // Apply internal linking to text content
      const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
      textElements.forEach(element => {
        // Skip if already contains links or is in navigation
        if (element.closest('nav') || element.querySelector('a') || element.closest('a')) {
          return;
        }

        internalLinks.forEach(linkData => {
          createInvisibleLink(element, linkData);
        });
      });
    };

    // Add links after a short delay to ensure content is loaded
    const timer = setTimeout(addInternalLinks, 1000);

    return () => clearTimeout(timer);
  }, []);
};
