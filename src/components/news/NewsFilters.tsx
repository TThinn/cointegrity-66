import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { newsCategories } from '@/data/newsData';

interface NewsFiltersProps {
  searchQuery: string;
  selectedCategory: string;
  selectedTags: string[];
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onTagToggle: (tag: string) => void;
  onClearFilters: () => void;
  availableTags: string[];
}

export const NewsFilters = ({
  searchQuery,
  selectedCategory,
  selectedTags,
  onSearchChange,
  onCategoryChange,
  onTagToggle,
  onClearFilters,
  availableTags
}: NewsFiltersProps) => {
  const hasActiveFilters = selectedCategory !== 'all' || selectedTags.length > 0 || searchQuery.length > 0;

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">Filter News</h3>
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            Clear All
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search news articles..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Categories</label>
        <div className="space-y-2">
          {newsCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "ghost"}
              size="sm"
              onClick={() => onCategoryChange(category.id)}
              className="w-full justify-between"
            >
              <span>{category.label}</span>
              <Badge variant="secondary" className="ml-2">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* Tags */}
      {availableTags.length > 0 && (
        <div className="space-y-3">
          <label className="text-sm font-medium">Tags</label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/90 transition-colors"
                onClick={() => onTagToggle(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="space-y-3 pt-4 border-t">
          <label className="text-sm font-medium">Active Filters</label>
          <div className="space-y-2">
            {searchQuery && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Search:</span>
                <Badge variant="secondary">{searchQuery}</Badge>
              </div>
            )}
            {selectedCategory !== 'all' && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Category:</span>
                <Badge variant="secondary">
                  {newsCategories.find(c => c.id === selectedCategory)?.label}
                </Badge>
              </div>
            )}
            {selectedTags.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Tags:</span>
                <div className="flex flex-wrap gap-1">
                  {selectedTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};