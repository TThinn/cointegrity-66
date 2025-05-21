
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./breadcrumb";
import { Home } from "lucide-react";

interface BreadcrumbNavProps {
  className?: string;
  includeHomeIcon?: boolean;
}

export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ 
  className = "",
  includeHomeIcon = true
}) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // Homepage should not show breadcrumbs
  if (location.pathname === "/") {
    return null;
  }
  
  const getBreadcrumbLabel = (segment: string): string => {
    const formattedSegment = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    
    // Handle special cases
    switch(segment) {
      case "team":
        return "Our Team";
      default:
        return formattedSegment;
    }
  };
  
  return (
    <Breadcrumb className={`${className}`}>
      <BreadcrumbList className="text-white/70">
        {includeHomeIcon && (
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" className="flex items-center">
                <Home size={16} className="mr-1" />
                <span>Home</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
        
        {!includeHomeIcon && (
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
        
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const label = getBreadcrumbLabel(segment);
          
          return (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={href}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbNav;
