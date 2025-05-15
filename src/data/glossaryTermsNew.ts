
import { CategoryType } from "@/components/glossary/types";

// Define the structure of a glossary term
export interface GlossaryTerm {
  term: string;
  definition: string;
  categories: CategoryType[];
  related?: string[];
}

// Export the glossary terms array
// Making copy of the existing array with a new name to test if there's an import issue
export const glossaryTermsNew: GlossaryTerm[] = [
  {
    term: "Blockchain",
    definition: "A decentralized digital ledger that records transactions across many computers in a way that the registered transactions cannot be altered retroactively.",
    categories: ["blockchain"],
    related: ["Cryptocurrency", "Distributed Ledger Technology"]
  },
  {
    term: "Smart Contract",
    definition: "Self-executing contracts with the terms of the agreement directly written into code, running on a blockchain.",
    categories: ["blockchain", "infrastructure"],
    related: ["Ethereum", "Decentralized Applications"]
  },
  {
    term: "Decentralized Finance (DeFi)",
    definition: "Financial services using smart contracts on blockchains, allowing users to lend, borrow, and trade without intermediaries.",
    categories: ["defi"],
    related: ["Lending", "Borrowing", "Yield Farming"]
  },
  {
    term: "Non-Fungible Token (NFT)",
    definition: "A unique digital asset verified using blockchain technology, representing ownership of a specific item or piece of content.",
    categories: ["nft"],
    related: ["Digital Art", "Collectibles"]
  },
  {
    term: "Cryptocurrency",
    definition: "A digital or virtual currency that uses cryptography for security and operates independently of a central authority.",
    categories: ["blockchain"],
    related: ["Bitcoin", "Ethereum"]
  },
  {
    term: "Tokenomics",
    definition: "The study of the economic model behind a cryptocurrency or token, including its supply, distribution, and incentives.",
    categories: ["tokenomics"],
    related: ["Cryptoeconomics", "Utility Token"]
  },
  {
    term: "Layer 2",
    definition: "A secondary framework or protocol built on top of a blockchain to improve scalability and transaction speed.",
    categories: ["blockchain", "infrastructure"],
    related: ["Scaling Solutions", "Ethereum"]
  },
  {
    term: "Scalability",
    definition: "The capability of a blockchain network to handle a growing amount of work or its potential to accommodate growth.",
    categories: ["blockchain", "infrastructure"],
    related: ["Throughput", "Transaction Speed"]
  },
  {
    term: "Decentralized Autonomous Organization (DAO)",
    definition: "An organization represented by rules encoded as a computer program that is transparent, controlled by organization members and not influenced by a central government.",
    categories: ["dao"],
    related: ["Governance", "Smart Contracts"]
  },
  {
    term: "Web3",
    definition: "The next generation of the internet, focusing on decentralized protocols and technologies that give users control over their data.",
    categories: ["web3"],
    related: ["Blockchain", "Decentralization"]
  },
  {
    term: "Gas Fee",
    definition: "The payment required to perform a transaction or execute a contract on the Ethereum blockchain, priced in small fractions of ETH called gwei.",
    categories: ["blockchain", "infrastructure"],
    related: ["Ethereum", "Transaction", "Gwei"]
  },
  {
    term: "Stablecoin",
    definition: "A type of cryptocurrency designed to maintain a stable value by being pegged to a fiat currency or other stable asset.",
    categories: ["defi", "tokenomics"],
    related: ["USDC", "USDT", "DAI", "Algorithmic Stablecoin"]
  },
  {
    term: "Zero-Knowledge Proof",
    definition: "A cryptographic method allowing one party to prove to another that a statement is true without revealing any additional information beyond the validity of the statement itself.",
    categories: ["blockchain", "security", "identity"],
    related: ["ZK-Rollups", "Privacy", "Cryptography"]
  },
  {
    term: "Flash Loan",
    definition: "A type of uncollateralized loan in DeFi where funds are borrowed and repaid within a single transaction block, often used for arbitrage opportunities.",
    categories: ["defi"],
    related: ["DeFi", "Arbitrage", "Lending Protocol"]
  },
  {
    term: "HODL",
    definition: "A term derived from a misspelling of 'hold' that became an acronym for 'Hold On for Dear Life', referring to the strategy of keeping cryptocurrencies long-term regardless of market volatility.",
    categories: ["blockchain", "strategy"],
    related: ["Bitcoin", "Investment Strategy", "Market Volatility"]
  },
  {
    term: "Solidity",
    definition: "The primary programming language used for writing smart contracts on Ethereum and compatible blockchains.",
    categories: ["blockchain", "infrastructure"],
    related: ["Smart Contract", "Ethereum", "Web3 Development"]
  },
  {
    term: "Metamask",
    definition: "A popular cryptocurrency wallet and browser extension that allows users to interact with the Ethereum blockchain and compatible networks.",
    categories: ["blockchain", "web3"],
    related: ["Wallet", "Ethereum", "Web3", "Browser Extension"]
  },
  {
    term: "Prompt Engineering",
    definition: "The practice of crafting optimal input prompts for AI language models to generate desired outputs, involving careful wording, context-setting, and formatting.",
    categories: ["ai"],
    related: ["Large Language Model", "AI", "Natural Language Processing"]
  },
  {
    term: "Liquidity Provider",
    definition: "An individual or entity that supplies assets to decentralized exchanges or lending protocols in return for rewards, fees, or interest.",
    categories: ["defi", "tokenomics"],
    related: ["Automated Market Maker", "Impermanent Loss", "Liquidity Mining"]
  },
  {
    term: "GameFi",
    definition: "The intersection of gaming and finance in blockchain-based games that offer players opportunities to earn cryptocurrency or NFTs through gameplay.",
    categories: ["gaming", "nft", "defi"],
    related: ["Play-to-Earn", "NFT", "In-game Assets"]
  },
  {
    term: "Governance Token",
    definition: "A type of cryptocurrency that represents voting power in a decentralized protocol or organization, allowing holders to influence development decisions.",
    categories: ["dao", "tokenomics"],
    related: ["DAO", "Voting Power", "Protocol Governance"]
  },
  {
    term: "Mainnet",
    definition: "The fully developed and deployed version of a blockchain network where actual transactions occur, as opposed to a testnet used for development.",
    categories: ["blockchain", "infrastructure"],
    related: ["Testnet", "Blockchain", "Network Launch"]
  },
  {
    term: "Atomic Swap",
    definition: "A smart contract technology that enables the exchange of cryptocurrencies from different blockchains without using intermediaries like centralized exchanges.",
    categories: ["blockchain", "defi"],
    related: ["Cross-chain", "Decentralized Exchange", "Interoperability"]
  },
  // Adding a new test term to verify if new data is loaded
  {
    term: "DataTest123",
    definition: "This is a test term to verify if new data is being loaded correctly.",
    categories: ["blockchain"],
    related: ["Test"]
  }
   {
    term: "DataTest123 (entesttil)",
    definition: "This is a test term to verify if new data is being loaded correctly.",
    categories: ["blockchain"],
    related: ["Test"]
  }
];
