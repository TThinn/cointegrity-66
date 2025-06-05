
import { Helmet } from "react-helmet-async";

interface AITopicClusteringProps {
  keyTopics: string[];
}

export const AITopicClustering = ({ keyTopics }: AITopicClusteringProps) => {
  return (
    <Helmet>
      {/* Semantic topic clustering */}
      <meta name="topic-cluster" content="Web3 Consulting" />
      <meta name="content-category" content="Blockchain Services" />
      <meta name="expertise-domain" content="Digital Asset Transformation" />
    </Helmet>
  );
};
