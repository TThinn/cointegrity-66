
import { useState, useEffect, useRef } from 'react';
import { testimonials } from './testimonialsData';

export const useCardHeight = () => {
  const [maxCardHeight, setMaxCardHeight] = useState<number>(0);
  const measurementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create a temporary measurement container
    const measurementContainer = document.createElement('div');
    measurementContainer.style.position = 'absolute';
    measurementContainer.style.visibility = 'hidden';
    measurementContainer.style.top = '-9999px';
    measurementContainer.style.width = '320px'; // Approximate card width
    document.body.appendChild(measurementContainer);

    let maxHeight = 0;

    // Measure each testimonial
    testimonials.forEach((testimonial) => {
      const cardElement = document.createElement('div');
      cardElement.className = 'glass bg-white/5 backdrop-blur-md border border-white/10 p-8 shadow-lg transition-all duration-300 relative z-30';
      cardElement.style.width = '100%';
      
      const contentDiv = document.createElement('div');
      contentDiv.className = 'text-left h-full flex flex-col justify-between';
      
      const quoteP = document.createElement('p');
      quoteP.className = 'text-white/80 text-sm mb-6 flex-1 overflow-hidden';
      quoteP.textContent = `"${testimonial.quote}"`;
      
      const authorDiv = document.createElement('div');
      authorDiv.className = 'flex-shrink-0';
      
      const nameP = document.createElement('p');
      nameP.className = 'text-white font-semibold';
      nameP.textContent = testimonial.name;
      
      const titleP = document.createElement('p');
      titleP.className = 'text-white/60 text-xs';
      titleP.textContent = testimonial.title;
      
      authorDiv.appendChild(nameP);
      authorDiv.appendChild(titleP);
      contentDiv.appendChild(quoteP);
      contentDiv.appendChild(authorDiv);
      cardElement.appendChild(contentDiv);
      measurementContainer.appendChild(cardElement);
      
      const height = cardElement.offsetHeight;
      if (height > maxHeight) {
        maxHeight = height;
      }
      
      measurementContainer.removeChild(cardElement);
    });

    // Clean up
    document.body.removeChild(measurementContainer);
    
    // Add some padding to ensure comfort
    setMaxCardHeight(maxHeight + 20);
  }, []);

  return { maxCardHeight };
};
