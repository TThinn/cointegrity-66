import React from 'react';

interface NavigationDotsProps {
  sections: string[];
  activeSection: number;
  onSectionClick: (index: number) => void;
}

const NavigationDots: React.FC<NavigationDotsProps> = ({
  sections,
  activeSection,
  onSectionClick
}) => {
  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block">
      <div className="space-y-3">
        {sections.map((section, index) => (
          <button
            key={index}
            onClick={() => onSectionClick(index)}
            className={`group relative block w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === index 
                ? 'bg-client-accent scale-125' 
                : 'bg-client-border hover:bg-client-accent/50'
            }`}
            aria-label={`Go to ${section} section`}
          >
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-client-card-bg text-client-text-primary border border-client-border shadow-sm px-2 py-1 rounded text-xs whitespace-nowrap">
                {section}
              </div>
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 translate-x-full">
                <div className="w-2 h-2 bg-client-card-bg border border-client-border transform rotate-45"></div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavigationDots;