
export interface FounderSocial {
  linkedin?: string;
  twitter?: string;
}

export interface Founder {
  name: string;
  role: string;
  bio: string;
  fullBio: string;
  image: string;
  social: FounderSocial;
}

export const founders: Founder[] = [
  {
    name: "Torstein W. Thinn",
    role: "Co-Founder & Chairman",
    bio: "Financial innovator who established the world's first cryptocurrency regulatory task force in 2019. Pioneered AI-driven trading strategies in 2004 when most considered it theoretical...",
    fullBio: "Financial innovator who established the world's first cryptocurrency regulatory task force in 2019. Pioneered AI-driven trading strategies in 2004 when most considered it theoretical. As CFO (\"Master of Coin\") at NBX, grew trading volume from 90M to 1.1B NOK and made NBX Europe's first listed crypto exchange. As CEO at AKJ Group, oversaw trading infrastructure supporting $1.6B in traditional and crypto assets while implementing automation that reduced operational overhead by 50%. MSc Finance (NHH). Consistently ahead of industry curves—from quantitative modeling to regulatory frameworks.",
    image: "/lovable-uploads/2dd79377-6c9c-43cc-8fe1-5d1eb429c567.png",
    social: {
      linkedin: "https://www.linkedin.com/in/torstein-thinn-a745552/"
    }
  },
  {
    name: "Ruben Junger",
    role: "Co-Founder & Web3 Strategist",
    bio: "Web3 strategist specializing in blockchain innovation, product market fit and market growth. He built and led PG Group's Launchpad as CCO overseeing multiple successful NFT collection launches...",
    fullBio: "Web3 strategist specializing in blockchain innovation, product market fit and market growth. He built and led PG Group's Launchpad as CCO overseeing multiple successful NFT collection launches. As Global Head of Web3 at MetaGravity, he shaped enterprise level Web3 strategies together with the C-suite and board members. He has a track record of advising bleeding edge projects from a vertical agnostic approach, whereas the recent focus has been on the convergence of blockchain and Ai with projects like iAgent, Playmind and FlowTrade. \n\nWith expertise in Web3 products, tokenomics, go-to-market strategies, and capital sourcing, Ruben is recognized as a connector and facilitator in the crypto sphere, leveraging his global network of Web3 professionals, investors, and institutions to bridge traditional markets with blockchain innovation.",
    image: "/lovable-uploads/1d01d80c-fe6c-4579-9640-773c15a22a79.png",
    social: {
      twitter: "https://x.com/RubenJunger",
      linkedin: "https://www.linkedin.com/in/ruben-junger-480a6a14a/"
    }
  },
  {
    name: "Magnus Jones",
    role: "Co-Founder & Regulatory Strategist",
    bio: "Magnus Jones is an international thought leader with 10+ years of blockchain and emerging tech experience, including 9 years as Nordic Blockchain & Innovation Lead at EY...",
    fullBio: "Magnus Jones is an international thought leader with 10+ years of blockchain and emerging tech experience, including 9 years as Nordic Blockchain & Innovation Lead at EY. His expertise spans Web3 taxation, legal frameworks, forensic investigations, smart contract reviews, tokenomics, and government strategies.\n\nMagnus created the world's first DeFi/NFT tax guidance with Norwegian authorities and built the first government metaverse tax office. He serves on boards including Nordic Blockchain Association and European Web3 Organization, while acting as Norwegian Ambassador for GBBC, member of INTERPOL's Metaverse Expert Group and UN Counter-Terrorism Crypto Group.\n\nHe lectures at universities and works with entities ranging from startups and DeFi projects to banks and governments.",
    image: "/lovable-uploads/a2b1c3d2-c3ca-4547-8cae-e6eca459eeaa.png",
    social: {
      linkedin: "https://www.linkedin.com/in/magnus-jones/",
      twitter: "https://x.com/themagnusjones"
    }
  },
  {
    name: "Feliks Olko",
    role: "Co-Founder & Technical Strategist",
    bio: "Metaverse infrastructure pioneer who helped scale one of Web3's most ambitious distributed computing platforms for virtual worlds...",
    fullBio: "Metaverse infrastructure pioneer who helped scale one of Web3's most ambitious distributed computing platforms for virtual worlds. As VP of Commercial Development at MetaGravity, revolutionized how developers build large-scale simulations, securing partnerships with AAA game studios and web3 projects. Previously founded BlockVerse Consulting, bringing enterprise-level solutions to blockchain startups. Built strategic partnerships at Hadean (2018-2021) after beginning career in finance at J.P. Morgan. Combines deep technical knowledge with financial acumen, holding a Harvard University Computer Science certification and MSc in Banking from Bayes Business School. Known for translating complex Web3 technologies into practical business applications.",
    image: "/lovable-uploads/e6a83d86-6685-4904-9bb1-f6d5c0a536dc.png",
    social: {
      linkedin: "https://www.linkedin.com/in/feliksolko/"
    }
  },
  {
    name: "Michal A. Gromek",
    role: "Co-Founder & Strategic Advisor on Financial Crime Compliance & Prevention",
    bio: "leads a team of 120+ experts in Virtual Asset Financial Crime Prevention, including specialists from the World Economic Forum, United Nations, OSCE, Interpol, leading banks, and Web3 companies...",
    fullBio: "leads a team of 120+ experts in Virtual Asset Financial Crime Prevention, including specialists from the World Economic Forum, United Nations, OSCE, Interpol, leading banks, and Web3 companies. He supports national governments, law enforcement agencies, and financial institutions by resolving ad hoc de-risking challenges and highlighting the financial and economic benefits of blockchain-based finance.\n\nHe brings a unique portfolio—from serving as Compliance Officer for a Nasdaq-listed company and Program Director at the Stockholm School of Economics Executive Education, to acting as Compliance Director for the G7 Research Group on Cybersecurity and as a leading virtual asset expert for the world's largest regional security organization.\n\nMichal is your best ally when expanding into markets with emerging or no regulation. He ensures your services remain compliant—and out of reach of illicit actors.",
    image: "/lovable-uploads/2ecc698d-a259-4cd8-868e-8335f3d30fbb.png",
    social: {
      linkedin: "https://www.linkedin.com/in/mgromek/"
    }
  },
  {
    name: "Felix Nordén",
    role: "Co-Founder & Tech Lead",
    bio: "A former applied scientist at Twitch/Amazon, specializing in NLP within AI/ML, now a prolific Web3 developer and entrepreneur...",
    fullBio: "A former applied scientist at Twitch/Amazon, specializing in NLP within AI/ML, now a prolific Web3 developer and entrepreneur. He has deployed over 150 smart contracts and leads three ventures: Mure, which enables programmable on-chain payments; Yurei, a collective investing platform; and Ignio, supporting businesses in AI and Web3. Additionally, he heads the Dev Division at Neo Tokyo and advises multiple projects on strategy, technology, tokenomics, and mathematical modeling.",
    image: "/lovable-uploads/edcbdde0-6678-47ad-87f8-74559a4361c4.png",
    social: {
      linkedin: "https://www.linkedin.com/in/felixnorden/",
      twitter: "https://x.com/felixtrnorden"
    }
  }
];
