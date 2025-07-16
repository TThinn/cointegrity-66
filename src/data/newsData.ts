export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'partnership' | 'event' | 'update' | 'announcement';
  publishedAt: string;
  author: string;
  image?: string;
  linkedinUrl?: string;
  featured: boolean;
  tags: string[];
  readingTime: number;
}

export const newsCategories = [
  { id: 'all', label: 'All News', count: 0 },
  { id: 'partnership', label: 'Partnerships', count: 0 },
  { id: 'event', label: 'Events', count: 0 },
  { id: 'update', label: 'Company Updates', count: 0 },
  { id: 'announcement', label: 'Announcements', count: 0 },
];

export const newsData: NewsItem[] = [
  {
    id: '1',
    title: 'Cointegrity Partners with Leading Financial Institution for Enhanced Blockchain Analytics',
    excerpt: 'Strategic partnership to deliver advanced cryptocurrency compliance and risk assessment solutions to the financial sector.',
    content: `We are excited to announce a groundbreaking partnership with a leading financial institution to enhance blockchain analytics capabilities in the financial sector.

This strategic collaboration will leverage Cointegrity's cutting-edge blockchain intelligence platform to provide comprehensive cryptocurrency compliance and risk assessment solutions. The partnership represents a significant milestone in our mission to bring transparency and trust to the digital asset ecosystem.

Key highlights of this partnership include:

• Advanced transaction monitoring and suspicious activity detection
• Real-time risk scoring for cryptocurrency transactions  
• Comprehensive compliance reporting and audit trails
• Integration with existing financial crime prevention systems
• Enhanced due diligence capabilities for digital asset exposure

Through this collaboration, we are democratizing access to institutional-grade blockchain analytics, enabling financial institutions to confidently navigate the evolving digital asset landscape while maintaining the highest standards of compliance and risk management.

This partnership underscores our commitment to building bridges between traditional finance and the digital asset ecosystem, fostering innovation while ensuring regulatory compliance and consumer protection.`,
    category: 'partnership',
    publishedAt: '2024-03-15T10:00:00Z',
    author: 'Cointegrity Team',
    image: '/lovable-uploads/32e8bd55-2f0b-4772-bab3-657297e9573f.png',
    linkedinUrl: 'https://www.linkedin.com/company/cointegrity/',
    featured: true,
    tags: ['blockchain', 'partnership', 'compliance', 'fintech'],
    readingTime: 3
  },
  {
    id: '2',
    title: 'Cointegrity Presents at Global Blockchain Security Summit 2024',
    excerpt: 'Our team showcased innovative approaches to cryptocurrency investigation and compliance at the premier blockchain security event.',
    content: `Cointegrity had the honor of presenting at the Global Blockchain Security Summit 2024, where our team shared insights on the latest developments in cryptocurrency investigation and compliance technologies.

The presentation, titled "Next-Generation Blockchain Intelligence: Bridging the Gap Between Innovation and Compliance," highlighted our comprehensive approach to digital asset risk assessment and regulatory compliance.

Key topics covered during the presentation:

• Evolution of blockchain analysis techniques and methodologies
• Real-world case studies in cryptocurrency investigation
• Emerging threats in the DeFi and NFT ecosystems
• Regulatory landscape and compliance best practices
• Future trends in blockchain intelligence and security

The summit brought together leading experts, regulators, and industry professionals from around the world to discuss the most pressing challenges and opportunities in blockchain security. Our participation reinforced Cointegrity's position as a thought leader in the blockchain intelligence space.

We were particularly pleased to engage with fellow industry professionals and share our vision for creating a more transparent and secure digital asset ecosystem. The valuable connections and insights gained from this event will continue to inform our product development and strategic initiatives.

Thank you to all the attendees and organizers who made this event a tremendous success. We look forward to continuing these important conversations and collaborations.`,
    category: 'event',
    publishedAt: '2024-03-01T14:30:00Z',
    author: 'Cointegrity Team',
    image: '/lovable-uploads/4154e717-451c-4f01-9cf6-8117a4fa0149.png',
    linkedinUrl: 'https://www.linkedin.com/company/cointegrity/',
    featured: false,
    tags: ['event', 'blockchain', 'security', 'summit'],
    readingTime: 4
  },
  {
    id: '3',
    title: 'Enhanced AI-Powered Risk Assessment Features Now Available',
    excerpt: 'Our latest platform update introduces advanced machine learning capabilities for more accurate cryptocurrency risk scoring.',
    content: `We are thrilled to announce the release of enhanced AI-powered risk assessment features on the Cointegrity platform, marking a significant advancement in cryptocurrency compliance technology.

This major update introduces sophisticated machine learning algorithms that provide more accurate and nuanced risk scoring for cryptocurrency transactions and addresses. Our enhanced AI capabilities represent months of research and development, incorporating feedback from our valued clients and the latest advances in blockchain analytics.

New Features Include:

• Advanced pattern recognition for identifying suspicious transaction behaviors
• Real-time entity clustering and relationship mapping
• Enhanced sanctions screening with reduced false positives
• Predictive risk modeling for proactive threat detection
• Customizable risk thresholds and alert configurations
• Improved visualization tools for investigation workflows

The new AI-powered features leverage our extensive dataset of cryptocurrency transactions and known risk indicators to provide unparalleled accuracy in risk assessment. This enables our clients to make more informed decisions while reducing compliance costs and operational overhead.

Our machine learning models are continuously updated to adapt to emerging threats and evolving tactics used by bad actors in the cryptocurrency space. This ensures that our clients always have access to the most current and effective risk assessment capabilities.

These enhancements are available immediately to all Cointegrity platform users. We encourage our clients to explore these new capabilities and provide feedback as we continue to innovate and improve our blockchain intelligence solutions.`,
    category: 'update',
    publishedAt: '2024-02-20T09:15:00Z',
    author: 'Cointegrity Team',
    image: '/lovable-uploads/1ec5bfd8-e2e8-46c4-8b86-b6fa09a3b6e2.png',
    linkedinUrl: 'https://www.linkedin.com/company/cointegrity/',
    featured: true,
    tags: ['AI', 'platform', 'update', 'risk-assessment'],
    readingTime: 3
  },
  {
    id: '4',
    title: 'Cointegrity Achieves SOC 2 Type II Compliance Certification',
    excerpt: 'This milestone demonstrates our unwavering commitment to data security and privacy protection for our clients.',
    content: `We are proud to announce that Cointegrity has successfully achieved SOC 2 Type II compliance certification, demonstrating our unwavering commitment to maintaining the highest standards of data security and privacy protection.

This certification represents a comprehensive evaluation of our security controls and processes over a minimum six-month period. The SOC 2 Type II audit examined our systems and controls related to security, availability, processing integrity, confidentiality, and privacy.

What This Means for Our Clients:

• Enhanced data protection through rigorously tested security controls
• Verified compliance with industry-leading security standards
• Increased confidence in our platform's reliability and trustworthiness
• Demonstration of our commitment to continuous security improvement
• Alignment with enterprise security requirements and expectations

The SOC 2 Type II certification process involved extensive documentation, testing, and validation of our security practices by an independent third-party auditor. This rigorous assessment confirms that our security controls are not only well-designed but also operating effectively over time.

Key areas evaluated during the certification process included:

• Network security and access controls
• Data encryption and protection mechanisms
• Incident response and disaster recovery procedures
• Employee security training and background checks
• Vendor management and third-party risk assessment
• Change management and system development lifecycle controls

This achievement reflects the hard work and dedication of our entire team in building and maintaining a secure, reliable platform. We understand that trust is paramount when dealing with sensitive financial and blockchain data, and this certification provides additional assurance to our clients and partners.

We remain committed to continuous improvement in our security posture and will maintain our SOC 2 compliance through regular assessments and updates to our security controls.`,
    category: 'announcement',
    publishedAt: '2024-02-10T11:00:00Z',
    author: 'Cointegrity Team',
    image: '/lovable-uploads/23b8985f-164c-4c02-a983-2dfa808c0689.png',
    linkedinUrl: 'https://www.linkedin.com/company/cointegrity/',
    featured: false,
    tags: ['compliance', 'security', 'certification', 'SOC2'],
    readingTime: 4
  },
  {
    id: '5',
    title: 'Expanding European Operations: New London Office Opening',
    excerpt: 'Strategic expansion to better serve our growing European client base with local expertise and support.',
    content: `We are excited to announce the opening of our new London office, marking a significant milestone in Cointegrity's European expansion strategy.

This strategic move enables us to better serve our rapidly growing European client base while providing local expertise and support in one of the world's leading financial centers. The London office will serve as our European headquarters, facilitating closer relationships with clients, partners, and regulatory bodies across the region.

Our London Team Will Focus On:

• Providing localized customer support and technical assistance
• Building relationships with European financial institutions and regulators
• Developing region-specific compliance solutions and frameworks
• Expanding our understanding of European regulatory requirements
• Supporting sales and business development activities across Europe

The European market represents a significant opportunity for blockchain intelligence and compliance solutions, particularly as regulatory frameworks like MiCA (Markets in Crypto-Assets) continue to evolve. Our physical presence in London positions us to be at the forefront of these developments and to provide timely, relevant solutions to our European clients.

We are actively recruiting talented professionals to join our London team, including blockchain analysts, compliance specialists, and customer success managers. This expansion reflects our confidence in the European market and our commitment to supporting the region's transition to compliant, transparent digital asset ecosystems.

The London office is fully operational and ready to serve our European clients. We look forward to strengthening our partnerships and building new relationships across Europe as we continue to grow our global presence.`,
    category: 'update',
    publishedAt: '2024-01-25T08:45:00Z',
    author: 'Cointegrity Team',
    image: '/lovable-uploads/2dd79377-6c9c-43cc-8fe1-5d1eb429c567.png',
    linkedinUrl: 'https://www.linkedin.com/company/cointegrity/',
    featured: false,
    tags: ['expansion', 'europe', 'london', 'office'],
    readingTime: 3
  }
];

// Update category counts
newsCategories.forEach(category => {
  if (category.id === 'all') {
    category.count = newsData.length;
  } else {
    category.count = newsData.filter(item => item.category === category.id).length;
  }
});