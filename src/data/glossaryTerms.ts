
export type GlossaryTerm = {
  term: string;
  definition: string;
  categories: ("blockchain" | "web3" | "ai" | "regulatory" | "tokenomics" | "gaming" | "strategy")[];
  related?: string[];
  trending?: number; // 1-10 scale, 10 being most trending
};

// Comprehensive glossary terms based on trending topics and key concepts
export const glossaryTerms: GlossaryTerm[] = [
  // Blockchain Fundamentals
  {
    term: "Blockchain",
    definition: "A distributed ledger technology that maintains a continuously growing list of records (blocks) that are linked and secured using cryptography. Each block contains a timestamp and transaction data, and by design is inherently resistant to modification.",
    categories: ["blockchain", "web3"],
    related: ["Distributed Ledger Technology", "Consensus Mechanisms", "Smart Contracts"],
    trending: 9
  },
  {
    term: "Bitcoin",
    definition: "The first and most valuable cryptocurrency, created by an anonymous person or group known as Satoshi Nakamoto in 2009. Bitcoin introduced blockchain technology and operates on a peer-to-peer network without central authorities.",
    categories: ["blockchain", "web3"],
    related: ["Cryptocurrency", "Proof of Work", "Mining"],
    trending: 10
  },
  {
    term: "Ethereum",
    definition: "An open-source blockchain platform that enables developers to build and deploy decentralized applications (dApps) and smart contracts. Ethereum introduced the concept of programmable money and smart contracts to the blockchain ecosystem.",
    categories: ["blockchain", "web3"],
    related: ["Smart Contracts", "dApps", "Gas Fees", "Ether (ETH)"],
    trending: 10
  },
  {
    term: "Solana",
    definition: "A high-performance blockchain designed for decentralized applications and marketplaces. Solana can process thousands of transactions per second with minimal fees, using a unique proof of history consensus mechanism.",
    categories: ["blockchain", "web3"],
    related: ["Proof of History", "Scalability", "Layer 1 Solutions"],
    trending: 9
  },
  {
    term: "Binance Coin (BNB)",
    definition: "The native cryptocurrency of the Binance exchange and Binance Smart Chain ecosystem. Originally created as a utility token for discounted trading fees, BNB has evolved to power the Binance ecosystem including DeFi applications.",
    categories: ["blockchain", "web3"],
    related: ["Binance Smart Chain", "Exchange Tokens", "DeFi"],
    trending: 8
  },
  {
    term: "Cardano (ADA)",
    definition: "A proof-of-stake blockchain platform that aims to enable advanced smart contracts and decentralized applications with a focus on academic research, scalability, and sustainability.",
    categories: ["blockchain", "web3"],
    related: ["Proof of Stake", "Ouroboros", "eUTXO"],
    trending: 7
  },
  {
    term: "XRP",
    definition: "The native digital asset of the XRP Ledger, primarily used within Ripple's payment protocol for fast, low-cost international money transfers. XRP acts as a bridge currency in cross-border payments.",
    categories: ["blockchain", "web3"],
    related: ["Ripple", "Cross-Border Payments", "CBDC"],
    trending: 7
  },
  {
    term: "Polkadot (DOT)",
    definition: "A multi-chain network that enables different blockchains to transfer messages and value in a trust-free fashion, sharing their security while maintaining their unique governance models.",
    categories: ["blockchain", "web3"],
    related: ["Parachains", "Interoperability", "Substrate"],
    trending: 7
  },
  {
    term: "Dogecoin (DOGE)",
    definition: "Originally created as a joke cryptocurrency in 2013, Dogecoin has gained significant popularity and market value. It uses a Scrypt algorithm and has an unlimited supply, distinguishing it from Bitcoin.",
    categories: ["blockchain", "web3"],
    related: ["Meme Coins", "Scrypt", "Proof of Work"],
    trending: 8
  },
  {
    term: "Avalanche (AVAX)",
    definition: "A platform for launching decentralized applications and enterprise blockchain deployments in one interoperable, highly scalable ecosystem. Avalanche is the first smart contracts platform that confirms transactions in under one second.",
    categories: ["blockchain", "web3"],
    related: ["Subnets", "Scalability", "Consensus"],
    trending: 8
  },
  {
    term: "MATIC (Polygon)",
    definition: "The native token of the Polygon network, a protocol and framework for building and connecting Ethereum-compatible blockchain networks, offering scalability solutions for Ethereum.",
    categories: ["blockchain", "web3"],
    related: ["Layer 2 Scaling", "Ethereum", "Zero-Knowledge Proofs"],
    trending: 8
  },
  {
    term: "Tether (USDT)",
    definition: "A stablecoin pegged to the US dollar, designed to maintain a 1:1 value ratio. USDT is used to provide stability in cryptocurrency trading and as a medium of exchange on various blockchains.",
    categories: ["blockchain", "web3", "tokenomics"],
    related: ["Stablecoin", "USD Coin", "Fiat-Backed Tokens"],
    trending: 9
  },
  
  // Smart Contracts & DApps
  {
    term: "Smart Contract",
    definition: "Self-executing contracts with the terms directly written into code. They automatically execute when predetermined conditions are met, enabling trustless transactions and agreements without intermediaries.",
    categories: ["blockchain", "web3"],
    related: ["Ethereum", "Decentralized Applications", "Automated Market Makers"],
    trending: 9
  },
  {
    term: "Decentralized Application (dApp)",
    definition: "Applications that run on a distributed computing system such as a blockchain. Unlike traditional apps, dApps operate without central control, using smart contracts for backend logic and blockchain for data storage.",
    categories: ["blockchain", "web3"],
    related: ["Smart Contracts", "Web3", "DeFi"],
    trending: 9
  },
  {
    term: "DeFi (Decentralized Finance)",
    definition: "A blockchain-based form of finance that doesn't rely on central financial intermediaries such as banks or brokerages. DeFi uses smart contracts on blockchains to provide traditional financial services like lending, borrowing, and trading.",
    categories: ["blockchain", "web3", "tokenomics"],
    related: ["Yield Farming", "Liquidity Pools", "Smart Contracts"],
    trending: 10
  },
  
  // Consensus & Network
  {
    term: "Consensus Mechanisms",
    definition: "Methods by which a blockchain network reaches agreement on the state of the ledger. Common types include Proof of Work, Proof of Stake, and Delegated Proof of Stake.",
    categories: ["blockchain", "web3"],
    related: ["Proof of Work", "Proof of Stake", "Byzantine Fault Tolerance"],
    trending: 7
  },
  {
    term: "Proof of Work (PoW)",
    definition: "A consensus mechanism that requires computational effort from network participants (miners) to validate transactions and create new blocks. This process, known as mining, involves solving complex mathematical puzzles.",
    categories: ["blockchain", "web3"],
    related: ["Mining", "Bitcoin", "Energy Consumption"],
    trending: 7
  },
  {
    term: "Proof of Stake (PoS)",
    definition: "A consensus mechanism where validators are chosen to create new blocks based on the number of coins they hold and are willing to 'stake' as collateral. PoS is more energy-efficient than Proof of Work.",
    categories: ["blockchain", "web3"],
    related: ["Staking", "Ethereum 2.0", "Validator"],
    trending: 8
  },
  {
    term: "Layer 1",
    definition: "The base layer blockchain protocol that defines the network's core functionality. Bitcoin and Ethereum are examples of Layer 1 blockchains.",
    categories: ["blockchain", "web3"],
    related: ["Layer 2", "Scaling Solutions", "Blockchain"],
    trending: 8
  },
  {
    term: "Layer 2",
    definition: "Secondary protocols built on top of existing blockchains (Layer 1) to improve scalability and efficiency. They process transactions off the main chain while leveraging the security of the underlying blockchain.",
    categories: ["blockchain", "web3"],
    related: ["Scaling Solutions", "Sidechains", "Payment Channels", "Rollups"],
    trending: 9
  },
  
  // Tokenomics
  {
    term: "Tokenomics",
    definition: "The economic study of cryptocurrencies and tokens, analyzing factors like supply mechanisms, utility, distribution models, and incentive structures that influence a token's value in an ecosystem.",
    categories: ["tokenomics", "web3", "blockchain"],
    related: ["Token Design", "Utility Token", "Governance Token", "Token Distribution"],
    trending: 9
  },
  {
    term: "Token Distribution",
    definition: "The allocation strategy for a token's total supply among different stakeholders such as team members, investors, community, treasury, and ecosystem development. A well-designed distribution promotes decentralization and aligns incentives.",
    categories: ["tokenomics", "web3"],
    related: ["Vesting", "Token Sale", "Fair Launch"],
    trending: 8
  },
  {
    term: "Utility Token",
    definition: "A digital token designed to provide access to specific products or services within a blockchain ecosystem. Unlike security tokens, utility tokens are not intended as investments but rather as functional components of a platform.",
    categories: ["tokenomics", "web3", "blockchain"],
    related: ["Security Token", "Governance Token", "Non-Fungible Token"],
    trending: 7
  },
  {
    term: "Governance Token",
    definition: "A cryptocurrency that represents voting power in a blockchain protocol or decentralized application. Holders can vote on proposals affecting the project's future development, treasury allocation, and protocol parameters.",
    categories: ["tokenomics", "web3", "blockchain"],
    related: ["DAO", "On-chain Governance", "Voting Power"],
    trending: 8
  },
  {
    term: "Stablecoin",
    definition: "A type of cryptocurrency designed to maintain a stable value by pegging to an external reference like the US dollar. Stablecoins provide price stability in the volatile crypto market and serve as a medium of exchange.",
    categories: ["tokenomics", "web3", "blockchain"],
    related: ["USDT", "USDC", "Algorithmic Stablecoin", "Collateralization"],
    trending: 9
  },
  
  // NFT & Gaming
  {
    term: "Non-Fungible Token (NFT)",
    definition: "A unique digital asset that represents ownership of a specific item or piece of content using blockchain technology. Unlike cryptocurrencies, each NFT has unique properties and cannot be exchanged on a like-for-like basis.",
    categories: ["web3", "blockchain", "gaming"],
    related: ["Digital Collectibles", "Tokenization", "Metadata"],
    trending: 9
  },
  {
    term: "Play-to-Earn (P2E)",
    definition: "A gaming model where players can earn cryptocurrency or NFTs with real-world value by playing games. These digital assets can be traded on marketplaces, creating economic opportunities through gameplay.",
    categories: ["gaming", "web3", "tokenomics"],
    related: ["GameFi", "NFT Gaming", "Axie Infinity"],
    trending: 8
  },
  {
    term: "Tokenization in Gaming",
    definition: "The process of converting in-game assets like characters, items, and land into blockchain tokens (typically NFTs), enabling true ownership, transferability, and interoperability across different games and platforms.",
    categories: ["gaming", "web3", "tokenomics"],
    related: ["Gaming NFTs", "Metaverse", "Digital Ownership"],
    trending: 8
  },
  {
    term: "GameFi",
    definition: "The integration of gaming with decentralized finance mechanisms, allowing players to generate income through blockchain-based game activities like collecting, breeding, crafting, battling, and trading in-game assets.",
    categories: ["gaming", "web3", "tokenomics"],
    related: ["Play-to-Earn", "Metaverse", "NFT Gaming"],
    trending: 8
  },
  {
    term: "Gaming DAOs",
    definition: "Decentralized Autonomous Organizations focused on gaming, where players collectively own and govern gaming platforms, make decisions about game development, and share in revenues generated by the gaming ecosystem.",
    categories: ["gaming", "web3", "tokenomics"],
    related: ["Community Governance", "Guild", "Play-to-Earn"],
    trending: 7
  },
  
  // Web3
  {
    term: "Web3",
    definition: "The next evolution of the internet built on decentralized protocols like blockchain, emphasizing user ownership of data and digital assets, permissionless access, and native payments. Web3 aims to reduce reliance on centralized platforms.",
    categories: ["web3", "blockchain"],
    related: ["Decentralized Web", "Blockchain", "DApps"],
    trending: 10
  },
  {
    term: "The Difference Between Web2 and Web3",
    definition: "Web2 is characterized by centralized platforms where users generate content but companies own the data and infrastructure. Web3 shifts to a decentralized model where users maintain ownership of their data and digital assets through blockchain technology, enabling peer-to-peer interactions without intermediaries.",
    categories: ["web3", "strategy"],
    related: ["Web3", "Decentralization", "Digital Ownership"],
    trending: 9
  },
  {
    term: "Decentralized Autonomous Organization (DAO)",
    definition: "A blockchain-based organization collectively owned and managed by its members with no central authority. DAOs use smart contracts for governance, with rules and transactions recorded transparently on the blockchain.",
    categories: ["web3", "blockchain", "strategy"],
    related: ["Governance Token", "Smart Contracts", "Decentralized Governance"],
    trending: 9
  },
  {
    term: "Metaverse",
    definition: "A collective virtual shared space created by the convergence of virtually enhanced physical and digital reality. In Web3, metaverse platforms often incorporate blockchain technology, enabling digital ownership, economies, and interoperability.",
    categories: ["web3", "gaming"],
    related: ["Virtual Reality", "Digital Land", "NFTs", "Digital Identity"],
    trending: 9
  },
  {
    term: "Wallet",
    definition: "A digital tool that allows users to store, manage, and interact with cryptocurrencies and blockchain-based assets. Wallets manage private keys that prove ownership of digital assets and enable transactions on the blockchain.",
    categories: ["web3", "blockchain"],
    related: ["Private Key", "Public Address", "Self-Custody", "Seed Phrase"],
    trending: 9
  },
  
  // Regulatory & Compliance
  {
    term: "MiCA (Markets in Crypto-Assets)",
    definition: "A European Union regulatory framework designed to provide legal certainty for crypto-assets not covered by existing financial services legislation. MiCA establishes rules for issuers of crypto-assets and service providers, aiming to protect consumers and market integrity.",
    categories: ["regulatory", "blockchain", "web3"],
    related: ["Crypto Regulation", "Stablecoin Regulation", "EU Crypto Framework"],
    trending: 10
  },
  {
    term: "FATF (Financial Action Task Force)",
    definition: "An intergovernmental organization that develops policies to combat money laundering and terrorist financing. FATF has issued guidelines for virtual assets and virtual asset service providers, including the 'Travel Rule' for crypto transactions.",
    categories: ["regulatory", "blockchain"],
    related: ["AML", "KYC", "Travel Rule", "Compliance"],
    trending: 8
  },
  {
    term: "Travel Rule",
    definition: "A regulatory requirement mandating that financial institutions share information about the sender and recipient in transactions exceeding certain thresholds. In cryptocurrency, the FATF extended this rule to Virtual Asset Service Providers for transactions over USD/EUR 1,000.",
    categories: ["regulatory", "blockchain"],
    related: ["FATF", "KYC", "AML", "Compliance"],
    trending: 7
  },
  {
    term: "KYC (Know Your Customer)",
    definition: "Verification processes used by businesses to identify their clients and assess potential risks. In the blockchain space, KYC procedures are implemented by exchanges and other service providers to prevent financial crimes and comply with regulations.",
    categories: ["regulatory", "blockchain"],
    related: ["AML", "Identity Verification", "Compliance"],
    trending: 8
  },
  {
    term: "AML (Anti-Money Laundering)",
    definition: "Legal frameworks designed to prevent the conversion of illegally obtained funds into legitimate assets. Cryptocurrency businesses must implement AML programs including customer due diligence, transaction monitoring, and suspicious activity reporting.",
    categories: ["regulatory", "blockchain"],
    related: ["KYC", "FATF", "Compliance", "Regulatory Reporting"],
    trending: 8
  },
  
  // AI Terms
  {
    term: "LLM (Large Language Model)",
    definition: "Advanced AI systems trained on vast amounts of text data that can understand, generate, and manipulate human language. LLMs like GPT-4, Claude, and Llama form the foundation of modern conversational AI and content generation tools.",
    categories: ["ai"],
    related: ["Generative AI", "Natural Language Processing", "Transformer Architecture"],
    trending: 10
  },
  {
    term: "MCP (Maximum Credible Perspective)",
    definition: "A framework for AI evaluation that presents the strongest version of each perspective on a topic, particularly useful in contentious domains. MCPs help avoid bias by ensuring AIs represent different viewpoints at their most reasonable and evidence-based.",
    categories: ["ai"],
    related: ["AI Alignment", "Balanced Perspectives", "AI Ethics"],
    trending: 7
  },
  {
    term: "AI Productification",
    definition: "The process of transforming AI research and models into user-friendly, commercially viable products and services. This involves packaging AI capabilities with intuitive interfaces, reliable infrastructure, and business models that deliver value to customers.",
    categories: ["ai", "strategy"],
    related: ["AI Implementation", "Production ML", "AI Business Models"],
    trending: 8
  },
  {
    term: "AI Automation",
    definition: "The application of artificial intelligence to perform tasks with minimal human intervention. In business contexts, AI automation focuses on streamlining workflows, reducing manual labor, and improving efficiency through machine learning techniques.",
    categories: ["ai", "strategy"],
    related: ["Workflow Automation", "Robotic Process Automation", "Business Intelligence"],
    trending: 9
  },
  {
    term: "ML (Machine Learning)",
    definition: "A subset of artificial intelligence focusing on algorithms that improve automatically through experience. ML systems learn patterns from data to make predictions or decisions without explicit programming for each specific task.",
    categories: ["ai"],
    related: ["Deep Learning", "Supervised Learning", "Data Science"],
    trending: 9
  },
  {
    term: "AI in Web3",
    definition: "The integration of artificial intelligence with blockchain and Web3 technologies to create more intelligent, adaptive decentralized systems. Applications include predictive analytics for crypto markets, personalized DeFi recommendations, and automated smart contract auditing.",
    categories: ["ai", "web3", "blockchain"],
    related: ["AI-Generated Content on Blockchain", "AI DAO Governance", "Predictive Analytics"],
    trending: 10
  },
  
  // Business & Strategy
  {
    term: "Go-to-Market Strategy",
    definition: "A tactical plan detailing how a new product or service will be launched and sold to customers. In Web3, GTM strategies often involve community building, token incentives, and collaborative marketing approaches that differ from traditional models.",
    categories: ["strategy"],
    related: ["Token Launch", "Community Marketing", "Product-Market Fit"],
    trending: 8
  },
  {
    term: "Blockchain Consulting",
    definition: "Professional advisory services helping organizations understand, implement, and optimize blockchain technologies. Services typically include technology assessment, tokenomics design, regulatory compliance guidance, and integration with existing systems.",
    categories: ["strategy", "blockchain", "web3"],
    related: ["Tokenomics Design", "Blockchain Implementation", "Strategic Advisory"],
    trending: 8
  },
  {
    term: "Whitepaper",
    definition: "A comprehensive document outlining the problem, solution, technology, tokenomics, and roadmap of a blockchain project. Whitepapers serve as the foundational technical document for crypto projects and are critical for establishing legitimacy.",
    categories: ["strategy", "blockchain", "web3"],
    related: ["Litepaper", "Technical Documentation", "Tokenomics"],
    trending: 7
  },
  {
    term: "Token Launch Strategy",
    definition: "A comprehensive plan for introducing a new cryptocurrency or token to the market, including distribution mechanisms, pricing, target audience, marketing, exchange listings, and liquidity provision to ensure a successful debut.",
    categories: ["strategy", "tokenomics", "web3"],
    related: ["IDO", "Token Sale", "Fair Launch", "Community Building"],
    trending: 8
  },
  {
    term: "Tokenization",
    definition: "The process of converting rights to an asset into a digital token on a blockchain. Tokenization can be applied to real estate, art, securities, commodities, and other assets, enabling fractional ownership and increased liquidity.",
    categories: ["blockchain", "web3", "tokenomics"],
    related: ["Digital Assets", "Fractional Ownership", "Asset-Backed Tokens"],
    trending: 9
  },
  
  // Additional Key Terms
  {
    term: "Zero-Knowledge Proofs",
    definition: "Cryptographic methods allowing one party to prove to another that a statement is true without revealing any additional information beyond the validity of the statement itself. In blockchain, ZK-proofs enable private transactions and scaling solutions.",
    categories: ["blockchain", "web3"],
    related: ["Privacy", "ZK-Rollups", "Scalability"],
    trending: 9
  },
  {
    term: "Digital Identity",
    definition: "A set of validated digital attributes and credentials that identify an entity, person, or organization online. In Web3, self-sovereign digital identities allow users to control their personal data and selectively disclose information without relying on central authorities.",
    categories: ["web3", "blockchain", "regulatory"],
    related: ["Self-Sovereign Identity", "Verifiable Credentials", "DID"],
    trending: 8
  },
  {
    term: "Interoperability",
    definition: "The ability of different blockchain networks to exchange and leverage data and assets across systems. Interoperability solutions enable communication between otherwise siloed blockchains, enhancing utility and user experience.",
    categories: ["blockchain", "web3"],
    related: ["Cross-Chain", "Bridges", "Multi-Chain"],
    trending: 9
  },
  {
    term: "CBDC (Central Bank Digital Currency)",
    definition: "Digital forms of fiat currency issued by a country's central bank. Unlike cryptocurrencies, CBDCs are centralized, regulated by monetary authorities, and designed to function alongside traditional cash and bank deposits.",
    categories: ["blockchain", "regulatory"],
    related: ["Digital Currency", "Stablecoins", "Monetary Policy"],
    trending: 9
  }
];
