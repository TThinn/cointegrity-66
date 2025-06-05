// Glossary Terms Data with Semantic Clustering Support
// This file contains comprehensive cryptocurrency, blockchain, and Web3 terminology

export type GlossaryTerm = {
  term: string;
  definition: string;
  categories: ("blockchain_technology" | "cryptocurrency_types" | "web3" | "defi" | "cefi" | "nfts_collectibles" | "tokenomics" | "exchanges_trading" | "wallets_security" | "mining_staking" | "regulatory_frameworks" | "compliance" | "crypto_history" | "infrastructure_applications" | "gaming_metaverse" | "social_community" | "ai_data" | "depin" | "cross_chain" | "smart_contracts" | "technical_analysis" | "privacy_technology" | "layer2_solutions" | "tokenization" | "crypto_economics")[];
  related?: string[];
  trending?: number; // 1-10 scale, 10 being most trending
  
  // NEW SEMANTIC CLUSTERING FIELDS
  semanticCluster?: string;
  topicHierarchy?: string[];
  synonyms?: string[];
  alternativeSpellings?: string[];
  searchKeywords?: string[];
};

// Semantic cluster constants for enhanced organization and SEO
export const SEMANTIC_CLUSTERS = {
  // DeFi Ecosystem
  "DeFi_Lending_Ecosystem": "DeFi Lending Ecosystem",
  "DeFi_Trading_Infrastructure": "DeFi Trading Infrastructure", 
  "DeFi_Yield_Generation": "DeFi Yield Generation",
  "DeFi_Risk_Management": "DeFi Risk Management",
  "DeFi_Governance": "DeFi Governance",
  
  // NFT Market
  "NFT_Market_Infrastructure": "NFT Market Infrastructure",
  "NFT_Creation_Tools": "NFT Creation Tools",
  "NFT_Gaming_Assets": "NFT Gaming Assets",
  "NFT_Collectibles": "NFT Collectibles",
  "NFT_Utility_Applications": "NFT Utility Applications",
  
  // Blockchain Infrastructure
  "Consensus_Mechanisms": "Consensus Mechanisms",
  "Network_Security": "Network Security",
  "Scalability_Solutions": "Scalability Solutions",
  "Cross_Chain_Infrastructure": "Cross-Chain Infrastructure",
  "Node_Operations": "Node Operations",
  
  // Trading and Exchange
  "Centralized_Exchange_Operations": "Centralized Exchange Operations",
  "Decentralized_Exchange_Technology": "Decentralized Exchange Technology",
  "Trading_Strategies": "Trading Strategies",
  "Market_Analysis_Tools": "Market Analysis Tools",
  "Liquidity_Management": "Liquidity Management",
  
  // Security and Custody
  "Wallet_Technology": "Wallet Technology",
  "Cryptographic_Security": "Cryptographic Security",
  "Institutional_Custody": "Institutional Custody",
  "Threat_Prevention": "Threat Prevention",
  
  // Regulatory and Compliance
  "Global_Regulatory_Frameworks": "Global Regulatory Frameworks",
  "Compliance_Technology": "Compliance Technology",
  "Tax_Reporting": "Tax Reporting",
  "AML_KYC_Systems": "AML/KYC Systems",
  
  // Gaming and Metaverse
  "Play_to_Earn_Economics": "Play-to-Earn Economics",
  "Virtual_World_Infrastructure": "Virtual World Infrastructure",
  "Gaming_Token_Systems": "Gaming Token Systems",
  "Metaverse_Experiences": "Metaverse Experiences",
  
  // AI and Data
  "AI_Blockchain_Integration": "AI-Blockchain Integration",
  "Decentralized_AI_Networks": "Decentralized AI Networks",
  "Data_Analytics_Tools": "Data Analytics Tools",
  "Machine_Learning_Applications": "Machine Learning Applications"
} as const;

// Comprehensive glossary terms with enhanced semantic clustering
export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Bitcoin (BTC)",
    definition: "The original cryptocurrency created in 2009 by the pseudonymous Satoshi Nakamoto. Bitcoin operates on a decentralized peer-to-peer network secured by proof-of-work consensus, enabling digital value transfer without intermediaries.",
    categories: ["cryptocurrency_types", "blockchain_technology"],
    related: ["Proof of Work", "Digital Gold", "Satoshi Nakamoto", "UTXO Model"],
    trending: 10,
    semanticCluster: "Digital_Currency_Foundation",
    topicHierarchy: ["Digital Assets", "Cryptocurrencies", "Bitcoin", "Base Layer"],
    synonyms: ["BTC", "Digital Gold", "Peer-to-Peer Electronic Cash"],
    alternativeSpellings: ["BitCoin", "bitcoin"],
    searchKeywords: ["digital currency", "cryptocurrency", "blockchain", "satoshi nakamoto", "peer to peer money", "decentralized money"]
  },
  {
    term: "Ethereum (ETH)",
    definition: "A decentralized blockchain platform that enables smart contracts and decentralized applications (dApps). Ethereum introduced programmable money and serves as the foundation for much of the DeFi ecosystem.",
    categories: ["cryptocurrency_types", "blockchain_technology", "smart_contracts"],
    related: ["Smart Contracts", "ERC-20", "Gas Fees", "Proof of Stake"],
    trending: 10,
    semanticCluster: "Smart_Contract_Platform",
    topicHierarchy: ["Digital Assets", "Smart Contract Platforms", "Ethereum", "Layer 1"],
    synonyms: ["ETH", "Ethereum Network", "World Computer"],
    alternativeSpellings: ["ethereum"],
    searchKeywords: ["smart contracts", "decentralized applications", "dApps", "programmable blockchain", "web3 platform", "ethereum ecosystem"]
  },
  {
    term: "DeFi (Decentralized Finance)",
    definition: "A financial system built on blockchain technology that operates without traditional intermediaries like banks. DeFi protocols enable lending, borrowing, trading, and earning yield through smart contracts.",
    categories: ["defi", "blockchain_technology"],
    related: ["Smart Contracts", "Yield Farming", "Liquidity Pools", "DEX"],
    trending: 9,
    semanticCluster: "DeFi_Lending_Ecosystem",
    topicHierarchy: ["Financial Services", "Decentralized Finance", "DeFi Protocols"],
    synonyms: ["Decentralized Finance", "Open Finance", "DeFi Protocols"],
    alternativeSpellings: ["De-Fi", "defi"],
    searchKeywords: ["decentralized finance", "open finance", "yield farming", "liquidity mining", "automated market maker", "defi protocols"]
  },
  {
    term: "NFT (Non-Fungible Token)",
    definition: "A unique digital asset stored on a blockchain that represents ownership of a specific item, artwork, or collectible. Unlike cryptocurrencies, NFTs are not interchangeable and each has distinct properties.",
    categories: ["nfts_collectibles", "blockchain_technology"],
    related: ["ERC-721", "Digital Art", "Metadata", "IPFS"],
    trending: 8,
    semanticCluster: "NFT_Collectibles",
    topicHierarchy: ["Digital Assets", "Non-Fungible Tokens", "Digital Collectibles"],
    synonyms: ["Non-Fungible Token", "Digital Collectible", "Crypto Art"],
    alternativeSpellings: ["nft", "N.F.T."],
    searchKeywords: ["non fungible token", "digital art", "crypto collectibles", "unique digital assets", "blockchain art", "digital ownership"]
  },
  {
    term: "Smart Contract",
    definition: "Self-executing contracts with terms directly written into code. Smart contracts automatically execute when predetermined conditions are met, eliminating the need for intermediaries.",
    categories: ["smart_contracts", "blockchain_technology"],
    related: ["Ethereum", "Solidity", "Gas Fees", "dApps"],
    trending: 9,
    semanticCluster: "Smart_Contract_Platform",
    topicHierarchy: ["Blockchain Technology", "Smart Contracts", "Automated Execution"],
    synonyms: ["Automated Contract", "Digital Contract", "Blockchain Contract"],
    alternativeSpellings: ["smart-contract", "smartcontract"],
    searchKeywords: ["automated contracts", "self executing contracts", "blockchain programming", "decentralized applications", "ethereum contracts"]
  },
  {
    term: "Yield Farming",
    definition: "A DeFi strategy where users provide liquidity to protocols in exchange for rewards, typically in the form of additional tokens. Also known as liquidity mining.",
    categories: ["defi", "tokenomics"],
    related: ["Liquidity Pools", "APY", "Staking", "Governance Tokens"],
    trending: 7,
    semanticCluster: "DeFi_Yield_Generation",
    topicHierarchy: ["DeFi", "Yield Generation", "Liquidity Mining"],
    synonyms: ["Liquidity Mining", "DeFi Farming", "Token Farming"],
    alternativeSpellings: ["yield-farming", "yieldfarming"],
    searchKeywords: ["liquidity mining", "defi rewards", "farming tokens", "passive income crypto", "liquidity provision", "defi yields"]
  },
  {
    term: "DEX (Decentralized Exchange)",
    definition: "A cryptocurrency exchange that operates without a central authority, allowing users to trade directly with each other through smart contracts while maintaining custody of their funds.",
    categories: ["exchanges_trading", "defi"],
    related: ["Uniswap", "AMM", "Liquidity Pools", "Slippage"],
    trending: 8,
    semanticCluster: "Decentralized_Exchange_Technology",
    topicHierarchy: ["Trading", "Decentralized Exchanges", "AMM Protocols"],
    synonyms: ["Decentralized Exchange", "DEX Protocol", "Automated Market Maker"],
    alternativeSpellings: ["dex", "D.E.X."],
    searchKeywords: ["decentralized exchange", "peer to peer trading", "automated market maker", "defi trading", "non custodial exchange"]
  },
  {
    term: "Staking",
    definition: "The process of participating in a proof-of-stake blockchain network by locking up tokens to support network operations and earn rewards.",
    categories: ["mining_staking", "tokenomics"],
    related: ["Proof of Stake", "Validators", "Delegated Staking", "Slash Conditions"],
    trending: 8,
    semanticCluster: "Consensus_Mechanisms",
    topicHierarchy: ["Blockchain Consensus", "Proof of Stake", "Network Participation"],
    synonyms: ["Token Staking", "PoS Staking", "Network Staking"],
    alternativeSpellings: ["staking"],
    searchKeywords: ["proof of stake", "earn rewards", "network validation", "crypto staking", "passive income", "blockchain participation"]
  },
  {
    term: "DAO (Decentralized Autonomous Organization)",
    definition: "An organization governed by smart contracts and token holders rather than traditional management structures. DAOs enable collective decision-making through on-chain voting.",
    categories: ["web3", "tokenomics"],
    related: ["Governance Tokens", "Voting", "Treasury Management", "Proposals"],
    trending: 7,
    semanticCluster: "DeFi_Governance",
    topicHierarchy: ["Web3 Governance", "DAOs", "Decentralized Organizations"],
    synonyms: ["Decentralized Autonomous Organization", "Crypto DAO", "Blockchain Organization"],
    alternativeSpellings: ["dao", "D.A.O."],
    searchKeywords: ["decentralized organization", "blockchain governance", "token voting", "collective decision making", "web3 governance"]
  },
  {
    term: "Layer 2",
    definition: "Scaling solutions built on top of existing blockchains (Layer 1) to improve transaction speed and reduce costs while maintaining security guarantees from the base layer.",
    categories: ["layer2_solutions", "blockchain_technology"],
    related: ["Rollups", "Optimism", "Arbitrum", "Polygon"],
    trending: 9,
    semanticCluster: "Scalability_Solutions",
    topicHierarchy: ["Blockchain Infrastructure", "Scaling Solutions", "Layer 2 Networks"],
    synonyms: ["L2", "Layer Two", "Scaling Solution"],
    alternativeSpellings: ["layer-2", "layer2"],
    searchKeywords: ["blockchain scaling", "layer 2 solutions", "transaction speed", "ethereum scaling", "rollups", "sidechain"]
  },
  {
    term: "51% Attack",
    definition: "A potential attack on a blockchain where a single entity or organization controls the majority of the network's mining hash rate, which can allow attackers to prevent new transactions from being confirmed.",
    categories: ["wallets_security", "mining_staking", "blockchain_technology"],
    related: ["Double Spending", "Byzantine Fault Tolerance", "Proof of Work"],
    trending: 5
  },
  {
    term: "Address",
    definition: "A unique identifier representing a location on a blockchain where cryptocurrency or other digital assets can be sent and stored.",
    categories: ["wallets_security", "blockchain_technology"],
    related: ["Public Key", "Private Key", "Wallet"],
    trending: 7
  },
  {
    term: "AML (Anti-Money Laundering)",
    definition: "A set of laws, regulations, and procedures intended to prevent illegally obtained funds from being disguised as legitimate income.",
    categories: ["regulatory_frameworks", "compliance"],
    related: ["KYC", "Sanctions", "Transaction Monitoring"],
    trending: 8
  },
  {
    term: "Arbitrage",
    definition: "The simultaneous purchase and sale of an asset in different markets to profit from a difference in the price.",
    categories: ["exchanges_trading"],
    related: ["Market Making", "Trading Bots", "Price Discovery"],
    trending: 6
  },
  {
    term: "ATH (All-Time High)",
    definition: "The highest price a cryptocurrency has ever reached in its trading history.",
    categories: ["exchanges_trading", "cryptocurrency_types"],
    related: ["Market Cycle", "Bull Market", "Bear Market"],
    trending: 7
  },
  {
    term: "Bear Market",
    definition: "A prolonged period in which investment prices fall, accompanied by widespread pessimism.",
    categories: ["exchanges_trading"],
    related: ["Market Cycle", "Bull Market", "Market Correction"],
    trending: 6
  },
  {
    term: "Blockchain",
    definition: "A distributed, decentralized, public ledger that records transactions across many computers. The 'block' refers to the data and time, and the 'chain' links the blocks together.",
    categories: ["blockchain_technology"],
    related: ["Distributed Ledger", "Cryptography", "Consensus Mechanism"],
    trending: 10
  },
  {
    term: "Bull Market",
    definition: "A period in financial markets in which prices are rising or are expected to rise.",
    categories: ["exchanges_trading"],
    related: ["Market Cycle", "Bear Market", "Market Sentiment"],
    trending: 7
  },
  {
    term: "Centralized Exchange (CEX)",
    definition: "A cryptocurrency exchange operated by a company that controls the platform and manages user funds.",
    categories: ["exchanges_trading", "cefi"],
    related: ["Binance", "Coinbase", "Kraken", "Decentralized Exchange"],
    trending: 8
  },
  {
    term: "Cold Storage",
    definition: "The practice of keeping cryptocurrency offline, often using hardware wallets, to protect it from hacking and theft.",
    categories: ["wallets_security"],
    related: ["Hardware Wallet", "Hot Wallet", "Private Key"],
    trending: 9
  },
  {
    term: "Consensus Mechanism",
    definition: "A fault-tolerant mechanism that is used in computer and blockchain systems to achieve the necessary agreement on a single state of the network among distributed processes or multi-agent systems.",
    categories: ["blockchain_technology", "mining_staking"],
    related: ["Proof of Work", "Proof of Stake", "Byzantine Fault Tolerance"],
    trending: 8
  },
  {
    term: "Cryptography",
    definition: "The art of writing or solving codes. In cryptocurrencies, cryptography is used to secure transactions and control the creation of new units.",
    categories: ["blockchain_technology", "wallets_security"],
    related: ["Encryption", "Hashing", "Public Key Cryptography"],
    trending: 9
  },
  {
    term: "dApp (Decentralized Application)",
    definition: "An application that runs on a decentralized network, typically a blockchain. dApps are characterized by their open-source nature and lack of central control.",
    categories: ["web3", "blockchain_technology", "smart_contracts"],
    related: ["Smart Contract", "Web3", "Ethereum"],
    trending: 9
  },
  {
    term: "DeFi",
    definition: "Decentralized Finance (DeFi) is a financial system built on blockchain technology that operates without traditional intermediaries like banks.",
    categories: ["defi", "blockchain_technology"],
    related: ["Smart Contracts", "Yield Farming", "Liquidity Pools", "DEX"],
    trending: 9
  },
  {
    term: "Digital Gold",
    definition: "A term used to describe Bitcoin and other cryptocurrencies as a store of value, similar to gold.",
    categories: ["cryptocurrency_types", "blockchain_technology"],
    related: ["Bitcoin", "Store of Value", "Inflation Hedge"],
    trending: 7
  },
  {
    term: "Double Spending",
    definition: "The risk that a digital currency can be spent more than once. Blockchain technology and consensus mechanisms are designed to prevent this.",
    categories: ["blockchain_technology", "wallets_security"],
    related: ["51% Attack", "Byzantine Fault Tolerance", "UTXO Model"],
    trending: 6
  },
  {
    term: "ERC-20",
    definition: "A technical standard for smart contracts on the Ethereum blockchain, used for all fungible tokens.",
    categories: ["tokenomics", "smart_contracts"],
    related: ["Token", "Smart Contract", "Ethereum"],
    trending: 8
  },
  {
    term: "ERC-721",
    definition: "A technical standard for smart contracts on the Ethereum blockchain, used for non-fungible tokens (NFTs).",
    categories: ["nfts_collectibles", "smart_contracts"],
    related: ["NFT", "Smart Contract", "Ethereum"],
    trending: 8
  },
  {
    term: "Fiat Currency",
    definition: "Government-issued currency that is not backed by a physical commodity, such as gold or silver, but rather by the government that issued it.",
    categories: ["regulatory_frameworks", "crypto_history"],
    related: ["Central Bank", "Inflation", "Monetary Policy"],
    trending: 5
  },
    {
    term: "Gas Fees",
    definition: "A fee required to conduct a transaction or execute a smart contract on the Ethereum blockchain.",
    categories: ["blockchain_technology", "smart_contracts"],
    related: ["Ethereum", "Transaction Fee", "Gwei"],
    trending: 9
  },
  {
    term: "Halving",
    definition: "An event that occurs approximately every four years for Bitcoin, where the reward for mining new blocks is halved, reducing the rate at which new bitcoins are created.",
    categories: ["mining_staking", "tokenomics", "crypto_history"],
    related: ["Bitcoin", "Mining", "Inflation"],
    trending: 7
  },
  {
    term: "Hash Rate",
    definition: "The speed at which a computer is completing an operation in the blockchain code. A higher hash rate means greater security against attacks.",
    categories: ["mining_staking", "blockchain_technology"],
    related: ["Mining", "Proof of Work", "51% Attack"],
    trending: 7
  },
  {
    term: "Hot Wallet",
    definition: "A cryptocurrency wallet that is connected to the internet, making it more accessible but also more vulnerable to hacking.",
    categories: ["wallets_security"],
    related: ["Cold Storage", "Wallet", "Private Key"],
    trending: 8
  },
  {
    term: "ICO (Initial Coin Offering)",
    definition: "A means of crowdfunding, where a company sells new cryptocurrency tokens to raise capital.",
    categories: ["tokenomics", "crypto_history"],
    related: ["Token", "Crowdfunding", "Investment"],
    trending: 6
  },
  {
    term: "Impermanent Loss",
    definition: "The temporary loss of funds when providing liquidity to a liquidity pool due to price volatility.",
    categories: ["defi", "exchanges_trading"],
    related: ["Liquidity Pool", "Yield Farming", "AMM"],
    trending: 7
  },
  {
    term: "KYC (Know Your Customer)",
    definition: "The process of a business verifying the identity of its clients, often required for regulatory compliance.",
    categories: ["regulatory_frameworks", "compliance"],
    related: ["AML", "Compliance", "Identity Verification"],
    trending: 8
  },
  {
    term: "Liquidity Pool",
    definition: "A collection of funds locked in a smart contract, used to facilitate trading on decentralized exchanges (DEXs).",
    categories: ["defi", "exchanges_trading"],
    related: ["Yield Farming", "AMM", "Impermanent Loss"],
    trending: 8
  },
  {
    term: "Market Capitalization",
    definition: "The total value of a cryptocurrency, calculated by multiplying the current price by the total number of coins in circulation.",
    categories: ["exchanges_trading", "cryptocurrency_types"],
    related: ["Trading Volume", "Market Dominance", "Coin Supply"],
    trending: 7
  },
  {
    term: "Mining",
    definition: "The process of verifying and adding new transaction records to a blockchain. In proof-of-work systems, miners solve complex cryptographic puzzles to validate transactions.",
    categories: ["mining_staking", "blockchain_technology"],
    related: ["Proof of Work", "Hash Rate", "Block Reward"],
    trending: 8
  },
  {
    term: "NFT",
    definition: "A non-fungible token (NFT) is a unique digital asset stored on a blockchain that represents ownership of a specific item, artwork, or collectible.",
    categories: ["nfts_collectibles", "blockchain_technology"],
    related: ["ERC-721", "Digital Art", "Metadata"],
    trending: 8
  },
  {
    term: "Node",
    definition: "A computer connected to a blockchain network that maintains a copy of the blockchain and participates in validating transactions.",
    categories: ["blockchain_technology", "infrastructure_applications"],
    related: ["Full Node", "Light Node", "Validator"],
    trending: 7
  },
  {
    term: "Oracle",
    definition: "A third-party service that provides smart contracts with external data, enabling them to interact with real-world events and information.",
    categories: ["smart_contracts", "infrastructure_applications"],
    related: ["Chainlink", "Data Feed", "Smart Contract"],
    trending: 7
  },
  {
    term: "Peer-to-Peer (P2P)",
    definition: "A decentralized interaction between two parties, without the need for a central authority or intermediary.",
    categories: ["blockchain_technology"],
    related: ["Decentralization", "Bitcoin", "File Sharing"],
    trending: 7
  },
  {
    term: "Private Key",
    definition: "A secret key used to authorize outgoing transactions on a blockchain. Private keys must be kept secure to prevent unauthorized access to funds.",
    categories: ["wallets_security", "cryptography"],
    related: ["Public Key", "Wallet", "Cryptography"],
    trending: 9
  },
  {
    term: "Proof of Stake (PoS)",
    definition: "A consensus mechanism where validators are chosen to create new blocks based on the number of coins they hold and are willing to 'stake' as collateral.",
    categories: ["mining_staking", "blockchain_technology"],
    related: ["Staking", "Validator", "Consensus Mechanism"],
    trending: 8
  },
  {
    term: "Proof of Work (PoW)",
    definition: "A consensus mechanism where miners compete to solve complex cryptographic puzzles to validate transactions and create new blocks.",
    categories: ["mining_staking", "blockchain_technology"],
    related: ["Mining", "Hash Rate", "Consensus Mechanism"],
    trending: 8
  },
  {
    term: "Public Key",
    definition: "A cryptographic key that can be shared with others, used to receive cryptocurrency transactions.",
    categories: ["wallets_security", "cryptography"],
    related: ["Private Key", "Address", "Cryptography"],
    trending: 9
  },
  {
    term: "REKT",
    definition: "A slang term in the cryptocurrency community for being financially ruined due to bad trades or investments.",
    categories: ["exchanges_trading", "social_community"],
    related: ["FOMO", "FUD", "Volatility"],
    trending: 6
  },
  {
    term: "Rollup",
    definition: "A layer-2 scaling solution that executes transactions off-chain and then posts the transaction data to the main chain in batches.",
    categories: ["layer2_solutions", "blockchain_technology"],
    related: ["Optimistic Rollup", "ZK-Rollup", "Layer 2"],
    trending: 8
  },
  {
    term: "Satoshi Nakamoto",
    definition: "The pseudonymous creator of Bitcoin.",
    categories: ["crypto_history", "blockchain_technology"],
    related: ["Bitcoin", "Cryptography", "Decentralization"],
    trending: 8
  },
  {
    term: "Sharding",
    definition: "A database partitioning technique used to improve the scalability of blockchain networks by dividing the network into smaller, more manageable pieces.",
    categories: ["blockchain_technology", "infrastructure_applications"],
    related: ["Scalability", "Blockchain", "Database"],
    trending: 7
  },
  {
    term: "Smart Contract",
    definition: "Self-executing contracts with the terms of the agreement directly written into code. They automatically execute when predetermined conditions are met.",
    categories: ["smart_contracts", "blockchain_technology"],
    related: ["Ethereum", "Solidity", "dApp"],
    trending: 9
  },
  {
    term: "Solidity",
    definition: "A programming language used for writing smart contracts on the Ethereum blockchain.",
    categories: ["smart_contracts", "blockchain_technology"],
    related: ["Smart Contract", "Ethereum", "Programming Language"],
    trending: 8
  },
  {
    term: "Stablecoin",
    definition: "A cryptocurrency designed to minimize price volatility, often pegged to a stable asset like the US dollar.",
    categories: ["cryptocurrency_types", "defi"],
    related: ["USDT", "USDC", "DAI"],
    trending: 8
  },
  {
    term: "Staking",
    definition: "The process of holding cryptocurrency in a wallet to support the operations of a blockchain network and earn rewards.",
    categories: ["mining_staking", "tokenomics"],
    related: ["Proof of Stake", "Validator", "Reward"],
    trending: 8
  },
  {
    term: "Token",
    definition: "A digital asset that represents a unit of value, utility, or ownership on a blockchain.",
    categories: ["tokenomics", "cryptocurrency_types"],
    related: ["Cryptocurrency", "ERC-20", "Utility Token"],
    trending: 8
  },
  {
    term: "Tokenomics",
    definition: "The economics of a cryptocurrency token, including its supply, distribution, and use cases.",
    categories: ["tokenomics"],
    related: ["Token", "Supply", "Utility"],
    trending: 8
  },
  {
    term: "Transaction Fee",
    definition: "A fee paid to the blockchain network for processing a transaction.",
    categories: ["blockchain_technology", "exchanges_trading"],
    related: ["Gas Fees", "Ethereum", "Bitcoin"],
    trending: 7
  },
  {
    term: "Validator",
    definition: "A participant in a proof-of-stake blockchain network who is responsible for verifying transactions and creating new blocks.",
    categories: ["mining_staking", "blockchain_technology"],
    related: ["Proof of Stake", "Staking", "Node"],
    trending: 8
  },
  {
    term: "Volatility",
    definition: "The degree of variation of a trading price series over time, often used to describe the risk or uncertainty associated with the asset's value.",
    categories: ["exchanges_trading"],
    related: ["Trading", "Risk", "Market"],
    trending: 7
  },
  {
    term: "Wallet",
    definition: "A digital tool used to store, send, and receive cryptocurrencies.",
    categories: ["wallets_security"],
    related: ["Private Key", "Public Key", "Address"],
    trending: 9
  },
  {
    term: "Web3",
    definition: "The next evolution of the internet, characterized by decentralization, blockchain technologies, and token-based economics.",
    categories: ["web3", "blockchain_technology"],
    related: ["dApp", "Decentralization", "Blockchain"],
    trending: 9
  },
  {
    term: "Yield Farming",
    definition: "A DeFi strategy where users provide liquidity to protocols in exchange for rewards, typically in the form of additional tokens.",
    categories: ["defi", "tokenomics"],
    related: ["Liquidity Pool", "Staking", "DeFi"],
    trending: 8
  }
];

// Helper functions for enhanced search and organization
export const getTermsByCluster = (cluster: string): GlossaryTerm[] => {
  return glossaryTerms.filter(term => term.semanticCluster === cluster);
};

export const getClusterHierarchy = (term: GlossaryTerm): string => {
  return term.topicHierarchy?.join(" > ") || "Uncategorized";
};

export const searchBySynonyms = (searchTerm: string): GlossaryTerm[] => {
  const lowerSearchTerm = searchTerm.toLowerCase();
  return glossaryTerms.filter(term => 
    term.synonyms?.some(synonym => 
      synonym.toLowerCase().includes(lowerSearchTerm)
    ) ||
    term.alternativeSpellings?.some(spelling => 
      spelling.toLowerCase().includes(lowerSearchTerm)
    ) ||
    term.searchKeywords?.some(keyword => 
      keyword.toLowerCase().includes(lowerSearchTerm)
    )
  );
};

export const getRelatedClusters = (cluster: string): string[] => {
  const clusterRelations: Record<string, string[]> = {
    "DeFi_Lending_Ecosystem": ["DeFi_Risk_Management", "DeFi_Governance"],
    "NFT_Gaming_Assets": ["Play_to_Earn_Economics", "Gaming_Token_Systems"],
    "Consensus_Mechanisms": ["Network_Security", "Scalability_Solutions"],
    "Trading_Strategies": ["Market_Analysis_Tools", "Liquidity_Management"],
  };
  return clusterRelations[cluster] || [];
};

export const getTermsBySearchKeywords = (keyword: string): GlossaryTerm[] => {
  const lowerKeyword = keyword.toLowerCase();
  return glossaryTerms.filter(term => 
    term.searchKeywords?.some(searchKeyword => 
      searchKeyword.toLowerCase().includes(lowerKeyword)
    )
  );
};

export const getAvailableClusters = (): string[] => {
  const clusters = new Set<string>();
  glossaryTerms.forEach(term => {
    if (term.semanticCluster) {
      clusters.add(term.semanticCluster);
    }
  });
  return Array.from(clusters).sort();
};
