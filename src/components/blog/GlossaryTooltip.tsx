import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface GlossaryTooltipProps {
  term: string;
  definition: string;
  children: React.ReactNode;
}

export const GlossaryTooltip: React.FC<GlossaryTooltipProps> = ({ 
  term, 
  definition, 
  children 
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <a 
          href={`/glossary#${term.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`}
          className="glossary-link text-primary underline decoration-dotted underline-offset-4 hover:decoration-solid transition-all duration-200"
        >
          {children}
        </a>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-4">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground">{term}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {definition}
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};