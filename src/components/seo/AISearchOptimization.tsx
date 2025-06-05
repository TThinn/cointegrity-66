
import { Helmet } from "react-helmet-async";
import { AIContentSummary } from "./ai/AIContentSummary";
import { AIConversationMeta } from "./ai/AIConversationMeta";
import { AITopicClustering } from "./ai/AITopicClustering";
import { AIStructuredContent } from "./ai/AIStructuredContent";
import { getExtendedContentMap } from "./ai/contentDataMaps";

interface AISearchOptimizationProps {
  currentPath: string;
  currentHash: string;
}

export const AISearchOptimization = ({ currentPath, currentHash }: AISearchOptimizationProps) => {
  const pathWithoutSlash = currentPath.replace(/^\/+/, '');
  
  const getAIOptimizedContent = () => {
    // Get basic content from AIContentSummary
    const basicContent = AIContentSummary({ currentPath, currentHash });
    
    // Get extended content map for additional sections
    const extendedContentMap = getExtendedContentMap();
    
    // Handle hash-based navigation on homepage
    if (pathWithoutSlash === '' && currentHash) {
      const hashSection = currentHash.replace('#', '');
      return extendedContentMap[hashSection] || basicContent;
    }
    
    // Handle path-based pages
    const section = pathWithoutSlash || 'home';
    return extendedContentMap[section] || basicContent;
  };

  const content = getAIOptimizedContent();
  const structuredData = AIStructuredContent({ 
    currentPath, 
    ...content 
  });

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <AIConversationMeta 
        aiSummary={content.aiSummary}
        conversationMeta={content.conversationMeta}
        keyTopics={content.keyTopics}
        primaryEntities={content.primaryEntities}
        actionableInsights={content.actionableInsights}
      />
      
      <AITopicClustering keyTopics={content.keyTopics} />
    </>
  );
};
