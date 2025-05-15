
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { GlossaryTerm } from "./types";

interface AlphabeticalIndexProps {
  letters: string[];
  groupedTerms: Record<string, GlossaryTerm[]>;
  scrollToSection: (letter: string) => void;
}

export const AlphabeticalIndex: React.FC<AlphabeticalIndexProps> = ({
  letters,
  groupedTerms,
  scrollToSection,
}) => {
  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="text-lg">Alphabetical Index</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="grid grid-cols-4 gap-2">
            {Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").map((letter) => {
              const hasTerms = letters.includes(letter);
              return (
                <Button
                  key={letter}
                  variant={hasTerms ? "outline" : "ghost"}
                  size="sm"
                  disabled={!hasTerms}
                  onClick={() => hasTerms && scrollToSection(letter)}
                  className={cn(
                    "w-8 h-8 p-0",
                    !hasTerms && "opacity-30"
                  )}
                >
                  {letter}
                </Button>
              );
            })}
          </div>
          
          <Separator className="my-4" />
          
          {letters.length > 0 ? (
            <div className="space-y-1 px-1">
              {letters.map((letter) => (
                <div key={`nav-${letter}`} className="mb-2">
                  <div className="font-bold mb-1">{letter}</div>
                  <div className="pl-2 space-y-1">
                    {groupedTerms[letter].map((term) => (
                      <a
                        key={`link-${term.term}`}
                        href={`#${term.term.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block text-sm hover:text-primary truncate"
                      >
                        {term.term}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-4">
              No terms match your current filters
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
