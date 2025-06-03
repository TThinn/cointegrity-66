
import { Helmet } from "react-helmet-async";

interface ConversationalSearchDataProps {
  currentPath: string;
  currentHash: string;
}

// Conversation-optimized search data for AI assistants
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
          "Digital asset transformation",
          "Web3 business strategy",
          "Blockchain implementation guidance"
        ],
        directAnswers: {
          "what_is_cointegrity": "Cointegrity is a leading Web3 consultancy that helps traditional businesses transition to blockchain technology through strategic consulting, tokenomics design, and regulatory compliance.",
          "main_services": "We offer strategic positioning, tokenomics design, regulatory navigation (MiCA compliance), and capital acceleration for Web3 projects.",
          "target_clients": "Traditional businesses looking to implement blockchain technology, startups developing Web3 projects, and enterprises needing digital asset transformation.",
          "unique_value": "We combine cutting-edge blockchain innovation with bulletproof regulatory compliance, ensuring successful Web3 implementations."
        },
        followUpQuestions: [
          "How does Cointegrity help with MiCA compliance?",
          "What makes Cointegrity's tokenomics design unique?",
          "How long does a typical Web3 implementation take?",
          "What industries does Cointegrity serve?"
        ],
        relatedConcepts: ["blockchain consulting", "digital transformation", "regulatory compliance", "token economics", "Web3 strategy"],
        userIntents: ["learn_about_services", "evaluate_consultancy", "understand_web3", "compliance_guidance", "strategic_planning"]
      },
      'services': {
        intentQueries: [
          "Web3 consulting services list",
          "Blockchain strategy services",
          "Tokenomics design consultation",
          "MiCA compliance services",
          "Capital acceleration Web3",
          "Digital asset strategy",
          "Blockchain implementation services"
        ],
        directAnswers: {
          "strategic_positioning": "We transform your Web3 vision into executable market strategy with proven frameworks aligned to business objectives.",
          "tokenomics_design": "Custom token economic models designed for sustainable growth, user engagement, and long-term value creation.",
          "regulatory_navigation": "Expert MiCA compliance guidance ensuring your digital asset project meets all regulatory requirements.",
          "capital_acceleration": "Strategic fundraising support and investment planning specifically for Web3 ventures."
        },
        followUpQuestions: [
          "How much do these services cost?",
          "How long does tokenomics design take?",
          "What's included in MiCA compliance guidance?",
          "Can you help with both strategy and implementation?"
        ],
        relatedConcepts: ["service portfolio", "consulting methodology", "implementation support", "regulatory guidance"],
        userIntents: ["evaluate_services", "compare_options", "understand_process", "get_pricing", "start_project"]
      },
      'about': {
        intentQueries: [
          "About Cointegrity company",
          "Cointegrity mission",
          "Web3 consultancy background",
          "Blockchain expertise",
          "Company philosophy",
          "Digital transformation approach"
        ],
        directAnswers: {
          "company_mission": "Our mission is to simplify Web3 complexity and help traditional businesses navigate blockchain technology successfully.",
          "approach": "We bridge traditional finance with blockchain innovation through proven methodologies and regulatory expertise.",
          "philosophy": "We believe in balancing cutting-edge innovation with bulletproof compliance for sustainable Web3 success."
        },
        followUpQuestions: [
          "What's Cointegrity's track record?",
          "How does Cointegrity simplify Web3 complexity?",
          "What industries has Cointegrity worked with?"
        ],
        relatedConcepts: ["company values", "business philosophy", "expertise areas", "implementation methodology"],
        userIntents: ["learn_company_background", "understand_approach", "evaluate_expertise", "assess_credibility"]
      },
      'team': {
        intentQueries: [
          "Cointegrity team",
          "Web3 experts",
          "Blockchain consultants",
          "Founding team",
          "Expert credentials",
          "Team experience"
        ],
        directAnswers: {
          "team_expertise": "Our team combines decades of experience in blockchain technology, digital asset transformation, and regulatory compliance.",
          "founder_background": "Industry veterans with proven track records in Web3 implementation and business transformation.",
          "specializations": "Technical blockchain implementation, strategic business guidance, and regulatory compliance expertise."
        },
        followUpQuestions: [
          "What's the team's educational background?",
          "How many projects has the team completed?",
          "Does the team have industry certifications?"
        ],
        relatedConcepts: ["expert credentials", "professional experience", "industry expertise", "track record"],
        userIntents: ["evaluate_expertise", "assess_credibility", "understand_background", "team_qualifications"]
      },
      'process': {
        intentQueries: [
          "Cointegrity process",
          "Web3 implementation methodology",
          "Blockchain project process",
          "How does Cointegrity work",
          "Implementation steps",
          "Project methodology"
        ],
        directAnswers: {
          "methodology": "Our proven 4-step process: Strategic Assessment, Architecture Design, Implementation Guidance, and Launch Support.",
          "timeline": "Systematic approach that minimizes risks while maximizing time-to-market efficiency.",
          "approach": "Structured methodology ensuring comprehensive Web3 adoption from concept to launch."
        },
        followUpQuestions: [
          "How long does each step take?",
          "What's included in strategic assessment?",
          "Do you provide ongoing support after launch?"
        ],
        relatedConcepts: ["project methodology", "implementation framework", "systematic approach", "risk management"],
        userIntents: ["understand_process", "evaluate_methodology", "project_planning", "timeline_estimation"]
      },
      'contact': {
        intentQueries: [
          "Contact Cointegrity",
          "Web3 consultation",
          "Schedule consultation",
          "Get in touch",
          "Expert consultation",
          "Project assessment"
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
        relatedConcepts: ["expert consultation", "project assessment", "strategic guidance", "professional services"],
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
    },
    "about": {
      "@type": "Thing",
      "name": "Web3 Consulting",
      "description": "Conversational queries and answers about Web3 consulting services"
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
