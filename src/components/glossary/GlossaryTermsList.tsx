
import React from "react";
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
  return (
    <>
      {letters.map((letter) => (
        <div key={letter} id={`section-${letter}`} className="mb-8">
          <div className="sticky top-0 bg-background z-10 py-2">
            <h2 className="text-2xl font-bold">{letter}</h2>
            <Separator className="my-2" />
          </div>
          
          <div className="space-y-4">
            {groupedTerms[letter].map((term, index) => (
              <Card key={`${term.term}-${index}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start flex-wrap">
                    <CardTitle className="text-xl" id={term.term.toLowerCase().replace(/\s+/g, '-')}>
                      {term.term}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {term.categories.map((category) => (
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
