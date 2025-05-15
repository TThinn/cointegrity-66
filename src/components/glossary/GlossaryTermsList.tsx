
import React, { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { glossaryTerms } from "@/data/glossaryTerms";

interface GlossaryTermsListProps {
  letters: string[];
  groupedTerms: Record<string, typeof glossaryTerms>;
}

export const GlossaryTermsList: React.FC<GlossaryTermsListProps> = ({
  letters,
  groupedTerms,
}) => {
  // Enhanced debugging for data verification
  useEffect(() => {
    console.log("🔎 GlossaryTermsList - Component mounted");
    
    // Direct import check
    try {
      console.log(`🔎 Direct import glossaryTerms length: ${glossaryTerms.length}`);
      
      // Check for syntax issues or circular references
      try {
        const serialized = JSON.stringify(glossaryTerms.slice(0, 5));
        console.log(`🔎 First 5 terms can be serialized (${serialized.length} bytes)`);
      } catch (e) {
        console.error("🔎 ERROR: Cannot serialize glossaryTerms:", e);
      }
      
      // Check the import path
      console.log("🔎 Import path: @/data/glossaryTerms");
      
    } catch (e) {
      console.error("🔎 CRITICAL ERROR accessing glossaryTerms directly:", e);
    }
    
    // Props verification
    console.log(`🔎 GlossaryTermsList received ${letters.length} letters with terms`);
    
    const totalTermsInGroups = Object.values(groupedTerms).reduce(
      (count, terms) => count + terms.length, 
      0
    );
    console.log(`🔎 Total terms in grouped data: ${totalTermsInGroups}`);
    
    // Check if the data source seems to match what's expected
    try {
      if (glossaryTerms.length !== totalTermsInGroups) {
        console.warn(`🔎 Data source mismatch! Direct import: ${glossaryTerms.length}, Grouped terms: ${totalTermsInGroups}`);
        
        // Try to identify why there's a mismatch
        if (glossaryTerms.length > totalTermsInGroups) {
          console.warn(`🔎 Filtering seems to be reducing the terms count. Check filter criteria.`);
        } else {
          console.warn(`🔎 Grouped terms count exceeds direct import. Possible data duplication or separate source.`);
        }
      }
    } catch (e) {
      console.error("🔎 Error comparing data sources:", e);
    }
    
    // Log sample of direct import to compare
    try {
      if (glossaryTerms.length > 0) {
        console.log("🔎 Direct import sample terms:", 
          glossaryTerms.slice(0, 3).map(t => t.term));
      }
    } catch (e) {
      console.error("🔎 Error accessing glossaryTerms array:", e);
    }
    
    // Check for empty or incorrect data
    if (letters.length === 0) {
      console.warn("🔎 No letters provided to GlossaryTermsList");
    }
    
    // Check for potential data structure issues
    if (Object.keys(groupedTerms).length === 0) {
      console.warn("🔎 Empty groupedTerms object provided");
    } else {
      // Verify the first group has expected structure
      const firstLetter = letters[0];
      if (firstLetter && groupedTerms[firstLetter]) {
        try {
          const firstGroup = groupedTerms[firstLetter];
          console.log(`🔎 First letter group (${firstLetter}) has ${firstGroup.length} terms`);
          if (firstGroup.length > 0) {
            console.log("🔎 Sample term from first group:", firstGroup[0].term);
          }
        } catch (e) {
          console.error("🔎 Error accessing first group:", e);
        }
      }
    }
  }, [letters, groupedTerms]);

  // Handle the case where no letters/terms are provided
  if (letters.length === 0) {
    return (
      <Card className="p-6">
        <p>No glossary terms found. This could indicate a data loading issue.</p>
      </Card>
    );
  }

  return (
    <>
      {letters.map((letter) => (
        <div key={letter} id={`section-${letter}`} className="mb-8">
          <div className="sticky top-0 bg-background z-10 py-2">
            <h2 className="text-2xl font-bold">{letter}</h2>
            <Separator className="my-2" />
          </div>
          
          <div className="space-y-4">
            {groupedTerms[letter] && groupedTerms[letter].map((term, index) => (
              <Card key={`${term.term}-${index}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start flex-wrap">
                    <CardTitle className="text-xl" id={term.term.toLowerCase().replace(/\s+/g, '-')}>
                      {term.term}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {term.categories && term.categories.map((category) => (
                        <Badge key={category} variant="outline" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-sm pb-4">
                  <p dangerouslySetInnerHTML={{ __html: term.definition }} />
                  {term.related && term.related.length > 0 && (
                    <div className="mt-3">
                      <span className="text-xs font-semibold">Related terms: </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {term.related.map((relatedTerm) => (
                          <a 
                            key={relatedTerm} 
                            href={`#${relatedTerm.toLowerCase().replace(/\s+/g, '-')}`}
                            className="text-xs text-primary hover:underline"
                          >
                            {relatedTerm}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};
