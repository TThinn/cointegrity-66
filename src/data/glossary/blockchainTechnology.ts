
import { GlossaryTerm } from "./types";

export const blockchainTechnologyTerms: GlossaryTerm[] = [
  {
    term: "Blockchain",
    definition: "A distributed digital ledger that records transactions across multiple computers in a way that makes it nearly impossible to change, hack, or cheat the system.",
    categories: ["blockchain_technology"],
    related: ["Distributed Ledger", "Hash", "Block"]
  },
  {
    term: "Block",
    definition: "A collection of transactions that are bundled together and added to the blockchain after being validated by network participants.",
    categories: ["blockchain_technology"],
    related: ["Blockchain", "Transaction", "Mining"]
  },
  {
    term: "Hash",
    definition: "A fixed-length string of characters that serves as a unique digital fingerprint for data, ensuring integrity and enabling efficient verification.",
    categories: ["blockchain_technology"],
    related: ["Cryptographic Hash", "SHA-256", "Block"]
  },
  {
    term: "Consensus Mechanism",
    definition: "The process by which a blockchain network agrees on the validity of transactions and the state of the ledger.",
    categories: ["blockchain_technology"],
    related: ["Proof of Work", "Proof of Stake", "Mining"]
  },
  {
    term: "Node",
    definition: "A computer that participates in a blockchain network by maintaining a copy of the ledger and validating transactions.",
    categories: ["blockchain_technology"],
    related: ["Full Node", "Light Node", "Validator"]
  },
  {
    term: "Distributed Ledger",
    definition: "A database that is consensually shared and synchronized across multiple sites, institutions, or geographies.",
    categories: ["blockchain_technology"],
    related: ["Blockchain", "Decentralization", "Consensus"]
  },
  {
    term: "Merkle Tree",
    definition: "A binary tree structure used in blockchain to efficiently summarize all transactions in a block.",
    categories: ["blockchain_technology"],
    related: ["Hash", "Block", "Data Structure"]
  },
  {
    term: "Fork",
    definition: "A change to the blockchain protocol that creates a divergence from the original chain.",
    categories: ["blockchain_technology"],
    related: ["Hard Fork", "Soft Fork", "Protocol Upgrade"]
  },
  {
    term: "Hard Fork",
    definition: "A radical change to a blockchain protocol that makes previously invalid blocks/transactions valid, requiring all users to upgrade.",
    categories: ["blockchain_technology"],
    related: ["Fork", "Soft Fork", "Protocol Upgrade"]
  },
  {
    term: "Soft Fork",
    definition: "A backward-compatible upgrade to a blockchain protocol that tightens or adds new rules.",
    categories: ["blockchain_technology"],
    related: ["Fork", "Hard Fork", "Protocol Upgrade"]
  },
  {
    term: "Immutability",
    definition: "The characteristic of blockchain that makes it extremely difficult to alter or delete recorded transactions.",
    categories: ["blockchain_technology"],
    related: ["Security", "Cryptography", "Trust"]
  },
  {
    term: "Transparency",
    definition: "The ability for all network participants to view and verify transactions on a public blockchain.",
    categories: ["blockchain_technology"],
    related: ["Public Ledger", "Verification", "Trust"]
  },
  {
    term: "Cryptography",
    definition: "The practice of secure communication techniques used to protect blockchain networks and transactions.",
    categories: ["blockchain_technology"],
    related: ["Hash", "Digital Signature", "Encryption"]
  },
  {
    term: "Digital Signature",
    definition: "A cryptographic mechanism used to verify the authenticity and integrity of digital messages or documents.",
    categories: ["blockchain_technology"],
    related: ["Cryptography", "Authentication", "Private Key"]
  },
  {
    term: "Nonce",
    definition: "A number used once in cryptographic communication, often used in blockchain mining to find valid block hashes.",
    categories: ["blockchain_technology"],
    related: ["Mining", "Proof of Work", "Hash"]
  },
  {
    term: "Genesis Block",
    definition: "The first block in a blockchain, often hard-coded into the protocol software.",
    categories: ["blockchain_technology", "crypto_history"],
    related: ["Bitcoin", "Blockchain", "First Block"]
  },
  {
    term: "Byzantine Fault Tolerance",
    definition: "A blockchain's ability to function correctly even when some network nodes fail or act maliciously.",
    categories: ["blockchain_technology"],
    related: ["Consensus", "Network Security", "Fault Tolerance"]
  },
  {
    term: "Sharding",
    definition: "A scalability technique that splits a blockchain network into smaller, parallel chains called shards.",
    categories: ["blockchain_technology"],
    related: ["Scalability", "Ethereum 2.0", "Parallel Processing"]
  },
  {
    term: "Timestamp",
    definition: "A record of when a particular transaction or block was created, providing chronological ordering in the blockchain.",
    categories: ["blockchain_technology"],
    related: ["Block", "Transaction", "Chronology"]
  },
  {
    term: "Double Spending",
    definition: "The risk that a digital currency can be spent twice, which blockchain technology prevents through consensus mechanisms.",
    categories: ["blockchain_technology"],
    related: ["Consensus", "Security", "Digital Currency"]
  }
];
