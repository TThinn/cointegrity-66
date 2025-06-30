
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const LoadingState: React.FC = () => {
  return (
    <div className="space-y-8">
      {[1, 2, 3].map(i => (
        <div key={i}>
          <Skeleton className="h-10 w-24 mb-4 bg-white/10" />
          <div className="space-y-4">
            {[1, 2, 3].map(j => (
              <div key={j} className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                <Skeleton className="h-6 w-48 mb-4 bg-white/20" />
                <Skeleton className="h-20 w-full bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
