
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CategoryType, categoryMeta } from "./types";

interface CategorySelectorProps {
  activeCategory: CategoryType | "all";
  setActiveCategory: (category: CategoryType | "all") => void;
  viewType: "grid" | "list";
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  activeCategory,
  setActiveCategory,
  viewType,
}) => {
  if (viewType === "grid") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {categoryMeta.map((category) => (
          <Card 
            key={category.value} 
            className={cn(
              "cursor-pointer transition-all",
              activeCategory === category.value ? "border-primary" : "hover:border-primary/50"
            )}
            onClick={() => setActiveCategory(category.value as CategoryType | "all")}
          >
            <CardContent className="p-4">
              <h3 className="font-semibold">{category.label}</h3>
              {category.value !== "all" && (
                <p className="text-xs text-muted-foreground mt-1">{category.description}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categoryMeta.map((category) => (
        <Button
          key={category.value}
          variant={activeCategory === category.value ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveCategory(category.value as CategoryType | "all")}
          className="rounded-full"
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
};
