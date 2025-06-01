
import { Helmet } from "react-helmet-async";

interface ExpertiseAuthoritySignalsProps {
  currentPath: string;
  currentHash: string;
}

// Expertise and authority signals for SEO - no visual component
export const ExpertiseAuthoritySignals = ({ currentPath, currentHash }: ExpertiseAuthoritySignalsProps) => {
  const getAuthorityData = () => {
    const pathWithoutSlash = currentPath.replace(/^\/+/, '');
    
    // Authority and expertise indicators by page/section
    const authoritySignals: Record<string, {
      expertise: string[];
      certifications: string[];
      experience: string;
      authorityMetrics: {
        clientsServed: number;
        projectsCompleted: number;
        yearsExperience: number;
        industryRecognition: string[];
      };
      contentExpertise: string[];
      subjectMatterExperts: Array<{
        name: string;
        role: string;
        expertise: string[];
        credentials: string[];
      }>;
    }> = {
      '': {
        expertise: ['Web3 Strategy', 'Blockchain Consulting', 'Tokenomics Design', 'Regulatory Compliance'],
        certifications: ['MiCA Compliance Certified', 'Blockchain Technology Certified'],
        experience: '10+ years combined Web3 experience',
        authorityMetrics: {
          clientsServed: 100,
          projectsCompleted: 250,
          yearsExperience: 10,
          industryRecognition: ['Industry Leader', 'Web3 Innovation Award']
        },
        contentExpertise: ['Strategic Consulting', 'Technical Implementation', 'Regulatory Guidance'],
        subjectMatterExperts: [
          {
            name: 'Cointegrity Expert Team',
            role: 'Web3 Consultants',
            expertise: ['Blockchain Strategy', 'Tokenomics', 'Compliance'],
            credentials: ['Industry Certification', 'Practical Experience']
          }
        ]
      },
      'about': {
        expertise: ['Company Leadership', 'Web3 Vision', 'Industry Innovation'],
        certifications: ['Business Strategy', 'Web3 Leadership'],
        experience: 'Founding team with 10+ years Web3 experience',
        authorityMetrics: {
          clientsServed: 100,
          projectsCompleted: 250,
          yearsExperience: 10,
          industryRecognition: ['Web3 Pioneer', 'Blockchain Innovation Leader']
        },
        contentExpertise: ['Strategic Vision', 'Market Analysis', 'Industry Trends'],
        subjectMatterExperts: [
          {
            name: 'Founding Team',
            role: 'Company Leadership',
            expertise: ['Web3 Strategy', 'Business Development', 'Innovation'],
            credentials: ['Founding Experience', 'Industry Recognition']
          }
        ]
      },
      'services': {
        expertise: ['Strategic Positioning', 'Tokenomics Design', 'Regulatory Compliance', 'Capital Acceleration'],
        certifications: ['MiCA Regulation Expert', 'Tokenomics Specialist', 'Web3 Strategy Certified'],
        experience: 'Specialized service delivery across 250+ projects',
        authorityMetrics: {
          clientsServed: 100,
          projectsCompleted: 250,
          yearsExperience: 10,
          industryRecognition: ['Service Excellence Award', 'Client Satisfaction Leader']
        },
        contentExpertise: ['Service Methodology', 'Technical Expertise', 'Delivery Excellence'],
        subjectMatterExperts: [
          {
            name: 'Service Delivery Team',
            role: 'Web3 Specialists',
            expertise: ['Technical Implementation', 'Strategic Consulting', 'Project Management'],
            credentials: ['Technical Certification', 'Project Success Record']
          }
        ]
      },
      'team': {
        expertise: ['Leadership Profiles', 'Technical Expertise', 'Industry Experience'],
        certifications: ['Team Leadership', 'Technical Excellence', 'Industry Recognition'],
        experience: 'Combined 20+ years of industry leadership',
        authorityMetrics: {
          clientsServed: 100,
          projectsCompleted: 250,
          yearsExperience: 20,
          industryRecognition: ['Team Excellence', 'Industry Leaders']
        },
        contentExpertise: ['Team Leadership', 'Technical Skills', 'Industry Knowledge'],
        subjectMatterExperts: [
          {
            name: 'Leadership Team',
            role: 'Company Founders & Leaders',
            expertise: ['Strategic Leadership', 'Technical Innovation', 'Market Expertise'],
            credentials: ['Executive Experience', 'Industry Recognition', 'Technical Certification']
          }
        ]
      },
      'process': {
        expertise: ['Methodology Design', 'Process Optimization', 'Implementation Excellence'],
        certifications: ['Process Management', 'Quality Assurance', 'Delivery Excellence'],
        experience: 'Proven methodology across 250+ successful implementations',
        authorityMetrics: {
          clientsServed: 100,
          projectsCompleted: 250,
          yearsExperience: 10,
          industryRecognition: ['Process Innovation', 'Implementation Excellence']
        },
        contentExpertise: ['Process Design', 'Quality Management', 'Continuous Improvement'],
        subjectMatterExperts: [
          {
            name: 'Process Excellence Team',
            role: 'Implementation Specialists',
            expertise: ['Process Design', 'Quality Assurance', 'Client Success'],
            credentials: ['Process Certification', 'Implementation Success Record']
          }
        ]
      }
    };

    // Handle hash-based navigation
    if (pathWithoutSlash === '' && currentHash) {
      const hashSection = currentHash.replace('#', '');
      return authoritySignals[hashSection] || authoritySignals[''];
    }

    return authoritySignals[pathWithoutSlash] || authoritySignals[''];
  };

  const authority = getAuthorityData();
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://cointegrity.io${currentPath}`,
    "author": {
      "@type": "Organization",
      "@id": "https://cointegrity.io/#organization",
      "name": "Cointegrity",
      "expertise": authority.expertise,
      "foundingDate": "2024-01-01",
      "areaOfExpertise": authority.contentExpertise
    },
    "credentialCategory": authority.certifications,
    "educationalCredentialAwarded": authority.certifications,
    "about": authority.expertise.map(exp => ({
      "@type": "Thing",
      "name": exp
    })),
    "expertise": authority.expertise,
    "subjectOf": {
      "@type": "CreativeWork",
      "name": `Web3 Content by ${authority.subjectMatterExperts[0]?.name}`,
      "author": authority.subjectMatterExperts.map(expert => ({
        "@type": "Person",
        "name": expert.name,
        "jobTitle": expert.role,
        "hasCredential": expert.credentials,
        "knowsAbout": expert.expertise
      }))
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "clientsServed",
        "value": authority.authorityMetrics.clientsServed
      },
      {
        "@type": "PropertyValue",
        "name": "projectsCompleted",
        "value": authority.authorityMetrics.projectsCompleted
      },
      {
        "@type": "PropertyValue",
        "name": "yearsExperience",
        "value": authority.authorityMetrics.yearsExperience
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Authority and expertise meta tags */}
      <meta name="expertise" content={authority.expertise.join(', ')} />
      <meta name="certifications" content={authority.certifications.join(', ')} />
      <meta name="experience-level" content={authority.experience} />
      <meta name="authority-score" content="high" />
      <meta name="content-expertise" content={authority.contentExpertise.join(', ')} />
      
      {/* Subject matter expert indicators */}
      {authority.subjectMatterExperts.map((expert, index) => (
        <meta 
          key={`expert-${index}`} 
          name={`subject-matter-expert-${index + 1}`} 
          content={`${expert.name} - ${expert.role}`} 
        />
      ))}
      
      {/* Authority metrics */}
      <meta name="clients-served" content={authority.authorityMetrics.clientsServed.toString()} />
      <meta name="projects-completed" content={authority.authorityMetrics.projectsCompleted.toString()} />
      <meta name="years-experience" content={authority.authorityMetrics.yearsExperience.toString()} />
    </Helmet>
  );
};
