
import { Helmet } from "react-helmet-async";

interface EntityRelationshipDataProps {
  currentPath: string;
  currentHash: string;
}

// Enhanced entity relationship structured data for AI understanding
export const EntityRelationshipData = ({ currentPath, currentHash }: EntityRelationshipDataProps) => {
  const pathWithoutSlash = currentPath.replace(/^\/+/, '');
  
  const getEntityRelationships = () => {
    const section = pathWithoutSlash === '' && currentHash ? currentHash.replace('#', '') : pathWithoutSlash || 'home';
    
    const entityMap: Record<string, {
      primaryEntity: string;
      relatedEntities: Array<{
        entity: string;
        relationship: string;
        strength: 'strong' | 'medium' | 'weak';
        context: string;
      }>;
      conceptHierarchy: Array<{
        parent: string;
        children: string[];
      }>;
      semanticClusters: Array<{
        cluster: string;
        members: string[];
        weight: number;
      }>;
    }> = {
      'home': {
        primaryEntity: "Cointegrity",
        relatedEntities: [
          {
            entity: "Web3 Consulting",
            relationship: "specializes_in",
            strength: "strong",
            context: "Primary business focus on Web3 and blockchain consulting services"
          },
          {
            entity: "MiCA Regulation",
            relationship: "provides_compliance_for",
            strength: "strong",
            context: "Expert guidance on Markets in Crypto-Assets regulatory framework"
          },
          {
            entity: "Tokenomics Design",
            relationship: "offers_service",
            strength: "strong",
            context: "Custom token economic model development and optimization"
          },
          {
            entity: "Norway",
            relationship: "based_in",
            strength: "medium",
            context: "Company headquarters and operational base"
          },
          {
            entity: "Digital Asset Transformation",
            relationship: "facilitates",
            strength: "strong",
            context: "Helps traditional businesses transition to blockchain technology"
          }
        ],
        conceptHierarchy: [
          {
            parent: "Web3 Services",
            children: ["Strategic Positioning", "Tokenomics Design", "Regulatory Navigation", "Capital Acceleration"]
          },
          {
            parent: "Regulatory Compliance",
            children: ["MiCA Framework", "Digital Asset Regulations", "Compliance Strategy"]
          },
          {
            parent: "Business Transformation",
            children: ["Traditional to Web3", "Digital Asset Integration", "Blockchain Implementation"]
          }
        ],
        semanticClusters: [
          {
            cluster: "Blockchain Technology",
            members: ["Web3", "Digital Assets", "Tokenomics", "Smart Contracts"],
            weight: 0.9
          },
          {
            cluster: "Regulatory Compliance",
            members: ["MiCA", "Compliance Strategy", "Legal Framework", "Regulatory Navigation"],
            weight: 0.8
          },
          {
            cluster: "Business Consulting",
            members: ["Strategic Positioning", "Business Transformation", "Implementation Guidance"],
            weight: 0.7
          }
        ]
      },
      'services': {
        primaryEntity: "Web3 Consulting Services",
        relatedEntities: [
          {
            entity: "Strategic Positioning",
            relationship: "core_service",
            strength: "strong",
            context: "Transforming Web3 vision into market reality with tailored frameworks"
          },
          {
            entity: "Token Architecture",
            relationship: "core_service",
            strength: "strong",
            context: "Optimized tokenomics models that drive real business value"
          },
          {
            entity: "Regulatory Navigation",
            relationship: "core_service",
            strength: "strong",
            context: "Complex digital asset compliance landscape guidance"
          },
          {
            entity: "Capital Acceleration",
            relationship: "core_service",
            strength: "strong",
            context: "Transforming Web3 projects into well-funded ventures"
          }
        ],
        conceptHierarchy: [
          {
            parent: "Service Portfolio",
            children: ["Strategic Services", "Technical Services", "Compliance Services", "Financial Services"]
          }
        ],
        semanticClusters: [
          {
            cluster: "Strategic Services",
            members: ["Strategic Positioning", "Market Analysis", "Business Strategy"],
            weight: 0.8
          },
          {
            cluster: "Technical Implementation",
            members: ["Tokenomics Design", "Architecture Planning", "Technical Guidance"],
            weight: 0.9
          }
        ]
      }
    };

    return entityMap[section] || entityMap['home'];
  };

  const relationships = getEntityRelationships();

  const entityStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `https://cointegrity.io${currentPath}#entity-relationships`,
    "name": relationships.primaryEntity,
    "relatedLink": relationships.relatedEntities.map(rel => ({
      "@type": "Thing",
      "name": rel.entity,
      "description": rel.context,
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "relationship",
          "value": rel.relationship
        },
        {
          "@type": "PropertyValue", 
          "name": "strength",
          "value": rel.strength
        }
      ]
    })),
    "knowsAbout": relationships.semanticClusters.flatMap(cluster => cluster.members),
    "expertise": relationships.conceptHierarchy.flatMap(hierarchy => hierarchy.children),
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "semanticClusters",
        "value": JSON.stringify(relationships.semanticClusters)
      },
      {
        "@type": "PropertyValue",
        "name": "conceptHierarchy", 
        "value": JSON.stringify(relationships.conceptHierarchy)
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(entityStructuredData)}
      </script>
      
      {/* Entity relationship meta tags */}
      <meta name="primary-entity" content={relationships.primaryEntity} />
      <meta name="related-entities" content={relationships.relatedEntities.map(r => r.entity).join(', ')} />
      <meta name="entity-relationships" content={relationships.relatedEntities.map(r => `${r.entity}:${r.relationship}`).join(' | ')} />
      <meta name="semantic-clusters" content={relationships.semanticClusters.map(c => c.cluster).join(', ')} />
      <meta name="concept-hierarchy" content={relationships.conceptHierarchy.map(h => h.parent).join(', ')} />
      
      {/* AI model entity understanding */}
      <meta name="knowledge-graph" content={JSON.stringify(relationships.semanticClusters)} />
      <meta name="entity-context" content={relationships.relatedEntities.map(r => r.context).join(' | ')} />
    </Helmet>
  );
};
