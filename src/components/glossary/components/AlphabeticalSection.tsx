
import React from "react";
import { Separator } from "@/components/ui/separator";
import { GlossaryTerm } from "../types";
import { TermCard } from "./TermCard";

interface AlphabeticalSectionProps {
  letter: string;
  terms: GlossaryTerm[];
}

export const AlphabeticalSection: React.FC<AlphabeticalSectionProps> = ({
  letter,
  terms
}) => {
  return (
    <div id={`section-${letter}`} className="mb-8">
      <div className="sticky top-0 bg-[#080112]/90 backdrop-blur-sm z-10 py-2">
        <h2 className="text-2xl font-bold text-white">{letter}</h2>
        <Separator className="my-2 bg-white/20" />
      </div>
      
      <div className="space-y-4">
        {terms.map((term, index) => (
          <TermCard 
            key={`${letter}-${term.term}-${index}`}
            term={term} 
            index={index} 
            isDirect={false}
            isSearching={false}
          />
        ))}
      </div>
    </div>
  );
};
