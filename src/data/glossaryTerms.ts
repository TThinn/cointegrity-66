import { CategoryType } from "@/components/glossary/types";

export interface GlossaryTerm {
  term: string;
  definition: string;
  categories: readonly CategoryType[];
  related?: readonly string[];
}

export const glossaryTerms: readonly GlossaryTerm[] = [
  {
    term: "51% Attack",
    definition: "A 51% attack, also known as a majority attack, occurs when a single entity or organization gains control of more than 50% of a cryptocurrency network's mining hashrate or staking power. This allows the attacker to potentially manipulate the blockchain by reversing transactions, preventing new transactions from being confirmed, and double-spending coins.",
    categories: ["security"] as const,
    related: ["Double Spending", "Byzantine Fault Tolerance", "Blockchain Consensus"]
  },
  {
    term: "Airdrop",
    definition: "An airdrop is the distribution of a cryptocurrency token or coin to numerous wallet addresses. Airdrops are primarily implemented as a way of gaining attention and new followers, resulting in a larger user-base and a wider disbursement of coin. They are also used as a marketing tactic to get people interested in a new cryptocurrency.",
    categories: ["tokenomics"] as const,
    related: ["Token", "Cryptocurrency", "Wallet"]
  },
  {
    term: "AML (Anti-Money Laundering)",
    definition: "Anti-Money Laundering (AML) refers to a set of laws, regulations, and procedures intended to prevent criminals from disguising illegally obtained funds as legitimate income. In the context of cryptocurrency, AML efforts aim to monitor and regulate digital asset transactions to detect and prevent money laundering, terrorist financing, and other illicit activities.",
    categories: ["regulatory_frameworks", "compliance"] as const,
    related: ["KYC", "Compliance", "Regulation"]
  },
  {
    term: "Arbitrage",
    definition: "Arbitrage is the simultaneous purchase and sale of an asset in different markets to profit from a difference in the price. It is a trade that profits by exploiting price differences of identical or similar financial instruments on different markets or in different forms. Arbitrage exists as a result of market inefficiencies.",
    categories: ["exchanges_trading"] as const,
    related: ["Trading", "Exchange", "Market"]
  },
  {
    term: "Artificial Intelligence (AI)",
    definition: "Artificial intelligence (AI) is the simulation of human intelligence processes by computer systems. These processes include learning (the acquisition of information and rules for using the information), reasoning (using rules to reach approximate or definite conclusions), and self-correction. Specific applications of AI include expert systems, speech recognition, and machine vision.",
    categories: ["ai_data"] as const,
    related: ["Machine Learning", "Big Data", "Blockchain"]
  },
  {
    term: "Ask",
    definition: "The ask is the price a seller is willing to accept for a cryptocurrency. It represents the lowest price at which someone is willing to sell. Also known as the offer.",
    categories: ["exchanges_trading"] as const,
    related: ["Bid", "Spread", "Order Book"]
  },
  {
    term: "ATH (All-Time High)",
    definition: "ATH stands for All-Time High. It represents the highest price a cryptocurrency has ever reached in its trading history. Investors and traders often monitor ATH levels to identify potential resistance levels and gauge the overall performance of a digital asset.",
    categories: ["exchanges_trading"] as const,
    related: ["ATL", "Price Discovery", "Market Cycle"]
  },
  {
    term: "ATL (All-Time Low)",
    definition: "ATL stands for All-Time Low. It represents the lowest price a cryptocurrency has ever reached in its trading history. Investors and traders often monitor ATL levels to identify potential support levels and gauge the overall performance of a digital asset.",
    categories: ["exchanges_trading"] as const,
    related: ["ATH", "Price Discovery", "Market Cycle"]
  },
  {
    term: "Bitcoin",
    definition: "Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries.",
    categories: ["cryptocurrency_types"] as const,
    related: ["Cryptocurrency", "Blockchain", "Decentralization"]
  },
  {
    term: "Bitcoin Pizza Day",
    definition: "Bitcoin Pizza Day is celebrated on May 22nd each year, commemorating the first known real-world transaction using Bitcoin. On this day in 2010, Laszlo Hanyecz paid 10,000 BTC for two pizzas, which at the time was worth approximately $40. This event is significant because it marked the first time Bitcoin was used as a medium of exchange for a tangible good.",
    categories: ["crypto_history"] as const,
    related: ["Bitcoin", "Cryptocurrency", "Transaction"]
  },
  {
    term: "Bid",
    definition: "The bid is the price a buyer is willing to pay for a cryptocurrency. It represents the highest price at which someone is willing to buy. Also known as demand.",
    categories: ["exchanges_trading"] as const,
    related: ["Ask", "Spread", "Order Book"]
  },
  {
    term: "Blockchain",
    definition: "A blockchain is a distributed, decentralized, public, and immutable ledger that is used to record transactions across many computers so that any involved record cannot be altered retroactively, without the alteration of all subsequent blocks.",
    categories: ["blockchain_technology"] as const,
    related: ["Bitcoin", "Cryptocurrency", "Decentralization"]
  },
  {
    term: "Block Explorer",
    definition: "A block explorer is a tool that allows users to view information about blocks, transactions, and addresses on a blockchain. It provides a user-friendly interface to search and explore the data stored on a blockchain, such as transaction details, block height, timestamps, and wallet balances.",
    categories: ["infrastructure_applications"] as const,
    related: ["Blockchain", "Transaction", "Address"]
  },
  {
    term: "Bot",
    definition: "A bot is an automated software program that executes tasks on the internet. In cryptocurrency trading, bots are used to automate trading strategies, execute orders, and monitor market data. Trading bots can be programmed to buy or sell cryptocurrencies based on predefined rules and algorithms.",
    categories: ["exchanges_trading"] as const,
    related: ["Trading", "Algorithm", "Automation"]
  },
  {
    term: "Bridge",
    definition: "A bridge is a protocol that connects two or more blockchains, allowing for the transfer of assets and data between them. Bridges enable interoperability between different blockchain networks, enabling users to access decentralized applications (dApps) and services across multiple chains.",
    categories: ["cross_chain"] as const,
    related: ["Cross-Chain", "Interoperability", "Blockchain"]
  },
  {
    term: "CeFi (Centralized Finance)",
    definition: "Centralized Finance (CeFi) refers to financial services and applications that are controlled by a central entity or intermediary. CeFi platforms, such as centralized cryptocurrency exchanges, offer services like trading, lending, and borrowing, but operate under the control of a central authority.",
    categories: ["cefi"] as const,
    related: ["DeFi", "Exchange", "Custodial"]
  },
  {
    term: "Cold Storage",
    definition: "Cold storage refers to the practice of storing cryptocurrency offline, typically in a hardware wallet or paper wallet. Cold storage provides a high level of security by keeping the private keys away from internet-connected devices, reducing the risk of hacking and theft.",
    categories: ["wallets_security"] as const,
    related: ["Hot Wallet", "Hardware Wallet", "Security"]
  },
  {
    term: "Consensus Mechanism",
    definition: "A consensus mechanism is a fault-tolerant mechanism that is used in computer and blockchain systems to achieve the necessary agreement on a single state of the network among distributed processes or multi-agent systems, such as cryptocurrencies.",
    categories: ["blockchain_technology"] as const,
    related: ["Proof of Work", "Proof of Stake", "Byzantine Fault Tolerance"]
  },
  {
    term: "Cryptocurrency",
    definition: "A cryptocurrency is a digital or virtual currency that uses cryptography for security. A defining trait of a cryptocurrency, and arguably its most endearing allure, is its organic nature; it is not issued by any central authority, rendering it theoretically immune to government interference or manipulation.",
    categories: ["cryptocurrency_types"] as const,
    related: ["Bitcoin", "Blockchain", "Decentralization"]
  },
  {
    term: "Cryptography",
    definition: "Cryptography is the practice and study of techniques for secure communication in the presence of adversarial behavior. In the context of cryptocurrency, cryptography is used to secure transactions, control the creation of new units, and verify the transfer of assets.",
    categories: ["security"] as const,
    related: ["Encryption", "Decryption", "Hashing"]
  },
  {
    term: "DAO (Decentralized Autonomous Organization)",
    definition: "A Decentralized Autonomous Organization (DAO) is an organization represented by rules encoded as a computer program that is transparent, controlled by the organization members and not influenced by a central government. A DAO's financial transaction record and rules are maintained on a blockchain.",
    categories: ["web3"] as const,
    related: ["Decentralization", "Governance", "Smart Contract"]
  },
  {
    term: "dApp (Decentralized Application)",
    definition: "A decentralized application (dApp) is an application that runs on a decentralized computing system. DApps have been popularized by distributed ledger technologies (DLT) such as the Ethereum blockchain, where DApps are often referred to as smart contracts.",
    categories: ["web3"] as const,
    related: ["Smart Contract", "Blockchain", "Ethereum"]
  },
  {
    term: "DeFi (Decentralized Finance)",
    definition: "Decentralized Finance (DeFi) is a blockchain-based form of finance that does not rely on central financial intermediaries such as brokerages, exchanges, or banks to offer traditional financial instruments, and instead utilizes smart contracts on blockchains.",
    categories: ["defi"] as const,
    related: ["Smart Contract", "Blockchain", "Ethereum"]
  },
  {
    term: "DePIN (Decentralized Physical Infrastructure Networks)",
    definition: "Decentralized Physical Infrastructure Networks (DePIN) are blockchain-based networks that incentivize the deployment and maintenance of physical infrastructure, such as wireless networks, energy grids, and data storage, in a decentralized manner. DePINs leverage tokenomics and community governance to create more resilient, efficient, and accessible infrastructure solutions.",
    categories: ["depin"] as const,
    related: ["Blockchain", "Tokenomics", "Infrastructure"]
  },
  {
    term: "Digital Signature",
    definition: "A digital signature is a cryptographic technique used to verify the authenticity and integrity of digital messages or documents. In cryptocurrency, digital signatures are used to authorize transactions and prove ownership of private keys.",
    categories: ["security"] as const,
    related: ["Cryptography", "Private Key", "Transaction"]
  },
  {
    term: "Double Spending",
    definition: "Double spending is a potential flaw in a digital currency scheme in which the same single digital token can be spent more than once. This is possible because a digital token consists of a digital file that can be easily duplicated or counterfeited.",
    categories: ["security"] as const,
    related: ["51% Attack", "Blockchain", "Consensus Mechanism"]
  },
  {
    term: "DYOR (Do Your Own Research)",
    definition: "DYOR stands for Do Your Own Research. It is a common disclaimer used in the cryptocurrency community to emphasize the importance of conducting independent research and due diligence before making any investment decisions. Investors are encouraged to thoroughly investigate projects, tokens, and market trends before allocating capital.",
    categories: ["exchanges_trading"] as const,
    related: ["Due Diligence", "Investment", "Risk Management"]
  },
  {
    term: "ERC-20",
    definition: "ERC-20 is a technical standard for fungible tokens created on the Ethereum blockchain. It defines a common set of rules and functions that all ERC-20 tokens must adhere to, allowing them to be easily integrated into the Ethereum ecosystem.",
    categories: ["tokenomics"] as const,
    related: ["Ethereum", "Token", "Smart Contract"]
  },
  {
    term: "Ethereum",
    definition: "Ethereum is a decentralized, open-source blockchain platform that enables the creation of smart contracts and decentralized applications (dApps). It is the second-largest cryptocurrency by market capitalization, after Bitcoin.",
    categories: ["blockchain_technology"] as const,
    related: ["Smart Contract", "dApp", "Blockchain"]
  },
  {
    term: "Exchange",
    definition: "A cryptocurrency exchange is a digital marketplace where you can buy and sell cryptocurrencies. Exchanges act as intermediaries between buyers and sellers, providing a platform for trading digital assets.",
    categories: ["exchanges_trading"] as const,
    related: ["Trading", "Market", "Liquidity"]
  },
  {
    term: "Fiat Currency",
    definition: "Fiat currency is a government-issued currency that is not backed by a physical commodity, such as gold or silver, but rather by the government that issued it. Most modern currencies, such as the US dollar and the Euro, are fiat currencies.",
    categories: ["regulatory_frameworks"] as const,
    related: ["Cryptocurrency", "Regulation", "Central Bank"]
  },
  {
    term: "FOMO (Fear of Missing Out)",
    definition: "FOMO stands for Fear of Missing Out. It is the feeling of anxiety or apprehension that one might miss out on a positive experience, investment opportunity, or trend. In cryptocurrency, FOMO often drives investors to buy into assets that are rapidly increasing in price, potentially leading to irrational decision-making.",
    categories: ["social_community"] as const,
    related: ["FUD", "Market Psychology", "Investment"]
  },
   {
    term: "Fork",
    definition": "A fork is a software upgrade that creates a new version of the blockchain, which splits the blockchain into two. Forks are typically implemented to improve the functionality, security, or governance of a blockchain network.",
    categories: ["blockchain_technology"] as const,
    related: ["Hard Fork", "Soft Fork", "Blockchain Upgrade"]
  },
  {
    term: "FUD (Fear, Uncertainty, and Doubt)",
    definition: "FUD stands for Fear, Uncertainty, and Doubt. It is a propaganda tactic used to spread negative or misleading information about a particular asset, project, or technology. In cryptocurrency, FUD is often used to manipulate market sentiment and drive down prices.",
    categories: ["social_community"] as const,
    related: ["FOMO", "Market Psychology", "Investment"]
  },
  {
    term: "Gas",
    definition: "Gas refers to the unit of measurement for the computational effort required to execute operations on the Ethereum blockchain. Gas is used to allocate resources and incentivize miners to process transactions and smart contracts.",
    categories: ["infrastructure_applications"] as const,
    related: ["Ethereum", "Transaction Fee", "Smart Contract"]
  },
  {
    term: "Halving",
    definition: "Halving is an event that occurs in certain blockchain networks, such as Bitcoin, where the block reward for miners is reduced by 50%. Halvings are pre-programmed into the blockchain's code and occur at predetermined intervals. The purpose of halvings is to control the supply of new coins and maintain scarcity.",
    categories: ["mining_staking"] as const,
    related: ["Bitcoin", "Mining", "Block Reward"]
  },
  {
    term: "Hash Rate",
    definition: "Hash rate is the measure of the computational power per second used when mining. The higher the hash rate, the more likely that a miner will be able to solve the current block and be rewarded.",
    categories: ["mining_staking"] as const,
    related: ["Mining", "Proof of Work", "Block Reward"]
  },
  {
    term: "HODL",
    definition: "HODL is a term used in the cryptocurrency community to describe a buy-and-hold investment strategy. It originated from a misspelling of the word \"hold\" in a Bitcoin forum post and has since become a popular meme and investment philosophy.",
    categories: ["social_community"] as const,
    related: ["Investment", "Trading", "Market Psychology"]
  },
  {
    term: "Hot Wallet",
    definition: "A hot wallet is a cryptocurrency wallet that is connected to the internet. Hot wallets are convenient for making frequent transactions but are more vulnerable to hacking and theft compared to cold wallets.",
    categories: ["wallets_security"] as const,
    related: ["Cold Storage", "Wallet", "Security"]
  },
  {
    term: "ICO (Initial Coin Offering)",
    definition: "An Initial Coin Offering (ICO) is a fundraising mechanism in which a new cryptocurrency project sells its tokens to the public in exchange for cryptocurrencies like Bitcoin or Ethereum. ICOs are used to raise capital for project development and launch.",
    categories: ["tokenomics"] as const,
    related: ["Token", "Fundraising", "Investment"]
  },
  {
    term: "Impermanent Loss",
    definition: "Impermanent loss is the loss of funds when providing liquidity to a decentralized exchange (DEX) due to price fluctuations. It occurs when the price of the deposited assets diverges from the initial deposit ratio, resulting in a lower value compared to simply holding the assets.",
    categories: ["defi"] as const,
    related: ["Liquidity Pool", "Decentralized Exchange", "Yield Farming"]
  },
  {
    term: "KYC (Know Your Customer)",
    definition: "Know Your Customer (KYC) refers to the process of verifying the identity of customers to comply with legal and regulatory requirements. In the context of cryptocurrency, KYC procedures are used by exchanges and other service providers to prevent money laundering, fraud, and other illicit activities.",
    categories: ["regulatory_frameworks", "compliance"] as const,
    related: ["AML", "Compliance", "Regulation"]
  },
  {
    term: "Layer 2",
    definition: "Layer 2 refers to a set of scaling solutions built on top of a blockchain to improve transaction speed and reduce fees. Layer 2 protocols enable off-chain transactions and computations, which are then batched and settled on the main blockchain.",
    categories: ["layer2_solutions"] as const,
    related: ["Scaling", "Blockchain", "Transaction Fee"]
  },
  {
    term: "Liquidity",
    definition: "Liquidity refers to the ease with which an asset can be bought or sold without affecting its price. In cryptocurrency, liquidity is essential for efficient trading and price discovery. High liquidity allows traders to execute large orders without causing significant price slippage.",
    categories: ["exchanges_trading"] as const,
    related: ["Market Depth", "Order Book", "Trading Volume"]
  },
  {
    term: "Liquidity Pool",
    definition: "A liquidity pool is a collection of tokens locked in a smart contract to facilitate trading on a decentralized exchange (DEX). Liquidity pools provide the necessary liquidity for traders to buy and sell assets without relying on traditional market makers.",
    categories: ["defi"] as const,
    related: ["Decentralized Exchange", "Yield Farming", "Impermanent Loss"]
  },
  {
    term: "Machine Learning (ML)",
    definition: "Machine learning (ML) is the study of computer algorithms that improve automatically through experience. It is seen as a subset of artificial intelligence. Machine learning algorithms build a mathematical model based on sample data, known as \"training data\", in order to make predictions or decisions without being explicitly programmed to perform the task.",
    categories: ["ai_data"] as const,
    related: ["Artificial Intelligence", "Big Data", "Blockchain"]
  },
  {
    term: "Metaverse",
    definition: "The metaverse is a persistent, shared, 3D virtual world or universe that is interactive, immersive, and collaborative. It is often described as the next evolution of the internet, where users can socialize, work, play, and transact in a digital environment.",
    categories: ["gaming_metaverse"] as const,
    related: ["Virtual Reality", "Augmented Reality", "Blockchain"]
  },
  {
    term: "Mining",
    definition: "Mining is the process of validating and adding new blocks of transactions to a blockchain. Miners use specialized hardware to solve complex cryptographic puzzles, and in return, they receive a reward in the form of newly created coins and transaction fees.",
    categories: ["mining_staking"] as const,
    related: ["Proof of Work", "Block Reward", "Hash Rate"]
  },
  {
    term: "NFT (Non-Fungible Token)",
    definition: "A non-fungible token (NFT) is a unique digital asset that represents ownership of a specific item or piece of content. NFTs are stored on a blockchain and can be used to represent a wide range of tangible and intangible assets, such as artwork, collectibles, virtual real estate, and in-game items.",
    categories: ["nfts_collectibles"] as const,
    related: ["Blockchain", "Tokenization", "Digital Asset"]
  },
  {
    term: "Node",
    definition: "A node is a computer or device that participates in a blockchain network. Nodes store a copy of the blockchain and help validate transactions and maintain the integrity of the network.",
    categories: ["infrastructure_applications"] as const,
    related: ["Blockchain", "Network", "Decentralization"]
  },
  {
    term: "Oracle",
    definition: "An oracle is a third-party service that provides external data to smart contracts on a blockchain. Oracles are used to bridge the gap between the blockchain and the real world, enabling smart contracts to interact with off-chain data sources.",
    categories: ["infrastructure_applications"] as const,
    related: ["Smart Contract", "Data Feed", "Blockchain"]
  },
  {
    term: "Paper Wallet",
    definition: "A paper wallet is a method of storing cryptocurrency offline by printing the private and public keys on a piece of paper. Paper wallets provide a high level of security by keeping the keys away from internet-connected devices.",
    categories: ["wallets_security"] as const,
    related: ["Cold Storage", "Private Key", "Security"]
  },
  {
    term: "Private Key",
    definition: "A private key is a secret cryptographic key that allows you to access and manage your cryptocurrency funds. It is essential to keep your private key secure and never share it with anyone, as it can be used to authorize transactions and steal your funds.",
    categories: ["wallets_security"] as const,
    related: ["Public Key", "Cryptography", "Security"]
  },
  {
    term: "Proof of Stake (PoS)",
    definition: "Proof of Stake (PoS) is a consensus mechanism used by some blockchain networks to validate transactions and create new blocks. In PoS, validators are selected based on the number of coins they hold and are willing to \"stake\" as collateral.",
    categories: ["mining_staking"] as const,
    related: ["Proof of Work", "Consensus Mechanism", "Staking"]
  },
  {
    term: "Proof of Work (PoW)",
    definition: "Proof of Work (PoW) is a consensus mechanism used by some blockchain networks to validate transactions and create new blocks. In PoW, miners compete to solve complex cryptographic puzzles, and the first miner to solve the puzzle gets to add the new block to the blockchain.",
    categories: ["mining_staking"] as const,
    related: ["Proof of Stake", "Consensus Mechanism", "Mining"]
  },
  {
    term: "Public Key",
    definition: "A public key is a cryptographic key that is used to receive cryptocurrency transactions. It is derived from the private key but can be shared with others without compromising the security of your funds.",
    categories: ["wallets_security"] as const,
    related: ["Private Key", "Cryptography", "Security"]
  },
  {
    term: "REKT",
    definition: "REKT is a slang term used in the cryptocurrency community to describe a situation where an investor or trader has suffered significant financial losses due to a bad investment or trading decision.",
    categories: ["social_community"] as const,
    related: ["Loss", "Trading", "Investment"]
  },
  {
    term: "Rug Pull",
    definition: "A rug pull is a type of scam in which a cryptocurrency project team abruptly abandons the project and runs away with investors' funds. Rug pulls are common in the decentralized finance (DeFi) space, where new projects can be launched quickly and with little oversight.",
    categories: ["security"] as const,
    related: ["Scam", "DeFi", "Investment"]
  },
  {
    term: "Satoshi",
    definition: "A satoshi is the smallest unit of Bitcoin, representing 0.00000001 BTC. It is named after Satoshi Nakamoto, the pseudonymous creator of Bitcoin.",
    categories: ["cryptocurrency_types"] as const,
    related: ["Bitcoin", "Unit", "Cryptocurrency"]
  },
  {
    term: "Sharding",
    definition: "Sharding is a database partitioning technique that is used to improve the scalability of blockchain networks. Sharding involves dividing the blockchain into smaller, more manageable pieces, called shards, which can be processed in parallel.",
    categories: ["layer2_solutions"] as const,
    related: ["Scaling", "Blockchain", "Database"]
  },
  {
    term: "Smart Contract",
    definition: "A smart contract is a self-executing contract written in code and stored on a blockchain. Smart contracts automatically execute the terms of an agreement when predefined conditions are met, without the need for intermediaries.",
    categories: ["smart_contracts"] as const,
    related: ["Blockchain", "Ethereum", "dApp"]
  },
  {
    term: "Stablecoin",
    definition: "A stablecoin is a cryptocurrency that is designed to maintain a stable value relative to a specific asset, such as the US dollar or gold. Stablecoins are used to mitigate the price volatility associated with other cryptocurrencies.",
    categories: ["cryptocurrency_types"] as const,
    related: ["Cryptocurrency", "Volatility", "Fiat Currency"]
  },
  {
    term: "Staking",
    definition: "Staking is the process of holding cryptocurrency in a wallet to support the operations of a blockchain network and earn rewards. Staking is commonly used in Proof of Stake (PoS) consensus mechanisms.",
    categories: ["mining_staking"] as const,
    related: ["Proof of Stake", "Consensus Mechanism", "Mining"]
  },
  {
    term: "Token",
    definition: "A cryptocurrency token is a digital asset that is issued on a blockchain and represents a specific value or utility. Tokens can be used for a variety of purposes, such as representing ownership, granting access to services, or incentivizing participation in a network.",
    categories: ["tokenomics"] as const,
    related: ["Cryptocurrency", "Blockchain", "Digital Asset"]
  },
  {
    term: "Tokenomics",
    definition: "Tokenomics is the study of the economics of cryptocurrencies and tokens. It encompasses the design, distribution, and management of tokens to create sustainable and thriving ecosystems.",
    categories: ["tokenomics"] as const,
    related: ["Token", "Economics", "Cryptocurrency"]
  },
  {
    term: "Transaction Fee",
    definition: "A transaction fee is a fee paid by users to compensate miners or validators for processing transactions on a blockchain network. Transaction fees vary depending on network congestion and the size of the transaction.",
    categories: ["infrastructure_applications"] as const,
    related: ["Transaction", "Mining", "Gas"]
  },
  {
    term: "Trading Volume",
    definition: "Trading volume refers to the total amount of a cryptocurrency that has been traded over a specific period, typically 24 hours. Trading volume is an indicator of market activity and liquidity.",
    categories: ["exchanges_trading"] as const,
    related: ["Liquidity", "Market Depth", "Order Book"]
  },
  {
    term: "Wallet",
    definition: "A cryptocurrency wallet is a digital or physical device used to store, send, and receive cryptocurrencies. Wallets store the private keys that allow you to access and manage your funds on the blockchain.",
    categories: ["wallets_security"] as const,
    related: ["Private Key", "Public Key", "Security"]
  },
  {
    term: "Web3",
    definition: "Web3 is the next evolution of the internet, characterized by decentralization, blockchain technology, and token-based economics. Web3 aims to create a more open, transparent, and user-centric internet, where users have more control over their data and digital assets.",
    categories: ["web3"] as const,
    related: ["Blockchain", "Decentralization", "Tokenomics"]
  },
  {
    term: "Yield Farming",
    definition: "Yield farming is the practice of lending or staking cryptocurrency assets on decentralized finance (DeFi) platforms to earn rewards in the form of additional cryptocurrency. Yield farming is a way to generate passive income from your cryptocurrency holdings.",
    categories: ["defi"] as const,
    related: ["Liquidity Pool", "Decentralized Exchange", "Impermanent Loss"]
  },
  {
    term: "Zero-Knowledge Proof",
    definition: "A zero-knowledge proof is a cryptographic technique that allows one party to prove to another party that a statement is true, without revealing any information about the statement itself. Zero-knowledge proofs are used to enhance privacy and security in blockchain networks.",
    categories: ["privacy_technology"] as const,
    related: ["Cryptography", "Privacy", "Security"]
  },
  // Add the new fraud-related terms at the end of the existing terms array
  {
    term: "Mule",
    definition: "An individual who knowingly or unknowingly transfers illegally obtained cryptocurrency or digital assets on behalf of criminals. Mules may be recruited through social engineering, romance scams, or job offers, and often face legal consequences even when unaware of their involvement in criminal activity. In cryptocurrency fraud schemes, mules help launder stolen funds by moving them through multiple accounts to obscure the money trail.",
    categories: ["security", "regulatory_frameworks"] as const,
    related: ["Mule account", "Drop account", "Money laundering", "Social engineering"]
  },
  {
    term: "Mule account",
    definition: "A cryptocurrency account or wallet specifically used for laundering stolen digital assets by serving as an intermediary in the transfer chain. These accounts are often controlled by money mules who may be unaware participants recruited through deceptive means. Mule accounts help criminals distance themselves from the original theft by creating multiple transaction hops that complicate blockchain analysis and law enforcement investigations.",
    categories: ["security", "regulatory_frameworks"] as const,
    related: ["Mule", "Drop account", "Money laundering", "Blockchain analysis"]
  },
  {
    term: "Drop account",
    definition: "A temporary cryptocurrency account or wallet used to receive stolen digital assets before quickly transferring them to other accounts or converting them to different cryptocurrencies. Drop accounts are typically created with false identities or compromised credentials and are abandoned after use to avoid detection. They serve as the first destination for stolen funds in cryptocurrency fraud schemes, helping criminals begin the laundering process immediately after a theft or scam.",
    categories: ["security", "regulatory_frameworks"] as const,
    related: ["Mule account", "Mule", "Money laundering", "Cryptocurrency mixing"]
  }
];
