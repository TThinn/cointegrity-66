
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface GlossarySearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const GlossarySearch: React.FC<GlossarySearchProps> = ({ 
  searchTerm, 
  setSearchTerm 
}) => {
  return (
    <div className="relative mb-6">
      <Input
        type="text"
        placeholder="Search terms..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10"
      />
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
    </div>
  );
};
