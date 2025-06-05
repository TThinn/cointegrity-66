
interface AIStructuredContentProps {
  currentPath: string;
  aiSummary: string;
  conversationMeta: string;
  keyTopics: string[];
  primaryEntities: string[];
  actionableInsights: string[];
  contextualAnswers: Record<string, string>;
}

export const AIStructuredContent = ({ 
  currentPath, 
  aiSummary, 
  conversationMeta, 
  keyTopics, 
  primaryEntities, 
  actionableInsights, 
  contextualAnswers 
}: AIStructuredContentProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://cointegrity.io${currentPath}`,
    "aiReadableContent": {
      "@type": "DigitalDocument",
      "summary": aiSummary,
      "conversationalContext": conversationMeta,
      "keyTopics": keyTopics,
      "primaryEntities": primaryEntities,
      "actionableInsights": actionableInsights,
      "contextualAnswers": contextualAnswers
    },
    "topicClustering": {
      "@type": "DefinedTermSet",
      "name": "Web3 and Blockchain Topics",
      "hasDefinedTerm": keyTopics.map(topic => ({
        "@type": "DefinedTerm",
        "name": topic,
        "inDefinedTermSet": "Web3 and Blockchain Topics"
      }))
    },
    "entityRelationships": {
      "@type": "ItemList",
      "name": "Related Entities",
      "itemListElement": primaryEntities.map((entity, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Thing",
          "name": entity,
          "relatedTo": "Cointegrity Web3 Services"
        }
      }))
    }
  };

  return structuredData;
};
