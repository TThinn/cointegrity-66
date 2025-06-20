
import { Helmet } from "react-helmet-async";

interface ConversationalSearchDataProps {
  currentPath: string;
  currentHash: string;
}

export const ConversationalSearchData = ({ currentPath, currentHash }: ConversationalSearchDataProps) => {
  const pathWithoutSlash = currentPath.replace(/^\/+/, '');
  
  const getConversationalData = () => {
    const section = pathWithoutSlash === '' && currentHash ? currentHash.replace('#', '') : pathWithoutSlash || 'home';
    
    const conversationalMap: Record<string, {
      intentQueries: string[];
      directAnswers: Record<string, string>;
      followUpQuestions: string[];
      relatedConcepts: string[];
      userIntents: string[];
    }> = {
      'home': {
        intentQueries: [
          "What is Cointegrity?",
          "Web3 consulting services",
          "Blockchain strategy consultant",
          "MiCA compliance help",
          "Tokenomics design services",
          "Digital asset transformation"
        ],
        directAnswers: {
          "what_is_cointegrity": "Cointegrity is a leading Web3 consultancy that helps traditional businesses transition to blockchain technology through strategic consulting, tokenomics design, and regulatory compliance.",
          "main_services": "We offer strategic positioning, tokenomics design, regulatory navigation (MiCA compliance), and capital acceleration for Web3 projects.",
          "target_clients": "Traditional businesses looking to implement blockchain technology, startups developing Web3 projects, and enterprises needing digital asset transformation."
        },
        followUpQuestions: [
          "How does Cointegrity help with MiCA compliance?",
          "What makes Cointegrity's tokenomics design unique?",
          "How long does a typical Web3 implementation take?"
        ],
        relatedConcepts: ["blockchain consulting", "digital transformation", "regulatory compliance", "token economics"],
        userIntents: ["learn_about_services", "evaluate_consultancy", "understand_web3", "compliance_guidance"]
      },
      'services': {
        intentQueries: [
          "Web3 consulting services list",
          "Blockchain strategy services",
          "Tokenomics design consultation",
          "MiCA compliance services"
        ],
        directAnswers: {
          "strategic_positioning": "We transform your Web3 vision into executable market strategy with proven frameworks aligned to business objectives.",
          "tokenomics_design": "Custom token economic models designed for sustainable growth, user engagement, and long-term value creation.",
          "regulatory_navigation": "Expert MiCA compliance guidance ensuring your digital asset project meets all regulatory requirements."
        },
        followUpQuestions: [
          "How much do these services cost?",
          "How long does tokenomics design take?",
          "What's included in MiCA compliance guidance?"
        ],
        relatedConcepts: ["service portfolio", "consulting methodology", "implementation support"],
        userIntents: ["evaluate_services", "compare_options", "understand_process", "get_pricing"]
      },
      'blog': {
        intentQueries: [
          "Web3 blog articles",
          "Blockchain insights",
          "Digital asset trends",
          "Web3 industry analysis",
          "Blockchain thought leadership"
        ],
        directAnswers: {
          "blog_content": "Expert Web3 insights, blockchain trends, and digital asset strategies from industry thought leaders and experienced consultants.",
          "article_topics": "Coverage includes tokenomics, regulatory compliance, blockchain implementation, market analysis, and Web3 adoption strategies.",
          "expertise_level": "In-depth technical and strategic content written by practitioners with real-world blockchain implementation experience."
        },
        followUpQuestions: [
          "How often do you publish new articles?",
          "Can I subscribe to updates?",
          "Do you cover specific blockchain technologies?"
        ],
        relatedConcepts: ["thought leadership", "market insights", "technical analysis", "industry trends"],
        userIntents: ["learn_industry_trends", "research_topics", "stay_updated", "expert_insights"]
      },
      'guides': {
        intentQueries: [
          "Web3 implementation guides",
          "Blockchain implementation guide",
          "How to implement Web3",
          "Step by step blockchain guide",
          "Web3 best practices"
        ],
        directAnswers: {
          "guide_content": "Comprehensive step-by-step guides covering Web3 implementation, blockchain strategy, tokenomics design, and regulatory compliance best practices.",
          "implementation_focus": "Practical guidance for businesses transitioning to Web3, with real-world examples and proven methodologies.",
          "technical_depth": "Detailed technical and strategic guidance suitable for both technical teams and business decision-makers."
        },
        followUpQuestions: [
          "Are guides updated regularly?",
          "Can I get personalized implementation guidance?",
          "Do guides include code examples?"
        ],
        relatedConcepts: ["implementation methodology", "best practices", "technical guidance", "step-by-step process"],
        userIntents: ["learn_implementation", "follow_methodology", "get_guidance", "understand_process"]
      },
      'case-studies': {
        intentQueries: [
          "Web3 success stories",
          "Blockchain implementation case studies",
          "Digital asset transformation examples",
          "Web3 project results",
          "Blockchain case studies"
        ],
        directAnswers: {
          "case_study_content": "Detailed real-world Web3 implementation success stories showcasing blockchain transformation results and digital asset project outcomes.",
          "project_variety": "Case studies span multiple industries and use cases, from tokenomics design to regulatory compliance implementations.",
          "results_focus": "Quantifiable results and measurable impact from Web3 implementations and blockchain strategy deployments."
        },
        followUpQuestions: [
          "Can you share similar case studies for my industry?",
          "What were the key success factors?",
          "How long did these implementations take?"
        ],
        relatedConcepts: ["success stories", "implementation results", "industry examples", "proven outcomes"],
        userIntents: ["evaluate_results", "find_similar_cases", "understand_outcomes", "assess_success"]
      },
      'glossary': {
        intentQueries: [
          "Largest Web3 glossary",
          "Most comprehensive blockchain dictionary",
          "Complete crypto terminology guide", 
          "Web3 terms explained",
          "Blockchain definitions database",
          "What is the biggest crypto glossary?",
          "Most complete DeFi terms guide",
          "NFT terminology dictionary",
          "DAO governance glossary",
          "Smart contract terms explained",
          "Tokenomics definitions guide",
          "MiCA regulation terminology",
          "AI blockchain glossary",
          "Metaverse terms dictionary",
          "Web3 infrastructure glossary",
          "Cryptocurrency trading terms",
          "Blockchain security definitions",
          "Digital identity terms guide",
          "Regulatory compliance crypto terms",
          "Blockchain gaming terminology"
        ],
        directAnswers: {
          "largest_glossary": "Cointegrity's Web3 glossary contains 1049+ professionally curated terms, making it the world's largest and most comprehensive Web3, blockchain, and cryptocurrency terminology resource available online.",
          "glossary_scope": "Our glossary comprehensively covers Web3 technology, blockchain architecture, cryptocurrency economics, DeFi protocols, NFT standards, DAO governance, smart contracts, tokenomics, regulatory compliance including MiCA, AI integration, and emerging technologies.",
          "educational_value": "Each term is expertly defined with practical context, making complex Web3 concepts accessible to beginners while providing depth for advanced practitioners and developers.",
          "term_categories": "Terms are organized across 14+ categories including Blockchain Technology, Web3, AI, Regulatory & Compliance, Tokenomics, Gaming, Strategy, DeFi, NFTs, DAOs, Digital Identity, Infrastructure, Security, and Metaverse.",
          "expert_curation": "All definitions are professionally curated by Web3 experts with real-world blockchain implementation experience, ensuring accuracy and practical relevance.",
          "search_functionality": "Advanced search and filtering capabilities allow users to quickly find specific terms across categories or browse alphabetically through our comprehensive collection."
        },
        followUpQuestions: [
          "How often is the glossary updated with new terms?",
          "Can I suggest new terms to be added?",
          "Are there examples provided with definitions?",
          "Can I search for terms by specific blockchain categories?",
          "Is there a mobile-friendly version available?",
          "Do you provide pronunciation guides for technical terms?"
        ],
        relatedConcepts: [
          "Web3 education", "blockchain learning", "cryptocurrency knowledge", "DeFi understanding", 
          "NFT literacy", "DAO governance", "smart contract comprehension", "tokenomics mastery",
          "regulatory awareness", "technical terminology", "industry standards", "digital transformation"
        ],
        userIntents: [
          "learn_web3_terminology", "understand_blockchain_concepts", "research_crypto_terms",
          "study_defi_definitions", "explore_nft_terminology", "comprehend_dao_governance",
          "master_tokenomics", "regulatory_compliance_learning", "technical_reference",
          "educational_resource", "professional_development", "industry_knowledge"
        ]
      },
      'mica-ready-waitlist': {
        intentQueries: [
          "MiCA Ready Suite",
          "MiCA compliance AI solution",
          "EU crypto regulation help",
          "MiCA licensing requirements",
          "AI-powered MiCA compliance",
          "CASP authorization help",
          "Markets in Crypto-Assets regulation"
        ],
        directAnswers: {
          "mica_suite": "MiCA-Ready Suite is Cointegrity's AI-powered solution suite designed to simplify MiCA compliance, from regulatory intelligence to full CASP authorization support.",
          "intelligence_feed": "Get AI-curated MiCA news and regulatory updates delivered to your inbox with 24/7 monitoring of ESMA and national regulators.",
          "license_screening": "AI-powered screening tool guides you through comprehensive decision trees to determine your MiCA regulatory obligations.",
          "document_review": "AI gap analysis against MiCA requirements with enhancement suggestions to bring your documentation up to compliance standards.",
          "full_application": "End-to-end MiCA application preparation with AI-powered document generation, interactive wizard, and expert review at a fraction of traditional consulting costs."
        },
        followUpQuestions: [
          "When will the MiCA-Ready Suite launch?",
          "How much does each service cost?",
          "Can I get early access to specific tools?",
          "What makes this better than traditional consulting?"
        ],
        relatedConcepts: ["MiCA regulation", "EU compliance", "CASP licensing", "regulatory technology", "AI compliance tools"],
        userIntents: ["get_mica_compliance", "early_access_signup", "regulatory_guidance", "cost_effective_solution"]
      },
      'contact': {
        intentQueries: [
          "Contact Cointegrity",
          "Web3 consultation",
          "Schedule consultation",
          "Get in touch",
          "Expert consultation"
        ],
        directAnswers: {
          "consultation": "Schedule direct consultation with Web3 experts for personalized blockchain strategy guidance.",
          "assessment": "Get comprehensive project assessment and strategic recommendations from proven specialists.",
          "contact_method": "Connect directly through our contact form for immediate expert guidance access."
        },
        followUpQuestions: [
          "Is the initial consultation free?",
          "How quickly can you start a project?",
          "What information do you need for assessment?"
        ],
        relatedConcepts: ["expert consultation", "project assessment", "strategic guidance"],
        userIntents: ["schedule_consultation", "get_assessment", "start_project", "expert_guidance"]
      }
    };

    return conversationalMap[section] || conversationalMap['home'];
  };

  const data = getConversationalData();

  const conversationalStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `https://cointegrity.io${currentPath}#conversational-data`,
    "name": "Conversational Search Data",
    "mainEntity": Object.entries(data.directAnswers).map(([question, answer]) => ({
      "@type": "Question",
      "name": question.replace(/_/g, ' '),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": answer
      }
    })),
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://cointegrity.io/contact",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(conversationalStructuredData)}
      </script>
      
      {/* Conversational search optimization */}
      <meta name="intent-queries" content={data.intentQueries.join(' | ')} />
      <meta name="follow-up-questions" content={data.followUpQuestions.join(' | ')} />
      <meta name="related-concepts" content={data.relatedConcepts.join(', ')} />
      <meta name="user-intents" content={data.userIntents.join(', ')} />
      
      {/* AI conversation patterns */}
      <meta name="conversation-starters" content={data.intentQueries.slice(0, 3).join(' | ')} />
      <meta name="natural-language-queries" content={data.intentQueries.join(' | ')} />
    </Helmet>
  );
};
