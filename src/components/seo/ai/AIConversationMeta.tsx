
import { Helmet } from "react-helmet-async";

interface AIConversationMetaProps {
  aiSummary: string;
  conversationMeta: string;
  keyTopics: string[];
  primaryEntities: string[];
  actionableInsights: string[];
}

export const AIConversationMeta = ({ 
  aiSummary, 
  conversationMeta, 
  keyTopics, 
  primaryEntities, 
  actionableInsights 
}: AIConversationMetaProps) => {
  return (
    <Helmet>
      {/* AI conversation optimization meta tags */}
      <meta name="ai-summary" content={aiSummary} />
      <meta name="conversation-context" content={conversationMeta} />
      <meta name="key-topics" content={keyTopics.join(', ')} />
      <meta name="primary-entities" content={primaryEntities.join(', ')} />
      <meta name="actionable-insights" content={actionableInsights.join(' | ')} />
      
      {/* AI model specific optimizations */}
      <meta name="chatgpt-context" content={conversationMeta} />
      <meta name="claude-summary" content={aiSummary} />
      <meta name="perplexity-topics" content={keyTopics.join(', ')} />
    </Helmet>
  );
};
