
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
              "cursor-pointer transition-all h-16",
              activeCategory === category.value ? "border-primary" : "hover:border-primary/50"
            )}
            onClick={() => setActiveCategory(category.value as CategoryType | "all")}
          >
            <CardContent className="p-4 flex items-center justify-center h-full">
              <h3 className="font-semibold text-center">{category.label}</h3>
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
