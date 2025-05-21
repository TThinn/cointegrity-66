
import React from "react";
import { useLocation } from "react-router-dom";
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbNavProps {
  className?: string;
  currentPageName?: string;
  titleCase?: boolean;
}

export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ 
  className,
  currentPageName,
  titleCase = true
}) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment);
  
  // Format text to title case if requested
  const formatText = (text: string): string => {
    if (!titleCase) return text;
    return text
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Get current page name (either provided or derived from path)
  const pageName = currentPageName || (pathSegments.length > 0 
    ? formatText(pathSegments[pathSegments.length - 1]) 
    : 'Home');

  return (
    <Breadcrumb className={cn("my-4", className)}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" aria-label="Home">
            <Home className="h-4 w-4" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        <BreadcrumbSeparator />
        
        {pathSegments.length > 0 && pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
          
          return (
            <React.Fragment key={segment}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{formatText(segment)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{formatText(segment)}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbNav;
